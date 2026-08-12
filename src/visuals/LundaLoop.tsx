import { useState } from 'react';

/**
 * LUNDA / PR1 — 화면 의존을 줄이는 방향과 BUILD·TEST·LEARN.
 * Q6 "통합/혁명"을 큰 말 대신 작은 루프로 낮출 때 쓴다.
 */
const STEPS = [
  {
    id: 'idea',
    label: 'IDEA',
    title: 'LISTEN OUTSIDE',
    body: '필요한 소리는 남긴다. 화면은 뒤로 물러나게 한다.',
  },
  {
    id: 'problem',
    label: 'PROBLEM',
    title: 'WITHOUT DISTRACTION',
    body: '공원·운동장에서 폰을 계속 보는 습관이 문제다.',
  },
  {
    id: 'build',
    label: 'BUILD',
    title: 'PROTOTYPE',
    body: 'Bluetooth/Wi‑Fi 없이 outdoor audio PoC를 만든다. 예산 약 15만 원.',
  },
  {
    id: 'test',
    label: 'TEST',
    title: '654 B 제약',
    body: '초기 패킷 654 B가 RF 한 칸에 안 들어간다. localhost 성공 ≠ RF 성공.',
  },
  {
    id: 'learn',
    label: 'LEARN',
    title: 'GO / NO-GO',
    body: '설계를 고집하지 않고 압축·분할. 하드웨어 검증 GO, 양산 NO-GO.',
  },
] as const;

export function LundaLoop() {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div className="viz lunda-loop">
      <p className="viz-lead">
        큰 말(혁명·통합)을 키우지 말고, 이 루프를 한 바퀴 말로 설명하세요.
      </p>

      <div className="ll-track" role="tablist" aria-label="BUILD TEST LEARN">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={`ll-dot ${idx === i ? 'on' : ''} ${idx < i ? 'done' : ''}`}
            onClick={() => setI(idx)}
          >
            <span className="ll-dot-n">{idx + 1}</span>
            <span className="ll-dot-l">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="ll-card" role="tabpanel">
        <p className="ll-label">{step.label}</p>
        <h5 className="ll-title">{step.title}</h5>
        <p className="ll-body">{step.body}</p>
      </div>

      <div className="ll-actions">
        <button type="button" className="reveal soft" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0}>
          ← 이전
        </button>
        <button
          type="button"
          className="reveal"
          onClick={() => setI((x) => Math.min(STEPS.length - 1, x + 1))}
          disabled={i === STEPS.length - 1}
        >
          다음 →
        </button>
      </div>

      <p className="viz-note">
        PHONE DOWN · SOUND ON · STAY PRESENT. Prototype in progress — 완성품처럼 말하지 말 것.
      </p>
    </div>
  );
}
