import { useState } from 'react';
import { details, hotspotById, questionById } from '../data';
import { PriorityBadge } from './badges';

interface Props {
  starred: Set<string>;
  onToggleStar: (id: string) => void;
  onGoto: (hotspotId: string) => void;
}

/** 예상 질문만 모아 보는 화면. 답변 핵심은 접혀 있고, 눌러야 펼쳐진다(모의 연습용). */
export function QuestionBank({ starred, onToggleStar, onGoto }: Props) {
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const rows = details.flatMap((d) => {
    const h = hotspotById.get(d.hotspotId);
    if (!h) return [];
    return d.questions.map((q) => ({ q, d, h }));
  });

  const shown = onlyStarred ? rows.filter((r) => starred.has(r.q.id)) : rows;

  const toggleReveal = (id: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="bank">
      <div className="bank-head">
        <h2>예상 질문 {shown.length}개</h2>
        <label className="chk">
          <input
            type="checkbox"
            checked={onlyStarred}
            onChange={(e) => setOnlyStarred(e.target.checked)}
          />
          오늘 볼 질문만 ({starred.size})
        </label>
      </div>

      <p className="bank-note">
        질문을 먼저 소리 내어 답한 뒤 «답변 핵심 보기»를 누르세요. 먼저 읽으면 연습이 되지
        않습니다.
      </p>

      {shown.length === 0 && (
        <p className="note-line">표시할 질문이 없습니다. 상세 화면에서 ☆를 눌러 담으세요.</p>
      )}

      {shown.map(({ q, d, h }) => {
        const qLabel = questionById.get(h.questionId)?.label ?? '';
        const open = revealed.has(q.id);
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

            <button className="reveal" onClick={() => toggleReveal(q.id)}>
              {open ? '답변 핵심 접기' : '답변 핵심 보기'}
            </button>

            {open && (
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
                {q.followups && q.followups.length > 0 && (
                  <>
                    <h4>꼬리질문</h4>
                    <ul>
                      {q.followups.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
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
