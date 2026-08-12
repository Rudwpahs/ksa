import { useState } from 'react';

/**
 * 이분 매칭 증가 경로를 단계별로 보여 준다.
 *
 * 예시는 arrange.py 파일 끝의 주석에 실제로 적혀 있는 데이터를 그대로 쓴다.
 *   can[1] = [1, 2]  can[2] = [1]  can[3] = [2, 3]  can[4] = [4]  can[5] = [5]
 *
 * 학생 2가 좌석 1을 원하는데 이미 학생 1이 앉아 있는 상황에서,
 * 학생 1을 좌석 2로 밀어내고 학생 2가 좌석 1에 앉는 과정이 증가 경로다.
 */

const CAN: Record<number, number[]> = {
  1: [1, 2],
  2: [1],
  3: [2, 3],
  4: [4],
  5: [5],
};

interface Step {
  title: string;
  desc: string;
  /** 학생 → 좌석 */
  match: Record<number, number>;
  /** 지금 강조할 경로 (학생,좌석 쌍의 연속) */
  path: Array<[number, number]>;
  /** 되돌아 나가는 경로 (밀어내기) */
  bump?: Array<[number, number]>;
  active?: number;
}

const STEPS: Step[] = [
  {
    title: '시작',
    desc: '아무도 자리를 받지 않았습니다. 학생마다 희망 좌석이 최대 3개까지 연결되어 있습니다.',
    match: {},
    path: [],
  },
  {
    title: '학생 1 → 좌석 1',
    desc: '학생 1이 첫 희망인 좌석 1을 봅니다. 비어 있으므로 그대로 앉습니다.',
    match: { 1: 1 },
    path: [[1, 1]],
    active: 1,
  },
  {
    title: '학생 2 → 좌석 1 (이미 참)',
    desc: '학생 2의 희망은 좌석 1뿐인데 학생 1이 앉아 있습니다. 여기서 포기하지 않고, 학생 1을 다른 희망 좌석으로 옮길 수 있는지 재귀로 확인합니다.',
    match: { 1: 1 },
    path: [[2, 1]],
    active: 2,
  },
  {
    title: '증가 경로 발견',
    desc: '학생 1에게는 좌석 2라는 다른 희망이 있고 그 자리는 비어 있습니다. 학생 1을 좌석 2로 옮기면 좌석 1이 빕니다.',
    match: { 1: 1 },
    path: [[2, 1]],
    bump: [[1, 2]],
    active: 2,
  },
  {
    title: '경로를 뒤집어 배정 인원 +1',
    desc: '학생 1은 좌석 2로, 학생 2는 좌석 1로. 한 명도 밀려나지 않고 배정 인원만 1 늘었습니다. 이것이 증가 경로입니다.',
    match: { 1: 2, 2: 1 },
    path: [
      [1, 2],
      [2, 1],
    ],
    active: 2,
  },
  {
    title: '학생 3 → 좌석 3',
    desc: '학생 3의 첫 희망 좌석 2는 이제 학생 1이 쓰고 있고, 학생 1은 옮길 곳이 없습니다. 그래서 두 번째 희망인 좌석 3으로 갑니다.',
    match: { 1: 2, 2: 1, 3: 3 },
    path: [[3, 3]],
    active: 3,
  },
  {
    title: '전원 배정 완료',
    desc: '학생 4와 5는 희망 좌석이 비어 있어 바로 앉습니다. 5명 모두 희망 좌석 중 하나를 받았습니다 — 최대 매칭입니다.',
    match: { 1: 2, 2: 1, 3: 3, 4: 4, 5: 5 },
    path: [],
  },
];

const LX = 60;
const RX = 240;
const Y0 = 40;
const DY = 44;

export function BipartiteMatching() {
  const [i, setI] = useState(0);
  const s = STEPS[i];

  const pathSet = new Set(s.path.map(([l, r]) => `${l}-${r}`));
  const bumpSet = new Set((s.bump ?? []).map(([l, r]) => `${l}-${r}`));

  return (
    <figure className="viz">
      <svg viewBox="0 0 300 260" className="viz-svg" role="img" aria-label="이분 매칭 과정">
        <text className="bg-head" x={LX} y={20} textAnchor="middle">
          학생
        </text>
        <text className="bg-head" x={RX} y={20} textAnchor="middle">
          좌석
        </text>

        {/* 희망 간선 (회색) */}
        {Object.entries(CAN).flatMap(([l, rs]) =>
          rs.map((r) => {
            const key = `${l}-${r}`;
            const matched = s.match[Number(l)] === r;
            const cls = bumpSet.has(key)
              ? 'bump'
              : pathSet.has(key)
                ? 'path'
                : matched
                  ? 'matched'
                  : 'wish';
            return (
              <line
                key={key}
                className={`bg-edge ${cls}`}
                x1={LX + 13}
                y1={Y0 + (Number(l) - 1) * DY}
                x2={RX - 13}
                y2={Y0 + (r - 1) * DY}
              />
            );
          }),
        )}

        {/* 노드 */}
        {[1, 2, 3, 4, 5].map((n) => (
          <g key={`l${n}`}>
            <circle
              className={`bg-node student ${s.active === n ? 'active' : ''} ${
                s.match[n] ? 'seated' : ''
              }`}
              cx={LX}
              cy={Y0 + (n - 1) * DY}
              r={13}
            />
            <text className="bg-num" x={LX} y={Y0 + (n - 1) * DY + 4} textAnchor="middle">
              {n}
            </text>
          </g>
        ))}
        {[1, 2, 3, 4, 5].map((n) => {
          const taken = Object.values(s.match).includes(n);
          return (
            <g key={`r${n}`}>
              <rect
                className={`bg-node seat ${taken ? 'seated' : ''}`}
                x={RX - 13}
                y={Y0 + (n - 1) * DY - 13}
                width={26}
                height={26}
                rx={5}
              />
              <text className="bg-num" x={RX} y={Y0 + (n - 1) * DY + 4} textAnchor="middle">
                {n}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="viz-steps">
        <button
          className="viz-step-btn"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
        >
          ← 이전
        </button>
        <span className="viz-step-count">
          {i + 1} / {STEPS.length}
        </span>
        <button
          className="viz-step-btn"
          onClick={() => setI((v) => Math.min(STEPS.length - 1, v + 1))}
          disabled={i === STEPS.length - 1}
        >
          다음 →
        </button>
      </div>

      <figcaption className="viz-cap">
        <strong>{s.title}</strong> — {s.desc}
      </figcaption>

      <div className="viz-legend">
        <span>
          <i className="lg wish" /> 희망
        </span>
        <span>
          <i className="lg matched" /> 배정됨
        </span>
        <span>
          <i className="lg path" /> 지금 시도
        </span>
        <span>
          <i className="lg bump" /> 밀어내기
        </span>
      </div>

      <p className="viz-note">
        예시 데이터는 <code>arrange.py</code> 끝의 주석에 적혀 있는 그대로입니다.
        <br />
        <code>can[1]=[1,2] can[2]=[1] can[3]=[2,3] can[4]=[4] can[5]=[5]</code>
      </p>
    </figure>
  );
}
