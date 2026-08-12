import { details, evidenceById, hotspotsByQuestion, questions } from '../data';
import type { QuestionId } from '../types';

interface Props {
  onGoto: (hotspotId: string) => void;
  onOpenQuestion: (qid: QuestionId) => void;
}

/**
 * 전체 지도 — 6문항을 한 화면에서 비교한다.
 * 어느 문항이 위험한지, 면접관이 볼 수 있는 근거가 있는지를 먼저 보고 들어간다.
 */
export function Overview({ onGoto, onOpenQuestion }: Props) {
  const rows = questions.map((q) => {
    const spots = hotspotsByQuestion(q.id);
    const ds = spots
      .map((h) => details.find((d) => d.hotspotId === h.id))
      .filter((d): d is NonNullable<typeof d> => Boolean(d));

    const high = ds.flatMap((d) => d.risks ?? []).filter((r) => r.level === 'HIGH').length;
    const watch = ds.flatMap((d) => d.risks ?? []).filter((r) => r.level === 'WATCH').length;
    const qs = ds.reduce((n, d) => n + d.questions.length, 0);

    const evIds = new Set(ds.flatMap((d) => d.evidenceIds));
    const panel = [...evIds].filter(
      (id) => evidenceById.get(id)?.visibility === 'PANEL',
    ).length;
    const prep = evIds.size - panel;

    return { q, spots, high, watch, qs, panel, prep };
  });

  const maxRisk = Math.max(...rows.map((r) => r.high + r.watch), 1);

  return (
    <div className="ov">
      <header className="ov-head">
        <h2>전체 지도</h2>
        <p className="bank-note">
          한과영 3차는 제출 서류(자소서·생기부)를 깊게 파고든 뒤, 모르는 척·과장·협업 경계가
          흐린 지점을 꼬리질문으로 확인합니다. 어느 문항이 위험한지, PANEL 근거가 있는지 먼저
          보고 들어가세요.
        </p>
      </header>

      <section className="ov-path" aria-label="오늘 필수 경로">
        <h3 className="ov-path-title">오늘 필수 경로</h3>
        <p className="ov-path-note">
          구두 증명(Q1) → 측정 정직성(Q3) → 협업·알고리즘(Q4) → 왜 KSA(Q6). 이 네 지점이
          면접에서 가장 자주 묶입니다.
        </p>
        <div className="ov-path-row">
          {(
            [
              ['h1-fano', 'Q1 파노'],
              ['h3-mu', 'Q3 Δx≠μ'],
              ['h4-seat', 'Q4 자리배치'],
              ['h6-ksa', 'Q6 왜 KSA'],
            ] as const
          ).map(([id, label]) => (
            <button key={id} className="ov-path-chip" onClick={() => onGoto(id)}>
              {label}
            </button>
          ))}
        </div>
      </section>

      <div className="ov-grid">
        {rows.map(({ q, spots, high, watch, qs, panel, prep }) => (
          <article className={`ov-card heat-${q.heat}`} key={q.id}>
            <button className="ov-title" onClick={() => onOpenQuestion(q.id)}>
              <span className="ov-qid">{q.id.toUpperCase()}</span>
              <span className={`ov-heat h-${q.heat}`}>
                {q.heat === 'S' ? '최우선' : q.heat === 'A' ? '중요' : '보조'}
              </span>
            </button>

            <p className="ov-prompt">{q.prompt}</p>

            {/* 위험 막대 */}
            <div className="ov-bar" title={`위험 ${high}건, 주의 ${watch}건`}>
              <span
                className="ov-bar-high"
                style={{ width: `${(high / maxRisk) * 100}%` }}
              />
              <span
                className="ov-bar-watch"
                style={{ width: `${(watch / maxRisk) * 100}%` }}
              />
            </div>
            <div className="ov-riskline">
              {high > 0 && <b className="r-high">위험 {high}</b>}
              {watch > 0 && <b className="r-watch">주의 {watch}</b>}
              {high + watch === 0 && <span className="r-none">위험 없음</span>}
            </div>

            {/* 근거 구성 */}
            <div className="ov-ev">
              <span className={`ov-ev-panel ${panel === 0 ? 'zero' : ''}`}>
                PANEL {panel}
              </span>
              <span className="ov-ev-prep">PREP {prep}</span>
              <span className="ov-ev-q">질문 {qs}</span>
            </div>

            {panel === 0 && (
              <p className="ov-warn">면접관이 볼 수 있는 근거가 없습니다</p>
            )}

            <div className="ov-spots">
              {spots.map((h) => (
                <button
                  key={h.id}
                  className={`ov-spot p-${h.priority} ${h.tags.includes('RISK') ? 'risky' : ''}`}
                  onClick={() => onGoto(h.id)}
                  title={h.tooltip}
                >
                  {h.exactText.length > 16 ? `${h.exactText.slice(0, 16)}…` : h.exactText}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
