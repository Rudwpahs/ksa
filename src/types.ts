/**
 * KSA Interview Evidence Map — 데이터 모델
 *
 * 원칙
 * - 자기소개서 문장은 PDF 원문 그대로. 어떤 이유로도 다듬지 않는다.
 * - 모든 evidence는 visibility(PANEL/PREP)와 certainty(MEASURED/INFERRED/UNKNOWN)를 가진다.
 * - 예상 질문의 출발점은 PANEL 자료(자소서·생기부)여야 한다.
 */

export type SourceKind =
  | 'ESSAY'
  | 'SCHOOL_RECORD'
  | 'GITHUB'
  | 'REPORT'
  | 'VIDEO'
  | 'THEORY'
  | 'USER_NOTE';

/** PANEL: 면접관이 전형 당일 볼 수 있는 자료 / PREP: 본인 검증·복습용 */
export type Visibility = 'PANEL' | 'PREP';

/** MEASURED: 문서·코드·측정값에 직접 존재 / INFERRED: 합리적 추론 / UNKNOWN: 확인 불가 */
export type Certainty = 'MEASURED' | 'INFERRED' | 'UNKNOWN';

export type RiskLevel = 'NONE' | 'WATCH' | 'HIGH';

export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6';

/** 하이라이트 우선순위. 확률 숫자가 아니라 정성적 등급이다. */
export type Priority = 'S' | 'A' | 'B';

export type Tag =
  | 'MATH'
  | 'SCIENCE'
  | 'CODE'
  | 'SCHOOL_RECORD'
  | 'THEORY'
  | 'CAREER'
  | 'COLLAB'
  | 'RISK';

export interface Sentence {
  id: string;
  text: string;
}

export interface Question {
  id: QuestionId;
  /** 원서의 문항 번호 표기 */
  label: string;
  /** 문항 전문 (PDF 원문) */
  prompt: string;
  /** 글자수 제한 안내 (PDF 원문) */
  limit: string;
  sentences: Sentence[];
  /** 면접 대비 우선순위 — qualitative heat */
  heat: Priority;
}

export interface Hotspot {
  id: string;
  questionId: QuestionId;
  sentenceId: string;
  /** 반드시 sentence.text 안에 그대로 존재해야 한다. 빌드 시 검증한다. */
  exactText: string;
  /** hover 시 한 줄 툴팁 */
  tooltip: string;
  tags: Tag[];
  priority: Priority;
  detailId: string;
}

export interface Evidence {
  id: string;
  title: string;
  sourceKind: SourceKind;
  visibility: Visibility;
  certainty: Certainty;
  /** 어느 문서/파일/페이지에서 왔는지 */
  sourceRef: string;
  /** 원문 인용 (교사가 실제로 기록한 것, 코드 원문 등) */
  excerpt?: string;
  /** 위 인용에 대한 해석. 인용과 절대 섞지 않는다. */
  interpretation?: string;
  /** 외부 링크 (GitHub 등) */
  url?: string;
}

export interface Risk {
  level: RiskLevel;
  text: string;
  /** 면접에서 실제로 이렇게 말하라 */
  saferPhrasing?: string;
}

export interface ExpectedQuestion {
  id: string;
  text: string;
  /** 이 질문이 왜 나오는가 — 반드시 PANEL 근거에서 출발 */
  trigger: string;
  followups?: string[];
}

export interface Detail {
  id: string;
  hotspotId: string;
  whyItMatters: string;
  evidenceIds: string[];
  /** 이 표현에 붙일 시각화. src/visuals/index.tsx의 VisualId */
  visuals?: string[];
  theory?: string[];
  /** 본인 기여 / 협업자 기여를 절대 합치지 않는다 */
  myRole?: string[];
  risks?: Risk[];
  questions: ExpectedQuestion[];
  answerCore20s?: string[];
  answerFrame60s?: string[];
  relatedHotspots?: string[];
}
