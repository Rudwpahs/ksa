import { useEffect, useMemo, useRef, useState } from 'react';
import type { Hotspot } from '../types';
import { detailForHotspot, evidenceById, hotspotById, sentenceById } from '../data';
import { Visual, type VisualId } from '../visuals';
import {
  CertaintyBadge,
  PriorityBadge,
  RiskBadge,
  SourceBadge,
  VisibilityBadge,
} from './badges';

type Tab = 'evidence' | 'visual' | 'risk' | 'question' | 'answer';

interface Props {
  hotspot: Hotspot | null;
  panelOnly: boolean;
  starred: Set<string>;
  onToggleStar: (questionId: string) => void;
  onGoto: (hotspotId: string) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  topCollapsed?: boolean;
  onToggleTop?: () => void;
}

export function DetailPanel({
  hotspot,
  panelOnly,
  starred,
  onToggleStar,
  onGoto,
  onClose,
  onPrev,
  onNext,
  topCollapsed,
  onToggleTop,
}: Props) {
  const detail = hotspot ? detailForHotspot(hotspot.id) : undefined;
  const [tab, setTab] = useState<Tab>('evidence');
  const bodyRef = useRef<HTMLDivElement>(null);

  // 다른 표현으로 옮기면: 직전 화면에서 그림을 요청했고 그림이 있으면 그림 탭
  useEffect(() => {
    const preferVisual = sessionStorage.getItem('ksa.openVisual') === '1';
    if (preferVisual) sessionStorage.removeItem('ksa.openVisual');
    const hasVisual = Boolean(hotspot && detailForHotspot(hotspot.id)?.visuals?.length);
    setTab(preferVisual && hasVisual ? 'visual' : 'evidence');
    bodyRef.current?.scrollTo({ top: 0 });
  }, [hotspot?.id]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  const evidences = useMemo(() => {
    if (!detail) return [];
    return detail.evidenceIds
      .map((id) => evidenceById.get(id))
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .filter((e) => (panelOnly ? e.visibility === 'PANEL' : true));
  }, [detail, panelOnly]);

  // 면접관 시점에서는 모범 답변만 가린다. 그림은 항상 연다.
  useEffect(() => {
    if (panelOnly && tab === 'answer') {
      setTab('question');
    }
  }, [panelOnly, tab]);

  if (!hotspot || !detail) {
    return (
      <aside className="detail detail-empty">
        <div className="empty-inner">
          <p className="empty-title">문장에 표시된 부분을 눌러 보세요.</p>
          <p className="empty-sub">
            면접관이 파고들 만한 표현만 골라 두었습니다. 누르면 근거·시각 자료·위험 표현·예상
            질문이 열립니다.
          </p>
          <ul className="empty-legend">
            <li>
              <span className="swatch prio-S" /> <b>S</b> 거의 확실히 질문이 옵니다
            </li>
            <li>
              <span className="swatch prio-A" /> <b>A</b> 중요
            </li>
            <li>
              <span className="swatch prio-B" /> <b>B</b> 보조
            </li>
            <li>
              <span className="swatch has-risk" /> 점선 밑줄 — 표현을 정정해야 합니다
            </li>
          </ul>
          <p className="empty-kbd">
            <kbd>←</kbd> <kbd>→</kbd> 로 표현 사이를 이동할 수 있습니다.
          </p>
        </div>
      </aside>
    );
  }

  const sentence = sentenceById.get(hotspot.sentenceId);
  const risks = detail.risks ?? [];
  const visuals = (detail.visuals ?? []) as VisualId[];
  const hiddenCount = panelOnly ? detail.evidenceIds.length - evidences.length : 0;
  const highCount = risks.filter((r) => r.level === 'HIGH').length;
  // 그림은 면접관 시점에서도 유지. 모범 답변만 가린다.
  const showVisualTab = visuals.length > 0;
  const showAnswerTab = !panelOnly;

  const TABS: Array<{ id: Tab; label: string; count?: number; alert?: boolean }> = [
    { id: 'evidence', label: '근거', count: evidences.length },
    ...(showVisualTab
      ? [{ id: 'visual' as Tab, label: '그림으로', count: visuals.length }]
      : []),
    { id: 'risk', label: '위험', count: risks.length, alert: highCount > 0 },
    { id: 'question', label: '질문', count: detail.questions.length },
    ...(showAnswerTab ? [{ id: 'answer' as Tab, label: '답변' }] : []),
  ];

  return (
    <aside className="detail" aria-label="상세 정보">
      {/* 모바일에서도 탭 바로 위만 고정 — 본문 영역을 크게 */}
      <div className="detail-chrome">
        <button
          type="button"
          className="detail-handle"
          aria-label={topCollapsed ? '상단바 펼치기' : '시트를 맨 위로'}
          onClick={() => onToggleTop?.()}
        />
        <div className="detail-toolbar">
          <div className="detail-nav">
            <button onClick={onPrev} title="이전 표현 (←)" aria-label="이전 표현">
              ←
            </button>
            <button onClick={onNext} title="다음 표현 (→)" aria-label="다음 표현">
              →
            </button>
          </div>
          <div className="detail-toolbar-right">
            {onToggleTop && (
              <button
                type="button"
                className="detail-top-toggle"
                onClick={onToggleTop}
                title={topCollapsed ? '상단바 펼치기' : '상단바 접고 맨 위로'}
              >
                {topCollapsed ? '▾ 상단' : '▴ 맨위'}
              </button>
            )}
            <button className="detail-close" onClick={onClose} title="닫기 (Esc)">
              닫기 ✕
            </button>
          </div>
        </div>

        <blockquote className="phrase">{hotspot.exactText}</blockquote>

        <div className="badge-row tight">
          <PriorityBadge p={hotspot.priority} />
          {highCount > 0 && <RiskBadge level="HIGH" />}
        </div>

        <nav className="d-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`d-tab ${tab === t.id ? 'on' : ''} ${t.alert ? 'alert' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {typeof t.count === 'number' && t.count > 0 && (
                <span className="d-tab-n">{t.count}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── 탭 내용 (여기가 큰 스크롤 영역) */}
      <div className="detail-body" role="tabpanel" ref={bodyRef}>
        <p className="one-liner">
          <span className="one-liner-tag">한 줄</span>
          {hotspot.tooltip}
        </p>

        <details className="why-fold">
          <summary>왜 중요한지 · 원문</summary>
          <p className="why">{detail.whyItMatters}</p>
          {sentence && <p className="why-sentence">{sentence.text}</p>}
        </details>

        {tab === 'evidence' && (
          <>
            {hiddenCount > 0 && (
              <p className="note-line boxed">
                면접관 시점이라 내부 자료 {hiddenCount}건을 가렸습니다. 상단 버튼으로 PREP
                LAB으로 바꾸면 보입니다.
              </p>
            )}
            {evidences.length === 0 && (
              <p className="note-line">이 시점에서 보여 줄 근거가 없습니다.</p>
            )}
            {evidences.map((e) => (
              <article className="ev" key={e.id}>
                <div className="ev-top">
                  <SourceBadge kind={e.sourceKind} />
                  <VisibilityBadge v={e.visibility} />
                  <CertaintyBadge c={e.certainty} />
                </div>
                <h4 className="ev-title">{e.title}</h4>
                <p className="ev-ref">{e.sourceRef}</p>
                {e.excerpt && (
                  <pre className={e.sourceKind === 'GITHUB' ? 'ev-code' : 'ev-quote'}>
                    {e.excerpt}
                  </pre>
                )}
                {e.interpretation && (
                  <p className="ev-interp">
                    <span className="interp-tag">해석</span>
                    {e.interpretation}
                  </p>
                )}
                {e.url && (
                  <a className="ev-link" href={e.url} target="_blank" rel="noreferrer noopener">
                    저장소 열기 ↗
                  </a>
                )}
              </article>
            ))}

            {detail.myRole && detail.myRole.length > 0 && (
              <section className="d-sec">
                <h3 className="d-h">내 역할 / 협업 범위</h3>
                <ul className="d-list role-list">
                  {detail.myRole.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {tab === 'visual' && (
          <>
            {visuals.map((v) => (
              <Visual key={v} id={v} />
            ))}
            {detail.theory && detail.theory.length > 0 && (
              <section className="d-sec">
                <h3 className="d-h">알아 둘 이론</h3>
                <ul className="d-list">
                  {detail.theory.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {tab === 'risk' && (
          <>
            {risks.length === 0 && (
              <p className="note-line">이 표현에는 특별한 위험이 없습니다.</p>
            )}
            {risks.map((r, i) => (
              <div className={`risk risk-lv-${r.level.toLowerCase()}`} key={i}>
                <RiskBadge level={r.level} />
                <p className="risk-text">{r.text}</p>
                {r.saferPhrasing && (
                  <p className="risk-safe">
                    <span className="safe-tag">이렇게 말한다</span>
                    {r.saferPhrasing}
                  </p>
                )}
              </div>
            ))}
          </>
        )}

        {tab === 'question' && (
          <>
            {panelOnly && (
              <p className="note-line boxed">
                INTERVIEWER VIEW — 모범 답변은 가려 두었습니다. 아래 질문을 PANEL 근거만으로
                소리 내어 답해 보세요. 꼬리질문까지 버틴 뒤 PREP LAB으로 전환해 점검하세요.
              </p>
            )}
            {detail.questions.map((q) => (
              <div className="eq" key={q.id}>
                <div className="eq-head">
                  <button
                    className={`star ${starred.has(q.id) ? 'on' : ''}`}
                    onClick={() => onToggleStar(q.id)}
                    title="오늘 볼 질문으로 표시"
                    aria-pressed={starred.has(q.id)}
                  >
                    {starred.has(q.id) ? '★' : '☆'}
                  </button>
                  <p className="eq-text">{q.text}</p>
                </div>
                <p className="eq-trigger">
                  <span className="trigger-tag">근거</span>
                  {q.trigger}
                </p>
                {q.followups && q.followups.length > 0 && (
                  <ul className="eq-follow">
                    {q.followups.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {tab === 'answer' && (
          <>
            {detail.answerCore20s && detail.answerCore20s.length > 0 && (
              <section className="d-sec">
                <h3 className="d-h">20초 핵심</h3>
                <ul className="d-list ans-20">
                  {detail.answerCore20s.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            )}
            {detail.answerFrame60s && detail.answerFrame60s.length > 0 && (
              <section className="d-sec">
                <h3 className="d-h">60초 구조</h3>
                <ol className="d-list ans-60">
                  {detail.answerFrame60s.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ol>
              </section>
            )}
            <p className="note-line boxed">
              문장을 외우지 말고 순서만 기억하세요. 외운 문장은 꼬리질문에서 무너집니다.
            </p>
          </>
        )}

        {/* 연결된 표현은 항상 아래에 */}
        {detail.relatedHotspots && detail.relatedHotspots.length > 0 && (
          <section className="d-sec rel-sec">
            <h3 className="d-h">연결된 표현</h3>
            <div className="rel-row">
              {detail.relatedHotspots.map((id) => {
                const rh = hotspotById.get(id);
                if (!rh) return null;
                return (
                  <button className="rel" key={id} onClick={() => onGoto(id)}>
                    <span className="rel-q">{rh.questionId.toUpperCase()}</span>
                    {rh.exactText.length > 20
                      ? `${rh.exactText.slice(0, 20)}…`
                      : rh.exactText}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
