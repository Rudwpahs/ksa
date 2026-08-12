import { useState } from 'react';

/**
 * 파노 평면 — 점 7개, 직선 7개.
 * 두 직선을 고르면 반드시 한 점에서 만난다는 것을 직접 눌러 확인한다.
 * 도블에서 "두 카드에 공통 그림이 정확히 하나"와 같은 구조다.
 */

const P: Record<string, [number, number]> = {
  A: [150, 20], // 위 꼭짓점
  B: [20, 245], // 왼쪽 아래
  C: [280, 245], // 오른쪽 아래
  D: [85, 132], // AB 중점
  E: [215, 132], // AC 중점
  F: [150, 245], // BC 중점
  G: [150, 165], // 중심
};

/** 7개의 직선 = 각각 3개의 점을 지난다 */
const LINES: Array<{ id: string; pts: [string, string, string]; kind: 'line' | 'circle' }> = [
  { id: 'L1', pts: ['A', 'D', 'B'], kind: 'line' },
  { id: 'L2', pts: ['A', 'E', 'C'], kind: 'line' },
  { id: 'L3', pts: ['B', 'F', 'C'], kind: 'line' },
  { id: 'L4', pts: ['A', 'G', 'F'], kind: 'line' },
  { id: 'L5', pts: ['B', 'G', 'E'], kind: 'line' },
  { id: 'L6', pts: ['C', 'G', 'D'], kind: 'line' },
  { id: 'L7', pts: ['D', 'E', 'F'], kind: 'circle' },
];

export function FanoPlane() {
  const [picked, setPicked] = useState<string[]>(['L1', 'L3']);

  const toggle = (id: string) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev.slice(-1), id]; // 항상 최대 2개
    });
  };

  const [a, b] = picked;
  const la = LINES.find((l) => l.id === a);
  const lb = LINES.find((l) => l.id === b);
  const shared =
    la && lb ? la.pts.filter((p) => lb.pts.includes(p)) : [];

  return (
    <figure className="viz">
      <svg viewBox="0 0 300 275" className="viz-svg" role="img" aria-label="파노 평면">
        {/* 직선 7개 */}
        {LINES.map((l) => {
          const on = picked.includes(l.id);
          const cls = `fano-line ${on ? 'on' : ''}`;
          if (l.kind === 'circle') {
            return (
              <circle
                key={l.id}
                className={cls}
                cx={150}
                cy={170}
                r={64}
                fill="none"
                onClick={() => toggle(l.id)}
              />
            );
          }
          const [s, , e] = l.pts;
          return (
            <line
              key={l.id}
              className={cls}
              x1={P[s][0]}
              y1={P[s][1]}
              x2={P[e][0]}
              y2={P[e][1]}
              onClick={() => toggle(l.id)}
            />
          );
        })}

        {/* 점 7개 */}
        {Object.entries(P).map(([id, [x, y]]) => (
          <g key={id}>
            <circle
              className={`fano-pt ${shared.includes(id) ? 'shared' : ''}`}
              cx={x}
              cy={y}
              r={shared.includes(id) ? 11 : 7}
            />
            <text className="fano-label" x={x} y={y - 14} textAnchor="middle">
              {id}
            </text>
          </g>
        ))}
      </svg>

      <div className="viz-controls">
        {LINES.map((l) => (
          <button
            key={l.id}
            className={`viz-chip ${picked.includes(l.id) ? 'on' : ''}`}
            onClick={() => toggle(l.id)}
          >
            {l.pts.join('')}
          </button>
        ))}
      </div>

      <figcaption className="viz-cap">
        {shared.length === 1 ? (
          <>
            <strong>{la?.pts.join('')}</strong>과 <strong>{lb?.pts.join('')}</strong>은 점{' '}
            <strong>{shared[0]}</strong> 하나에서만 만납니다. 어떤 두 직선을 골라도 그렇습니다
            — 평행선이 없습니다.
          </>
        ) : (
          '직선 두 개를 고르세요. 어떤 조합이든 공통점이 정확히 하나 나옵니다.'
        )}
      </figcaption>
      <p className="viz-note">
        점 7 · 직선 7 · 한 직선 위의 점 3개. 카드를 직선, 그림을 점으로 바꾸면 도블의 규칙이
        됩니다. 단, 이것은 <strong>가장 작은 모델</strong>이지 상용 도블과 같은 크기가
        아닙니다.
      </p>
    </figure>
  );
}
