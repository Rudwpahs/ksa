import { useCallback, useEffect, useMemo, useState } from 'react';
import type { QuestionId, Tag } from './types';
import {
  detailForHotspot,
  evidenceById,
  hotspotById,
  hotspots,
  hotspotsInReadingOrder,
  questions,
  questionById,
  validateData,
} from './data';
import { EssayReader } from './components/EssayReader';
import { DetailPanel } from './components/DetailPanel';
import { QuestionBank } from './components/QuestionBank';
import { RedFlagView } from './components/RedFlagView';
import { Overview } from './components/Overview';
import { useIdSet, useLocalStorage } from './hooks/useLocalStorage';
import './styles.css';

type View = 'overview' | 'essay' | 'bank' | 'flags';
type BankLaunch = { drill?: boolean; onlyS?: boolean } | null;

const FILTERS: Array<{ id: 'ALL' | Tag; label: string }> = [
  { id: 'ALL', label: '전체' },
  { id: 'RISK', label: '위험' },
  { id: 'SCHOOL_RECORD', label: '생기부' },
  { id: 'CODE', label: '코드' },
  { id: 'THEORY', label: '이론' },
  { id: 'SCIENCE', label: '과학' },
  { id: 'MATH', label: '수학' },
  { id: 'CAREER', label: '진로' },
  { id: 'COLLAB', label: '협업' },
];

const NAV: Array<[View, string, string]> = [
  ['overview', '직전', '할 일'],
  ['essay', '자소서', '원문'],
  ['bank', '연습', '질문'],
  ['flags', '고칠말', '위험'],
];

function readHash(): { q: QuestionId; h: string | null } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [q, h] = raw.split('/');
  const validQ = questions.some((x) => x.id === q) ? (q as QuestionId) : 'q1';
  return { q: validQ, h: h && hotspotById.has(h) ? h : null };
}

