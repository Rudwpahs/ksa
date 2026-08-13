import type { ReactElement } from 'react';
import {
  detailForHotspot,
  evidenceById,
  hotspots,
  hotspotsBySentence,
  questions,
} from '../data';
import type { Hotspot } from '../types';
import { Visual, type VisualId } from '../visuals';
import '../print.css';

export function PrintBook() {
  const redFlags = hotspots.flatMap((hotspot) => {
    const detail = detailForHotspot(hotspot.id);
    return (detail?.risks ?? [])
      .filter((risk) => risk.level !== 'NONE')
      .map((risk) => ({ hotspot, risk }));
  });

  return (
    <div id="pdf-book" className="pdf-book" aria-hidden="true">
      <section className="pdf-chapter pdf-cover">
        <div className="pdf-cover-kicker">KSA 3차 면접</div>
        <h1>FINAL BOOK</h1>
        <p className="pdf-cover-sub">자소서 원문 · 근거 · 위험표현 · 예상질문 · 답변구조</p>
        <div className="pdf-cover-rule" />
        <p className="pdf-cover-note">
          문장을 외우기보다, 내가 실제로 한 일과 생각의 흐름을 근거와 함께 설명하는 데 사용합니다.
        </p>
      </section>

      {questions.map((question) => {
        const orderedHotspots = question.sentences.flatMap(
          (sentence) => hotspotsBySentence.get(sentence.id) ?? [],
        );
        const numberById = new Map(orderedHotspots.map((hotspot, index) => [hotspot.id, index + 1]));

        return (
          <div key={question.id}>
            <section className="pdf-chapter pdf-essay-chapter">
              <header className="pdf-qhead">
                <span className={`pdf-priority priority-${question.heat}`}>{question.heat}</span>
                <div>
                  <p>{question.label}</p>
                  <h2>{question.id.toUpperCase()} · 자소서 원문</h2>
                </div>
              </header>
              <p className="pdf-prompt">{question.prompt}</p>
              {question.limit && <p className="pdf-limit">{question.limit}</p>}

              <div className="pdf-essay">
                {question.sentences.map((sentence) => (
                  <p key={sentence.id}>
                    {renderAnnotatedSentence(sentence.text, sentence.id, numberById)}
                  </p>
                ))}
              </div>

              {orderedHotspots.length > 0 && (
                <div className="pdf-index">
                  <h3>이 문항에서 반드시 설명할 표현</h3>
                  {orderedHotspots.map((hotspot) => (
                    <div className="pdf-index-row" key={hotspot.id}>
                      <span>{numberById.get(hotspot.id)}</span>
                      <b>{hotspot.exactText}</b>
                      <em>{hotspot.priority}</em>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {orderedHotspots.map((hotspot) => (
              <HotspotChapter
                key={hotspot.id}
                hotspot={hotspot}
                number={numberById.get(hotspot.id) ?? 0}
              />
            ))}
          </div>
        );
      })}

      <section className="pdf-chapter pdf-redflags">
        <header className="pdf-section-title">
          <p>LAST CHECK</p>
          <h2>RED FLAG · 면접에서 고쳐 말할 표현</h2>
        </header>
        {redFlags.length === 0 ? (
          <p className="pdf-muted">등록된 위험 표현이 없습니다.</p>
        ) : (
          <div className="pdf-redflag-list">
            {redFlags.map(({ hotspot, risk }, index) => (
              <article className="pdf-redflag" key={`${hotspot.id}-${index}`}>
                <div className="pdf-redflag-head">
                  <span>{risk.level}</span>
                  <b>{hotspot.exactText}</b>
                </div>
                <p className="pdf-bad">주의 · {risk.text}</p>
                {risk.saferPhrasing && <p className="pdf-good">이렇게 말하기 · {risk.saferPhrasing}</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function HotspotChapter({ hotspot, number }: { hotspot: Hotspot; number: number }) {
  const detail = detailForHotspot(hotspot.id);
  if (!detail) return null;

  const evidences = detail.evidenceIds
    .map((id) => evidenceById.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const risks = detail.risks ?? [];
  const visuals = (detail.visuals ?? []) as VisualId[];

  return (
    <section className="pdf-chapter pdf-detail-chapter">
      <header className="pdf-detail-head">
        <div className="pdf-detail-number">{number}</div>
        <div className="pdf-detail-title">
          <div className="pdf-badges">
            <span className={`pdf-priority priority-${hotspot.priority}`}>{hotspot.priority}</span>
            {hotspot.tags.map((tag) => (
              <span className="pdf-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <h2>{hotspot.exactText}</h2>
          <p>{hotspot.tooltip}</p>
        </div>
      </header>

      <PdfBlock title="왜 중요한가">
        <p>{detail.whyItMatters}</p>
      </PdfBlock>

      {evidences.length > 0 && (
        <PdfBlock title="근거">
          <div className="pdf-evidence-list">
            {evidences.map((evidence) => (
              <article className="pdf-evidence" key={evidence.id}>
                <div className="pdf-mini-badges">
                  <span>{evidence.sourceKind}</span>
                  <span>{evidence.visibility}</span>
                  <span>{evidence.certainty}</span>
                </div>
                <h4>{evidence.title}</h4>
                <p className="pdf-source">{evidence.sourceRef}</p>
                {evidence.excerpt && <pre>{evidence.excerpt}</pre>}
                {evidence.interpretation && <p><b>해석 · </b>{evidence.interpretation}</p>}
              </article>
            ))}
          </div>
        </PdfBlock>
      )}

      {detail.myRole && detail.myRole.length > 0 && (
        <PdfBlock title="내 역할 / 협업 범위">
          <ul>{detail.myRole.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </PdfBlock>
      )}

      {visuals.length > 0 && (
        <PdfBlock title="그림으로 확인">
          <div className="pdf-visuals">
            {visuals.map((visual) => <Visual key={visual} id={visual} />)}
          </div>
        </PdfBlock>
      )}

      {detail.theory && detail.theory.length > 0 && (
        <PdfBlock title="알아 둘 이론">
          <ul>{detail.theory.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </PdfBlock>
      )}

      {risks.length > 0 && (
        <PdfBlock title="위험 표현">
          {risks.map((risk, index) => (
            <div className={`pdf-risk risk-${risk.level.toLowerCase()}`} key={index}>
              <b>{risk.level}</b>
              <p>{risk.text}</p>
              {risk.saferPhrasing && <p className="pdf-safe"><b>이렇게 말하기 · </b>{risk.saferPhrasing}</p>}
            </div>
          ))}
        </PdfBlock>
      )}

      {detail.questions.length > 0 && (
        <PdfBlock title="예상 질문 / 꼬리질문">
          <div className="pdf-question-list">
            {detail.questions.map((question, index) => (
              <article className="pdf-question-card" key={question.id}>
                <h4>Q{index + 1}. {question.text}</h4>
                <p className="pdf-trigger"><b>질문 근거 · </b>{question.trigger}</p>
                {question.followups && question.followups.length > 0 && (
                  <ul className="pdf-followups">
                    {question.followups.map((followup, followupIndex) => (
                      <li key={followupIndex}>{followup}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </PdfBlock>
      )}

      {detail.answerCore20s && detail.answerCore20s.length > 0 && (
        <PdfBlock title="20초 핵심">
          <ul className="pdf-answer-core">
            {detail.answerCore20s.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </PdfBlock>
      )}

      {detail.answerFrame60s && detail.answerFrame60s.length > 0 && (
        <PdfBlock title="60초 답변 흐름">
          <ol className="pdf-answer-frame">
            {detail.answerFrame60s.map((item, index) => <li key={index}>{item}</li>)}
          </ol>
        </PdfBlock>
      )}
    </section>
  );
}

function PdfBlock({ title, children }: { title: string; children: ReactElement | ReactElement[] | string }) {
  return (
    <section className="pdf-block">
      <h3>{title}</h3>
      <div className="pdf-block-body">{children}</div>
    </section>
  );
}

function renderAnnotatedSentence(
  text: string,
  sentenceId: string,
  numberById: Map<string, number>,
) {
  const spots = hotspotsBySentence.get(sentenceId) ?? [];
  if (spots.length === 0) return text;

  const ranges = spots
    .map((hotspot) => ({ hotspot, start: text.indexOf(hotspot.exactText) }))
    .filter((item) => item.start >= 0)
    .sort((a, b) => a.start - b.start);

  const output: Array<string | ReactElement> = [];
  let cursor = 0;

  for (const { hotspot, start } of ranges) {
    if (start < cursor) continue;
    if (start > cursor) output.push(text.slice(cursor, start));
    output.push(
      <mark className={`pdf-mark priority-${hotspot.priority}`} key={hotspot.id}>
        {hotspot.exactText}<sup>{numberById.get(hotspot.id)}</sup>
      </mark>,
    );
    cursor = start + hotspot.exactText.length;
  }

  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}
