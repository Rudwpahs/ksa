import { details, hotspotById, questionById, sentenceById } from '../data';
import { RiskBadge } from './badges';

interface Props {
  onGoto: (hotspotId: string) => void;
  checked: Set<string>;
  onToggleCheck: (id: string) => void;
}

/**
 * 위험 표현만 모아 보는 화면.
 * HIGH를 먼저, WATCH를 뒤에 둔다. 각 항목에 "이렇게 말한다"가 반드시 붙는다.
 */
export function RedFlagView({ onGoto, checked, onToggleCheck }: Props) {
  const rows = details.flatMap((d) => {
    const h = hotspotById.get(d.hotspotId);
    if (!h) return [];
    return (d.risks ?? []).map((r, i) => ({
      key: `${d.id}-${i}`,
      risk: r,
      h,
      sentence: sentenceById.get(h.sentenceId)?.text ?? '',
    }));
  });

  const high = rows.filter((r) => r.risk.level === 'HIGH');
  const watch = rows.filter((r) => r.risk.level === 'WATCH');

  return (
    <div className="flags">
      <div className="flags-head">
        <h2>정정해야 할 표현 {rows.length}건</h2>
        <p className="bank-note">
          위험 {high.length}건, 주의 {watch.length}건. 체크한 항목은 브라우저에 저장됩니다.
        </p>
      </div>

      {[
        { title: '▲ 위험 — 지적당하면 되돌리기 어렵습니다', list: high },
        { title: '△ 주의 — 표현을 다듬어 두면 좋습니다', list: watch },
      ].map((group) => (
        <section className="flag-group" key={group.title}>
          <h3 className="flag-group-h">{group.title}</h3>
          {group.list.map(({ key, risk, h, sentence }) => (
            <div className={`flag ${checked.has(key) ? 'done' : ''}`} key={key}>
              <label className="flag-chk">
                <input
                  type="checkbox"
                  checked={checked.has(key)}
                  onChange={() => onToggleCheck(key)}
                />
                <span className="sr-only">확인함</span>
              </label>
              <div className="flag-main">
                <div className="badge-row">
                  <RiskBadge level={risk.level} />
                  <span className="badge q-tag">
                    {questionById.get(h.questionId)?.label}
                  </span>
                </div>
                <blockquote className="flag-phrase">{h.exactText}</blockquote>
                <p className="flag-sentence">{sentence}</p>
                <p className="flag-text">{risk.text}</p>
                {risk.saferPhrasing && (
                  <p className="risk-safe">
                    <span className="safe-tag">이렇게 말한다</span>
                    {risk.saferPhrasing}
                  </p>
                )}
                <button className="linkish" onClick={() => onGoto(h.id)}>
                  원문 문장으로 →
                </button>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
