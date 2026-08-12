import { useState } from 'react';

/**
 * 나비 정리 도형.
 *
 * 현 AB의 중점 M을 지나는 두 현 CD, EF를 그으면
 * CF와 DE가 AB와 만나는 점 X, Y는 M에서 같은 거리에 있다.
 *
 * 좌표는 반지름 110, 중심 (150,140), 현 AB를 y=190에 두고 계산한 실제 값이다.
 */

const O = { x: 150, y: 140, r: 110 };
const A = { x: 52, y: 190 };
const B = { x: 248, y: 190 };
const M = { x: 150, y: 190 };
const C = { x: 225.2, y: 59.8 };
const D = { x: 118.1, y: 245.2 };
const E = { x: 74.8, y: 59.8 };
const F = { x: 181.9, y: 245.2 };
const X = { x: 194.79, y: 190 };
const Y = { x: 105.21, y: 190 };

const PT = (p: { x: number; y: number }, label: string, cls = '') => (
  <g key={label}>
    <circle className={`geo-pt ${cls}`} cx={p.x} cy={p.y} r={4.5} />
    <text className="geo-label" x={p.x} y={p.y - 9} textAnchor="middle">
      {label}
    </text>
  </g>
);

export function ButterflyTheorem() {
  const [showWings, setShowWings] = useState(true);

  return (
    <figure className="viz">
      <svg viewBox="0 0 300 280" className="viz-svg" role="img" aria-label="나비 정리">
        <circle className="geo-circle" cx={O.x} cy={O.y} r={O.r} />

        {/* 현 AB */}
        <line className="geo-chord base" x1={A.x} y1={A.y} x2={B.x} y2={B.y} />

        {/* M을 지나는 두 현 */}
        <line className="geo-chord" x1={C.x} y1={C.y} x2={D.x} y2={D.y} />
        <line className="geo-chord" x1={E.x} y1={E.y} x2={F.x} y2={F.y} />

        {/* 나비의 두 날개 CF, DE */}
        {showWings && (
          <>
            <path
              className="geo-wing w1"
              d={`M${C.x} ${C.y} L${F.x} ${F.y} L${M.x} ${M.y} Z`}
            />
            <path
              className="geo-wing w2"
              d={`M${E.x} ${E.y} L${D.x} ${D.y} L${M.x} ${M.y} Z`}
            />
          </>
        )}
        <line className="geo-cross" x1={C.x} y1={C.y} x2={F.x} y2={F.y} />
        <line className="geo-cross" x1={D.x} y1={D.y} x2={E.x} y2={E.y} />

        {/* 등거리 표시 */}
        <line className="geo-eq" x1={Y.x} y1={190} x2={M.x} y2={190} />
        <line className="geo-eq" x1={M.x} y1={190} x2={X.x} y2={190} />
        <text className="geo-eqlabel" x={(Y.x + M.x) / 2} y={207} textAnchor="middle">
          MY
        </text>
        <text className="geo-eqlabel" x={(M.x + X.x) / 2} y={207} textAnchor="middle">
          MX
        </text>

        {PT(A, 'A')}
        {PT(B, 'B')}
        {PT(C, 'C')}
        {PT(D, 'D')}
        {PT(E, 'E')}
        {PT(F, 'F')}
        {PT(M, 'M', 'mid')}
        {PT(X, 'X', 'hit')}
        {PT(Y, 'Y', 'hit')}
      </svg>

      <div className="viz-controls">
        <button
          className={`viz-chip ${showWings ? 'on' : ''}`}
          onClick={() => setShowWings((v) => !v)}
        >
          날개 보기
        </button>
      </div>

      <figcaption className="viz-cap">
        현 AB의 중점 M을 지나는 두 현을 그으면, 엇갈려 이은 선 CF와 DE가 AB와 만나는 점 X,
        Y가 <strong>M에서 같은 거리</strong>에 있습니다. 이 그림에서 MX = MY = 44.8입니다.
      </figcaption>
      <p className="viz-note">
        조건에서 <strong>M이 AB의 중점</strong>이라는 점이 핵심입니다. 이 조건을 빼고 정리를
        말하면 틀립니다.
      </p>
    </figure>
  );
}
