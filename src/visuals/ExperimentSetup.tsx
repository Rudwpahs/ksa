/**
 * 실험 장치도 — 탐구보고서 3-2, 3-3의 수치를 그대로 반영한다.
 * 경사면 높이 28.4cm, 빗면 길이 90cm, 눈금 1칸 = 1cm.
 * Δx = 순수 구름 상태에서 1회전했을 때 있어야 할 위치와 실제 위치의 차이.
 */
export function ExperimentSetup() {
  return (
    <figure className="viz">
      <svg viewBox="0 0 420 240" className="viz-svg wide" role="img" aria-label="실험 장치도">
        {/* 빗면 */}
        <polygon className="ex-ramp" points="40,190 40,70 330,190" />
        <line className="ex-surface" x1={40} y1={70} x2={330} y2={190} />

        {/* 반죽 층 */}
        <line className="ex-dough" x1={44} y1={73} x2={328} y2={188} />
        <text className="ex-note" x={150} y={118}>
          밀가루 800g + 물
        </text>

        {/* 높이 표시 */}
        <line className="ex-dim" x1={26} y1={70} x2={26} y2={190} />
        <text className="ex-dim-label" x={22} y={132} textAnchor="end" transform="rotate(-90 22 132)">
          28.4cm
        </text>

        {/* 빗면 길이 */}
        <text className="ex-dim-label" x={175} y={148} transform="rotate(22.5 175 148)">
          빗면 90cm
        </text>

        {/* 바닥 */}
        <line className="ex-ground" x1={20} y1={190} x2={410} y2={190} />

        {/* 눈금판 */}
        {Array.from({ length: 22 }, (_, i) => 200 + i * 9).map((x) => (
          <line key={x} className="ex-scale" x1={x} y1={190} x2={x} y2={197} />
        ))}
        <text className="ex-note" x={300} y={212}>
          눈금 1칸 = 1cm
        </text>

        {/* 기준점: 순수 구름 상태의 위치 */}
        <circle className="ex-ball ghost" cx={302} cy={175} r={15} />
        <line className="ex-refline" x1={302} y1={155} x2={302} y2={225} />
        <text className="ex-ref-label" x={302} y={238} textAnchor="middle">
          순수 구름 1회전 위치
        </text>

        {/* 실제 위치 */}
        <circle className="ex-ball real" cx={356} cy={175} r={15} />
        <line className="ex-realline" x1={356} y1={155} x2={356} y2={225} />

        {/* Δx */}
        <line className="ex-delta" x1={302} y1={150} x2={356} y2={150} markerEnd="url(#ah)" markerStart="url(#ah2)" />
        <text className="ex-delta-label" x={329} y={143} textAnchor="middle">
          Δx
        </text>

        <defs>
          <marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" className="ex-arrow" />
          </marker>
          <marker id="ah2" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto">
            <path d="M7,0 L0,3.5 L7,7 z" className="ex-arrow" />
          </marker>
        </defs>
      </svg>

      <figcaption className="viz-cap">
        공을 1회전 굴렸을 때, 미끄러짐이 전혀 없다면 있어야 할 위치(옅은 공)와 실제로 멈춘
        위치(진한 공)의 차이가 <strong>Δx</strong>입니다. 영상에서 1회전 순간의 프레임을 잡아
        눈금으로 읽었습니다.
      </figcaption>

      <p className="viz-note danger">
        Δx의 단위는 <strong>cm</strong>이고 마찰계수는 <strong>단위가 없는 비</strong>입니다.
        같은 양이 아니라 미끄러짐 정도를 짐작하는 대리 지표입니다.
      </p>
    </figure>
  );
}
