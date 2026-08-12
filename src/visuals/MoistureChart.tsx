import { useState } from 'react';

/**
 * 탐구보고서 4장의 측정 결과를 그대로 그린다.
 * 자소서가 말한 "V 자형"과 실제 데이터의 형태 차이를 눈으로 확인하는 것이 목적이다.
 */

const DATA = [
  { water: 350, ratio: 43.75, n: 3, mean: 28.16, sd: 10.24, min: 16.8, max: 36.67 },
  { water: 370, ratio: 46.25, n: 2, mean: 32.04, sd: 0.16, min: 31.93, max: 32.15 },
  { water: 410, ratio: 51.25, n: 3, mean: 27.62, sd: 4.89, min: 21.98, max: 30.74 },
  { water: 450, ratio: 56.25, n: 3, mean: 31.42, sd: 2.82, min: 29.23, max: 34.59 },
];

const W = 420;
const H = 260;
const PAD = { l: 46, r: 16, t: 18, b: 52 };
const yMin = 10;
const yMax = 40;

const px = (i: number) =>
  PAD.l + ((i + 0.5) * (W - PAD.l - PAD.r)) / DATA.length;
const py = (v: number) =>
  PAD.t + ((yMax - v) / (yMax - yMin)) * (H - PAD.t - PAD.b);

export function MoistureChart() {
  const [showRange, setShowRange] = useState(true);
  const [showClaim, setShowClaim] = useState(false);

  const line = DATA.map((d, i) => `${px(i)},${py(d.mean)}`).join(' ');
  // 자소서가 말한 V자형: 내려갔다 올라오는 단일 골짜기
  const claim = [
    `${px(0)},${py(33)}`,
    `${px(1)},${py(26)}`,
    `${px(2)},${py(26)}`,
    `${px(3)},${py(33)}`,
  ].join(' ');

  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} className="viz-svg wide" role="img" aria-label="수분량별 Δx">
        {/* y축 눈금 */}
        {[10, 15, 20, 25, 30, 35, 40].map((v) => (
          <g key={v}>
            <line className="ch-grid" x1={PAD.l} y1={py(v)} x2={W - PAD.r} y2={py(v)} />
            <text className="ch-tick" x={PAD.l - 8} y={py(v) + 4} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        <text className="ch-axis" x={12} y={PAD.t + 8}>
          Δx
        </text>
        <text className="ch-axis" x={12} y={PAD.t + 22}>
          (cm)
        </text>

        {/* 표준편차 범위 (min~max) */}
        {showRange &&
          DATA.map((d, i) => (
            <g key={`r${i}`}>
              <line
                className="ch-range"
                x1={px(i)}
                y1={py(d.max)}
                x2={px(i)}
                y2={py(d.min)}
              />
              <line
                className="ch-cap"
                x1={px(i) - 7}
                y1={py(d.max)}
                x2={px(i) + 7}
                y2={py(d.max)}
              />
              <line
                className="ch-cap"
                x1={px(i) - 7}
                y1={py(d.min)}
                x2={px(i) + 7}
                y2={py(d.min)}
              />
            </g>
          ))}

        {/* 자소서 주장 V자 */}
        {showClaim && <polyline className="ch-claim" points={claim} />}

        {/* 실제 평균 */}
        <polyline className="ch-line" points={line} />
        {DATA.map((d, i) => (
          <g key={d.water}>
            <circle className="ch-dot" cx={px(i)} cy={py(d.mean)} r={5.5} />
            <text className="ch-val" x={px(i)} y={py(d.mean) - 12} textAnchor="middle">
              {d.mean}
            </text>
            <text className="ch-xlabel" x={px(i)} y={H - 30} textAnchor="middle">
              {d.water}g
            </text>
            <text className="ch-xsub" x={px(i)} y={H - 16} textAnchor="middle">
              {d.ratio}% · {d.n}회
            </text>
          </g>
        ))}
      </svg>

      <div className="viz-controls">
        <button
          className={`viz-chip ${showRange ? 'on' : ''}`}
          onClick={() => setShowRange((v) => !v)}
        >
          측정 범위(최소~최대)
        </button>
        <button
          className={`viz-chip claim ${showClaim ? 'on' : ''}`}
          onClick={() => setShowClaim((v) => !v)}
        >
          자소서가 말한 “V 자형”
        </button>
      </div>

      <figcaption className="viz-cap">
        실제 평균은 <strong>28.16 → 32.04 → 27.62 → 31.42</strong>으로 올라갔다 내려갔다 다시
        올라갑니다. 한 번 내려갔다 올라오는 V자와 형태가 다릅니다.
      </figcaption>

      <p className="viz-note danger">
        350g 조건의 측정 범위는 16.8~36.67cm입니다. <strong>조건 사이의 차이(약 4cm)보다
        한 조건 안의 흩어짐이 훨씬 큽니다.</strong> 이 데이터로 곡선 형태를 주장하기는
        어렵습니다.
      </p>
    </figure>
  );
}
