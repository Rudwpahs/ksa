import { useMemo, useState } from 'react';
import type { Priority, QuestionId } from '../types';
import { details, hotspotById, questionById, questions } from '../data';
import { PriorityBadge } from './badges';

interface Props {
  starred: Set<string>;
  onToggleStar: (id: string) => void;
  onGoto: (hotspotId: string) => void;
  /** INTERVIEWER VIEW — 답변 핵심을 가리고 PANEL 근거만 남긴 연습 */
  panelOnly?: boolean;
}

type BankMode = 'list' | 'drill';
type DrillStage = 'ask' | 'pressure' | 'reveal';

interface Row {
  q: {
    id: string;
    text: string;
    trigger: string;
    followups?: string[];
  };
  d: (typeof details)[number];
  h: NonNullable<ReturnType<typeof hotspotById.get>>;
}

/**
 * 예상 질문 은행.
 * - 목록: 필터 후 스크롤 연습
 * - 압박 연습: 질문 → (답변 시도) → 꼬리질문 → 그다음에야 20/60초 핵심
 */
export function QuestionBank({
  starred,
  onToggleStar,
  onGoto,
  panelOnly = false,
}: Props) {
  const [mode, setMode] = useState<BankMode>('list');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyS, setOnlyS] = useState(false);
  const [qidFilter, setQidFilter] = useState<'ALL' | QuestionId>('ALL');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [pressureOpen, setPressureOpen] = useState<Set<string>>(new Set());

  const [drillIdx, setDrillIdx] = useState(0);
  const [drillStage, setDrillStage] = useState<DrillStage>('ask');
  const [drillOrder, setDrillOrder] = useState<number[] | null>(null);

  const rows: Row[] = useMemo(
    () =>
      details.flatMap((d) => {
        const h = hotspotById.get(d.hotspotId);
        if (!h) return [];
        return d.questions.map((q) => ({ q, d, h }));
      }),
    [],
  );

  const filtered = useMemo(() => {
    return rows.filter(({ q, h }) => {
      if (onlyStarred && !starred.has(q.id)) return false;
      if (onlyS && h.priority !== 'S') return false;
      if (qidFilter !== 'ALL' && h.questionId !== qidFilter) return false;
      return true;
    });
  }, [rows, onlyStarred, onlyS, qidFilter, starred]);

  const drillRows = useMemo(() => {
    if (!drillOrder) return filtered;
    return drillOrder.map((i) => filtered[i]).filter(Boolean);
  }, [filtered, drillOrder]);

  const current = drillRows[drillIdx] ?? null;

  const toggleReveal = (id: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const togglePressure = (id: string) =>
    setPressureOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const startDrill = (shuffle: boolean) => {
    const order = filtered.map((_, i) => i);
    if (shuffle) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    }
    setDrillOrder(order);
    setDrillIdx(0);
    setDrillStage('ask');
    setMode('drill');
  };

  const nextDrill = () => {
    if (drillIdx >= drillRows.length - 1) {
      setMode('list');
      setDrillOrder(null);
      return;
    }
    setDrillIdx((i) => i + 1);
    setDrillStage('ask');
  };

  return (
    <div className="bank">
      <div className="bank-head">
        <h2>
          {mode === 'drill'
            ? `압박 연습 ${drillRows.length ? drillIdx + 1 : 0}/${drillRows.length}`
            : `예상 질문 ${filtered.length}개`}
        </h2>
        <div className="bank-modes" role="group" aria-label="연습 방식">
          <button
            className={`chip ${mode === 'list' ? 'on' : ''}`}
            onClick={() => {
              setMode('list');
              setDrillOrder(null);
            }}
          >
            목록
          </button>
          <button
            className={`chip ${mode === 'drill' ? 'on' : ''}`}
            onClick={() => startDrill(false)}
            disabled={filtered.length === 0}
          >
            압박 연습
          </button>
          <button
            className="chip"
            onClick={() => startDrill(true)}
            disabled={filtered.length === 0}
            title="순서를 섞어 시작합니다"
          >
            섞어서 연습
          </button>
        </div>
      </div>

      <div className="bank-filters" role="group" aria-label="질문 필터">
        <label className="chk">
          <input
            type="checkbox"
            checked={onlyStarred}
            onChange={(e) => setOnlyStarred(e.target.checked)}
          />
          오늘 ★만 ({starred.size})
        </label>
        <label className="chk">
          <input
            type="checkbox"
            checked={onlyS}
            onChange={(e) => setOnlyS(e.target.checked)}
          />
          S급만
        </label>
        <div className="filters bank-qfilters">
          <button
            className={`chip ${qidFilter === 'ALL' ? 'on' : ''}`}
            onClick={() => setQidFilter('ALL')}
          >
            전체 문항
          </button>
          {questions.map((q) => (
            <button
              key={q.id}
              className={`chip ${qidFilter === q.id ? 'on' : ''}`}
              onClick={() => setQidFilter(q.id)}
            >
              {q.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {panelOnly && (
        <p className="note-line boxed">
          INTERVIEWER VIEW — 답변 핵심은 가려 두었습니다. 자소서·생기부만으로 먼저 답해 보세요.
          PREP LAB으로 바꾸면 모범 구조가 열립니다.
        </p>
      )}

      <p className="bank-note">
        한과영 3차는 자소서·생기부를 파고든 뒤 꼬리질문으로 압박합니다. 압박 연습에서는{' '}
        <b>질문 → 스스로 답 → 꼬리질문 → 그다음 핵심</b> 순서로만 열립니다.
      </p>

      {filtered.length === 0 && (
        <p className="note-line">표시할 질문이 없습니다. 필터를 바꾸거나 ☆를 담아 보세요.</p>
      )}

      {mode === 'drill' && current && (
        <DrillCard
          row={current}
          stage={drillStage}
          panelOnly={panelOnly}
          starred={starred}
          onToggleStar={onToggleStar}
          onGoto={onGoto}
          onStage={setDrillStage}
          onNext={nextDrill}
          isLast={drillIdx >= drillRows.length - 1}
        />
      )}

      {mode === 'list' &&
        filtered.map(({ q, d, h }) => {
          const qLabel = questionById.get(h.questionId)?.label ?? '';
          const open = revealed.has(q.id);
          const press = pressureOpen.has(q.id);
          return (
            <div className="bq" key={q.id}>
              <div className="bq-top">
                <button
                  className={`star ${starred.has(q.id) ? 'on' : ''}`}
                  onClick={() => onToggleStar(q.id)}
                  aria-pressed={starred.has(q.id)}
                  title="오늘 볼 질문"
                >
                  {starred.has(q.id) ? '★' : '☆'}
                </button>
                <div className="bq-main">
                  <p className="bq-text">{q.text}</p>
                  <div className="badge-row">
                    <span className="badge q-tag">{qLabel}</span>
                    <PriorityBadge p={h.priority as Priority} />
                    <button className="linkish" onClick={() => onGoto(h.id)}>
                      원문 문장으로 →
                    </button>
                  </div>
                  <p className="eq-trigger">
                    <span className="trigger-tag">근거</span>
                    {q.trigger}
                  </p>
                </div>
              </div>

              {q.followups && q.followups.length > 0 && (
                <button className="reveal soft" onClick={() => togglePressure(q.id)}>
                  {press ? '꼬리질문 접기' : `꼬리질문 ${q.followups.length}개 보기`}
                </button>
              )}
              {press && q.followups && (
                <div className="bq-pressure">
                  <h4>꼬리질문 — 먼저 버텨 보세요</h4>
                  <ol>
                    {q.followups.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ol>
                </div>
              )}

              {!panelOnly && (
                <button className="reveal" onClick={() => toggleReveal(q.id)}>
                  {open ? '답변 핵심 접기' : '답변 핵심 보기'}
                </button>
              )}

              {open && !panelOnly && (
                <div className="bq-answer">
                  {d.answerCore20s && (
                    <>
                      <h4>20초 핵심</h4>
                      <ul>
                        {d.answerCore20s.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {d.answerFrame60s && (
                    <>
                      <h4>60초 구조</h4>
                      <ol>
                        {d.answerFrame60s.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

function DrillCard({
  row,
  stage,
  panelOnly,
  starred,
  onToggleStar,
  onGoto,
  onStage,
  onNext,
  isLast,
}: {
  row: Row;
  stage: DrillStage;
  panelOnly: boolean;
  starred: Set<string>;
  onToggleStar: (id: string) => void;
  onGoto: (hotspotId: string) => void;
  onStage: (s: DrillStage) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const { q, d, h } = row;
  const qLabel = questionById.get(h.questionId)?.label ?? '';
  const hasFollowups = (q.followups?.length ?? 0) > 0;

  return (
    <div className="bq drill-card">
      <div className="drill-stage-row" aria-label="연습 단계">
        <span className={stage === 'ask' ? 'on' : ''}>1. 질문</span>
        <span className={stage === 'pressure' ? 'on' : ''}>2. 꼬리</span>
        <span className={stage === 'reveal' ? 'on' : ''}>3. 핵심</span>
      </div>

      <div className="bq-top">
        <button
          className={`star ${starred.has(q.id) ? 'on' : ''}`}
          onClick={() => onToggleStar(q.id)}
          aria-pressed={starred.has(q.id)}
        >
          {starred.has(q.id) ? '★' : '☆'}
        </button>
        <div className="bq-main">
          <p className="bq-text">{q.text}</p>
          <div className="badge-row">
            <span className="badge q-tag">{qLabel}</span>
            <PriorityBadge p={h.priority} />
            <button className="linkish" onClick={() => onGoto(h.id)}>
              원문 문장으로 →
            </button>
          </div>
          <p className="eq-trigger">
            <span className="trigger-tag">근거</span>
            {q.trigger}
          </p>
        </div>
      </div>

      {stage === 'ask' && (
        <div className="drill-blank">
          <p>지금 소리 내어 답하세요. 답을 읽지 마세요.</p>
          <div className="drill-actions">
            {hasFollowups ? (
              <button className="reveal" onClick={() => onStage('pressure')}>
                답했다 → 꼬리질문
              </button>
            ) : panelOnly ? (
              <button className="reveal" onClick={onNext}>
                {isLast ? '연습 종료' : '다음 질문'}
              </button>
            ) : (
              <button className="reveal" onClick={() => onStage('reveal')}>
                답했다 → 핵심 보기
              </button>
            )}
          </div>
        </div>
      )}

      {stage === 'pressure' && (
        <div className="bq-pressure">
          <h4>꼬리질문 — 이어서 버텨 보세요</h4>
          <ol>
            {(q.followups ?? []).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ol>
          <div className="drill-actions">
            {panelOnly ? (
              <button className="reveal" onClick={onNext}>
                {isLast ? '연습 종료' : '다음 질문'}
              </button>
            ) : (
              <button className="reveal" onClick={() => onStage('reveal')}>
                버텼다 → 핵심 보기
              </button>
            )}
          </div>
        </div>
      )}

      {stage === 'reveal' && !panelOnly && (
        <div className="bq-answer">
          {d.answerCore20s && (
            <>
              <h4>20초 핵심</h4>
              <ul>
                {d.answerCore20s.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}
          {d.answerFrame60s && (
            <>
              <h4>60초 구조</h4>
              <ol>
                {d.answerFrame60s.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ol>
            </>
          )}
          <div className="drill-actions">
            <button className="reveal" onClick={onNext}>
              {isLast ? '연습 종료' : '다음 질문 →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
