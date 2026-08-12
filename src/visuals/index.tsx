import type { ReactElement } from 'react';
import { FanoPlane } from './FanoPlane';
import { DobbleMapping } from './DobbleMapping';
import { ButterflyTheorem } from './ButterflyTheorem';
import { BipartiteMatching } from './BipartiteMatching';
import { SeatOptimality } from './SeatOptimality';
import { MoistureChart } from './MoistureChart';
import { ExperimentSetup } from './ExperimentSetup';
import { JointAngle } from './JointAngle';
import { CommitTimeline } from './CommitTimeline';
import { CareerTimeline } from './CareerTimeline';
import { VideoAudit } from './VideoAudit';
import { LundaLoop } from './LundaLoop';

export type VisualId =
  | 'fano'
  | 'dobble'
  | 'butterfly'
  | 'matching'
  | 'seat-optimality'
  | 'moisture-chart'
  | 'experiment-setup'
  | 'joint-angle'
  | 'commit-timeline'
  | 'career-timeline'
  | 'video-audit'
  | 'lunda-loop';

interface VisualDef {
  title: string;
  render: () => ReactElement;
}

const VISUALS: Record<VisualId, VisualDef> = {
  fano: { title: '파노 평면 — 직접 눌러 보기', render: () => <FanoPlane /> },
  dobble: { title: '도블 → 사영평면 번역표', render: () => <DobbleMapping /> },
  butterfly: { title: '나비 정리', render: () => <ButterflyTheorem /> },
  matching: { title: '이분 매칭 — 증가 경로 따라가기', render: () => <BipartiteMatching /> },
  'seat-optimality': { title: "'최적'은 정확히 무엇인가", render: () => <SeatOptimality /> },
  'moisture-chart': { title: '측정 결과 — V자인가?', render: () => <MoistureChart /> },
  'experiment-setup': { title: '실험 장치와 Δx의 정의', render: () => <ExperimentSetup /> },
  'joint-angle': { title: '관절각 계산과 20° 판정', render: () => <JointAngle /> },
  'commit-timeline': { title: '두 프로젝트의 시점', render: () => <CommitTimeline /> },
  'career-timeline': { title: '진로 희망은 어떻게 이어졌나', render: () => <CareerTimeline /> },
  'video-audit': { title: '원본 영상 재분석 — 다시 잴 수 있나', render: () => <VideoAudit /> },
  'lunda-loop': { title: 'LUNDA — BUILD · TEST · LEARN', render: () => <LundaLoop /> },
};

export function Visual({ id }: { id: VisualId }) {
  const v = VISUALS[id];
  if (!v) return null;
  return (
    <section className="viz-block">
      <h4 className="viz-title">{v.title}</h4>
      {v.render()}
    </section>
  );
}
