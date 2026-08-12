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

/** #/q4/h4-seat 형태의 딥링크를 읽고 쓴다. */
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

  const starred = useIdSet('ksa.starredQuestions');
  const flagChecks = useIdSet('ksa.flagChecks');

  const problems = useMemo(() => validateData(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // 상태 → URL
  useEffect(() => {
    const next = `#/${qid}${selected ? `/${selected}` : ''}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next);
    }
  }, [qid, selected]);

  // URL → 상태 (뒤로가기)
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

  // 키보드 이동
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

  // 검색 + 태그 필터. 결과가 없으면 null(=필터 없음)을 넘긴다.
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

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-kicker">KSA 3RD STAGE</span>
          <h1 className="brand-title">자기소개서 EVIDENCE MAP</h1>
        </div>

        <nav className="views" aria-label="화면 전환">
          {(
            [
              ['overview', '전체 지도'],
              ['essay', '자소서'],
              ['bank', '질문 은행'],
              ['flags', '위험 표현'],
            ] as Array<[View, string]>
          ).map(([v, label]) => (
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
            title="면접관이 볼 수 있는 자료만 볼지 전환합니다"
          >
            {panelOnly ? '● INTERVIEWER VIEW' : '○ PREP LAB'}
          </button>
          <button
            className="theme"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="밝기 전환"
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      {problems.length > 0 && (
        <div className="data-error">
          <strong>데이터 무결성 경고 {problems.length}건</strong>
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
                <span className="qheat" aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div className="tools">
            <input
              className="search"
              type="search"
              placeholder="표현·질문·근거 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="검색"
            />
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
            {matchCount !== null && (
              <span className="match-count">{matchCount}개 일치</span>
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
          />
        )}

        {view === 'bank' && (
          <QuestionBank
            starred={starred.set}
            onToggleStar={starred.toggle}
            onGoto={goto}
            panelOnly={panelOnly}
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

      <footer className="foot">
        <p>
          자기소개서 문장은 원본 PDF 그대로입니다. 근거는 자기소개서·학교생활기록부·탐구보고서·
          실제 코드에서 직접 확인한 것만 실었습니다. 확인하지 못한 것은 UNKNOWN으로
          표시했습니다.
        </p>
        <p className="foot-privacy">
          개인정보(주민등록번호·주소·사진·문서확인번호)는 이 앱에 포함하지 않았습니다.
        </p>
      </footer>
    </div>
  );
}