export default function App() {
  const initial = readHash();
  const [view, setView] = useState<View>('overview');
  const [qid, setQid] = useState<QuestionId>(initial.q);
  const [selected, setSelected] = useState<string | null>(initial.h);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'ALL' | Tag>('ALL');
  const [panelOnly, setPanelOnly] = useLocalStorage('ksa.panelOnly', false);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('ksa.theme', 'light');
  const [bankLaunch, setBankLaunch] = useState<BankLaunch>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const starred = useIdSet('ksa.starredQuestions');
  const flagChecks = useIdSet('ksa.flagChecks');
  const problems = useMemo(() => validateData(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const next = `#/${qid}${selected ? `/${selected}` : ''}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next);
    }
  }, [qid, selected]);

  useEffect(() => {
    const onHash = () => {
      const { q, h } = readHash();
      setQid(q);
      setSelected(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goto = useCallback((hotspotId: string) => {
    const h = hotspotById.get(hotspotId);
    if (!h) return;
    setView('essay');
    setQid(h.questionId);
    setSelected(h.id);
    requestAnimationFrame(() => {
      document.querySelector('.detail')?.scrollTo({ top: 0 });
    });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const order = hotspotsInReadingOrder;
      const i = selected ? order.findIndex((h) => h.id === selected) : -1;
      const next = order[(i + dir + order.length) % order.length];
      if (next) {
        setQid(next.questionId);
        setSelected(next.id);
      }
    },
    [selected],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
      if (e.key === 'Escape') setSelected(null);
      if (view !== 'essay') return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, view]);

  // 시트가 열린 동안 배경 스크롤 잠금 (모바일)
  useEffect(() => {
    if (view === 'essay' && selected) {
      document.body.classList.add('sheet-open');
    } else {
      document.body.classList.remove('sheet-open');
    }
    return () => document.body.classList.remove('sheet-open');
  }, [view, selected]);

  const matched = useMemo(() => {
    const q = query.trim();
    if (!q && filter === 'ALL') return null;
    const hit = new Set<string>();
    for (const h of hotspots) {
      if (filter !== 'ALL' && !h.tags.includes(filter)) continue;
      if (!q) {
        hit.add(h.id);
        continue;
      }
      const d = detailForHotspot(h.id);
      const haystack = [
        h.exactText,
        h.tooltip,
        d?.whyItMatters ?? '',
        ...(d?.questions.map((x) => x.text) ?? []),
        ...(d?.risks?.map((r) => r.text) ?? []),
        ...(d?.evidenceIds.map((id) => evidenceById.get(id)?.title ?? '') ?? []),
      ].join(' ');
      if (haystack.includes(q)) hit.add(h.id);
    }
    return hit;
  }, [query, filter]);

  const question = questionById.get(qid)!;
  const selectedHotspot = selected ? (hotspotById.get(selected) ?? null) : null;
  const matchCount = matched?.size ?? null;

  const openBank = (opts?: { drill?: boolean; onlyS?: boolean }) => {
    setBankLaunch(opts ?? null);
    setView('bank');
  };

  return (
    <div className={`app view-${view}${selected ? ' has-sheet' : ''}`}>
      <header className="topbar">
        <div className="brand">
          <span className="brand-kicker">KSA 3차</span>
          <h1 className="brand-title">면접 직전 맵</h1>
        </div>

        <nav className="views desktop-nav" aria-label="화면 전환">
          {NAV.map(([v, label]) => (
            <button
              key={v}
              className={view === v ? 'on' : ''}
              onClick={() => setView(v)}
              aria-current={view === v}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="topbar-right">
          <button
            className={`mode ${panelOnly ? 'panel' : 'prep'}`}
            onClick={() => setPanelOnly(!panelOnly)}
            title="면접관이 볼 수 있는 자료만"
          >
            {panelOnly ? '면접관' : '전부'}
          </button>
          <button
            className="theme"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="밝기 전환"
            aria-label="밝기 전환"
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      {problems.length > 0 && (
        <div className="data-error">
          <strong>데이터 경고 {problems.length}건</strong>
          <ul>
            {problems.slice(0, 5).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {view === 'essay' && (
        <div className="subbar">
          <nav className="qnav" aria-label="문항 선택">
            {questions.map((q) => (
              <button
                key={q.id}
                className={`qtab ${qid === q.id ? 'on' : ''} heat-${q.heat}`}
                onClick={() => {
                  setQid(q.id);
                  setSelected(null);
                }}
                aria-current={qid === q.id}
                title={q.prompt}
              >
                {q.id.toUpperCase()}
              </button>
            ))}
          </nav>

          <div className="tools">
            <input
              className="search"
              type="search"
              placeholder="검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="검색"
            />
            <button
              type="button"
              className={`chip filters-toggle ${filtersOpen || filter !== 'ALL' ? 'on' : ''}`}
              onClick={() => setFiltersOpen((v) => !v)}
            >
              필터{filter !== 'ALL' ? ` · ${FILTERS.find((f) => f.id === filter)?.label}` : ''}
            </button>
            {filtersOpen && (
              <div className="filters" role="group" aria-label="태그 필터">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    className={`chip ${filter === f.id ? 'on' : ''}`}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={filter === f.id}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
            {matchCount !== null && (
              <span className="match-count">{matchCount}개</span>
            )}
          </div>
        </div>
      )}

      <main className={`main view-${view}`}>
        {view === 'essay' && (
          <>
            {selectedHotspot && (
              <button
                type="button"
                className="detail-scrim"
                aria-label="상세 닫기"
                onClick={() => setSelected(null)}
              />
            )}
            <div className="reader-wrap">
              <EssayReader
                question={question}
                selectedId={selected}
                matchedIds={matched}
                onSelect={(h) => setSelected(h.id)}
              />
            </div>
            <DetailPanel
              hotspot={selectedHotspot}
              panelOnly={panelOnly}
              starred={starred.set}
              onToggleStar={starred.toggle}
              onGoto={goto}
              onClose={() => setSelected(null)}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
            />
          </>
        )}

        {view === 'overview' && (
          <Overview
            onGoto={goto}
            onOpenQuestion={(q) => {
              setQid(q);
              setSelected(null);
              setView('essay');
            }}
            onOpenBank={openBank}
            onOpenFlags={() => setView('flags')}
          />
        )}

        {view === 'bank' && (
          <QuestionBank
            starred={starred.set}
            onToggleStar={starred.toggle}
            onGoto={goto}
            panelOnly={panelOnly}
            launch={bankLaunch}
            onLaunchConsumed={() => setBankLaunch(null)}
          />
        )}

        {view === 'flags' && (
          <RedFlagView
            onGoto={goto}
            checked={flagChecks.set}
            onToggleCheck={flagChecks.toggle}
          />
        )}
      </main>

      <nav className="tabbar" aria-label="모바일 메뉴">
        {NAV.map(([v, label, sub]) => (
          <button
            key={v}
            type="button"
            className={view === v ? 'on' : ''}
            onClick={() => setView(v)}
            aria-current={view === v}
          >
            <span className="tabbar-label">{label}</span>
            <span className="tabbar-sub">{sub}</span>
          </button>
        ))}
      </nav>

      <footer className="foot">
        <p>자소서 원문 유지 · 확인된 근거만 · UNKNOWN은 모름으로 표시</p>
      </footer>
    </div>
  );
}
