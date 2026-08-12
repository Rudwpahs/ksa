import type { Certainty, Priority, RiskLevel, SourceKind, Visibility } from '../types';

/** 색만으로 의미를 전달하지 않는다. 모든 배지는 라벨과 기호를 함께 가진다. */

const SOURCE_LABEL: Record<SourceKind, { label: string; mark: string; cls: string }> = {
  ESSAY: { label: '자기소개서', mark: '✎', cls: 'src-essay' },
  SCHOOL_RECORD: { label: '생활기록부', mark: '▤', cls: 'src-record' },
  GITHUB: { label: '코드', mark: '</>', cls: 'src-code' },
  REPORT: { label: '탐구보고서', mark: '⌗', cls: 'src-report' },
  VIDEO: { label: '원본 영상', mark: '▶', cls: 'src-video' },
  THEORY: { label: '이론', mark: '∴', cls: 'src-theory' },
  USER_NOTE: { label: '본인 설명', mark: '☏', cls: 'src-note' },
};

export function SourceBadge({ kind }: { kind: SourceKind }) {
  const s = SOURCE_LABEL[kind];
  return (
    <span className={`badge ${s.cls}`}>
      <span aria-hidden="true">{s.mark}</span> {s.label}
    </span>
  );
}

export function VisibilityBadge({ v }: { v: Visibility }) {
  return (
    <span className={`badge ${v === 'PANEL' ? 'vis-panel' : 'vis-prep'}`}>
      {v === 'PANEL' ? '● PANEL · 면접관이 볼 수 있음' : '○ PREP · 내부 준비용'}
    </span>
  );
}

const CERTAINTY: Record<Certainty, { label: string; cls: string }> = {
  MEASURED: { label: 'MEASURED · 자료에 직접 존재', cls: 'cert-measured' },
  INFERRED: { label: 'INFERRED · 해석', cls: 'cert-inferred' },
  UNKNOWN: { label: 'UNKNOWN · 확인 불가', cls: 'cert-unknown' },
};

export function CertaintyBadge({ c }: { c: Certainty }) {
  const s = CERTAINTY[c];
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  if (level === 'NONE') return null;
  return (
    <span className={`badge ${level === 'HIGH' ? 'risk-high' : 'risk-watch'}`}>
      {level === 'HIGH' ? '▲ 위험' : '△ 주의'}
    </span>
  );
}

export function PriorityBadge({ p }: { p: Priority }) {
  const label = p === 'S' ? '최우선' : p === 'A' ? '중요' : '보조';
  return <span className={`badge prio-${p}`}>{p} · {label}</span>;
}
