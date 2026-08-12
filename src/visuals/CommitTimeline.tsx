/**
 * 두 저장소의 커밋 시점을 한 축에 놓는다.
 * 자소서가 "최근에 두 가지"로 묶은 프로젝트의 시점 차이를 눈으로 보여 주는 것이 목적이다.
 * 날짜는 GitHub commit 목록에서 직접 확인한 값이다.
 */

const START = 2022.5;
const END = 2026.8;
const W = 420;
const PAD = 54;

const x = (year: number) => PAD + ((year - START) / (END - START)) * (W - PAD - 20);

const YOGA = [
  { y: 2022.67, label: '2022.09 최초 커밋' },
  { y: 2026.49, label: '2026.06 웹 배포' },
];
const SHOOT = [
  { y: 2026.14, label: '2026.02 최초 커밋' },
  { y: 2026.35, label: '2026.05 Streamlit 배포' },
  { y: 2026.61, label: '2026.08.11 안정화' },
];

export function CommitTimeline() {
  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} 200`} className="viz-svg wide" role="img" aria-label="커밋 타임라인">
        {/* 연도 눈금 */}
        {[2023, 2024, 2025, 2026].map((y) => (
          <g key={y}>
            <line className="tl-grid" x1={x(y)} y1={28} x2={x(y)} y2={168} />
            <text className="tl-year" x={x(y)} y={186} textAnchor="middle">
              {y}
            </text>
          </g>
        ))}

        {/* 요가 */}
        <text className="tl-name" x={4} y={62}>
          요가
        </text>
        <line className="tl-track yoga" x1={x(YOGA[0].y)} y1={56} x2={x(YOGA[1].y)} y2={56} />
        {YOGA.map((c) => (
          <g key={c.label}>
            <circle className="tl-dot yoga" cx={x(c.y)} cy={56} r={5.5} />
          </g>
        ))}
        <text className="tl-cap" x={x(YOGA[0].y)} y={44} textAnchor="start">
          2022.09 시작
        </text>
        <text className="tl-cap" x={x(YOGA[1].y)} y={44} textAnchor="end">
          2026.06
        </text>

        {/* 슈팅 */}
        <text className="tl-name" x={4} y={112}>
          슈팅
        </text>
        <line
          className="tl-track shoot"
          x1={x(SHOOT[0].y)}
          y1={106}
          x2={x(SHOOT[2].y)}
          y2={106}
        />
        {SHOOT.map((c) => (
          <circle key={c.label} className="tl-dot shoot" cx={x(c.y)} cy={106} r={5.5} />
        ))}
        <text className="tl-cap" x={x(SHOOT[0].y) - 4} y={94} textAnchor="end">
          2026.02 시작
        </text>

        {/* 자소서 제출 시점 — 미상 구간 */}
        <rect className="tl-unknown" x={x(2026.4)} y={130} width={x(2026.65) - x(2026.4)} height={28} rx={4} />
        <text className="tl-unknown-label" x={x(2026.52)} y={148} textAnchor="middle">
          자소서 제출 ?
        </text>
      </svg>

      <figcaption className="viz-cap">
        요가는 <strong>2022년 9월</strong>, 슈팅은 <strong>2026년 2월</strong> 시작입니다.
        자소서는 둘을 “최근에 … 두 가지”로 묶었지만 시작 시점이 3년 반 차이 납니다.
      </figcaption>

      <p className="viz-note danger">
        <strong>자소서 제출일이 확인되지 않았습니다.</strong> 2026년 8월 11일 커밋이 제출 전인지
        후인지 모르면, 그 이후 기능을 “지원서 당시 기능”으로 말할 위험이 있습니다. 제출일을
        먼저 확정하세요.
      </p>
    </figure>
  );
}
