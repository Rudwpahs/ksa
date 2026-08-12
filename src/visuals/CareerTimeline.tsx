/**
 * 진로 희망의 연속성.
 * 생기부에 2년간 기록된 진로 희망이 자소서 Q6의 "라이프테크"로 이어진다는 것을 보여 준다.
 * 각 항목은 생기부에서 직접 확인한 문구다.
 */

const STAGES = [
  {
    when: '1학년',
    where: '생기부 진로활동',
    text: 'IT 및 공학 분야 CEO',
    kind: 'panel' as const,
  },
  {
    when: '2학년',
    where: '생기부 진로활동',
    text: 'IT 관련 분야, IT 전문 기업 경영자',
    kind: 'panel' as const,
  },
  {
    when: '2학년',
    where: '생기부 창업 활동',
    text: '바이오 기술을 접목한 웨어러블 기기 제작 아이디어를 제시함',
    kind: 'panel' as const,
    strong: true,
  },
  {
    when: '3학년',
    where: '자기소개서 Q6',
    text: '라이프테크 사업에 성공하는 것',
    kind: 'essay' as const,
  },
];

export function CareerTimeline() {
  return (
    <figure className="viz">
      <ol className="career">
        {STAGES.map((s, i) => (
          <li className={`career-item ${s.kind} ${s.strong ? 'strong' : ''}`} key={i}>
            <span className="career-dot" aria-hidden="true" />
            <div className="career-body">
              <div className="career-meta">
                <b>{s.when}</b>
                <span>{s.where}</span>
              </div>
              <p className="career-text">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="viz-cap">
        진로 희망이 <strong>2년간 흔들리지 않았고</strong>, 자소서의 “라이프테크”는 갑자기
        나온 말이 아닙니다. 특히 2학년의 <strong>웨어러블 기기</strong> 아이디어는 추상적인
        단어를 구체적 제품으로 바꿔 말할 근거가 됩니다.
      </figcaption>

      <p className="viz-note">
        면접에서 “라이프테크가 뭔가요?”를 받으면, 정의를 먼저 말한 뒤 이 웨어러블 아이디어를
        예로 들면 생기부 근거와 자소서가 한 줄로 이어집니다.
      </p>
    </figure>
  );
}
