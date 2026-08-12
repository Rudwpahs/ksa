import type { Detail, Hotspot, QuestionId, Sentence } from '../types';
import { questions } from './essay';
import { hotspots, hotspotById } from './hotspots';
import { evidence, evidenceById } from './evidence';
import { detailsQ1Q3 } from './details.q1q3';
import { detailsQ4Q6 } from './details.q4q6';

export const details: Detail[] = [...detailsQ1Q3, ...detailsQ4Q6];
export const detailById = new Map(details.map((d) => [d.id, d]));

export { questions, hotspots, hotspotById, evidence, evidenceById };

export const questionById = new Map(questions.map((q) => [q.id, q]));

export const sentenceById = new Map<string, Sentence>(
  questions.flatMap((q) => q.sentences.map((s) => [s.id, s] as const)),
);

export const hotspotsByQuestion = (qid: QuestionId): Hotspot[] =>
  hotspots.filter((h) => h.questionId === qid);

export const hotspotsBySentence = new Map<string, Hotspot[]>();
for (const h of hotspots) {
  const list = hotspotsBySentence.get(h.sentenceId) ?? [];
  list.push(h);
  hotspotsBySentence.set(h.sentenceId, list);
}

/** 문항 순서대로 평탄화한 핫스팟 목록 — 이전/다음 이동에 쓴다. */
export const hotspotsInReadingOrder: Hotspot[] = questions.flatMap((q) =>
  q.sentences.flatMap((s) => hotspotsBySentence.get(s.id) ?? []),
);

export const detailForHotspot = (hotspotId: string): Detail | undefined => {
  const h = hotspotById.get(hotspotId);
  return h ? detailById.get(h.detailId) : undefined;
};

/**
 * 데이터 무결성 검증.
 *
 * 가장 중요한 검사: hotspot.exactText가 자소서 원문 문장 안에 그대로 있는가.
 * 이것이 깨지면 원문을 고쳤거나 하이라이트를 잘못 지정한 것이다.
 */
export function validateData(): string[] {
  const problems: string[] = [];

  for (const h of hotspots) {
    const s = sentenceById.get(h.sentenceId);
    if (!s) {
      problems.push(`hotspot ${h.id}: 문장 ${h.sentenceId}을(를) 찾을 수 없음`);
      continue;
    }
    if (!s.text.includes(h.exactText)) {
      problems.push(
        `hotspot ${h.id}: exactText가 원문에 없음 — "${h.exactText}"`,
      );
    }
    if (!detailById.has(h.detailId)) {
      problems.push(`hotspot ${h.id}: detail ${h.detailId} 없음`);
    }
  }

  for (const d of details) {
    if (!hotspotById.has(d.hotspotId)) {
      problems.push(`detail ${d.id}: hotspot ${d.hotspotId} 없음`);
    }
    for (const eid of d.evidenceIds) {
      if (!evidenceById.has(eid)) {
        problems.push(`detail ${d.id}: evidence ${eid} 없음`);
      }
    }
    for (const rid of d.relatedHotspots ?? []) {
      if (!hotspotById.has(rid)) {
        problems.push(`detail ${d.id}: relatedHotspot ${rid} 없음`);
      }
    }
  }

  return problems;
}
