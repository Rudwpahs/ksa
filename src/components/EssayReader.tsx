import type { Hotspot, Question } from '../types';
import { hotspotsBySentence } from '../data';

interface Props {
  question: Question;
  selectedId: string | null;
  matchedIds: Set<string> | null; // 검색/필터 결과. null이면 필터 없음
  onSelect: (h: Hotspot) => void;
}

/**
 * 자기소개서 원문 리더.
 *
 * 원문 문장을 그대로 렌더링하고, hotspot.exactText 위치만 클릭 가능한 <mark>로 바꾼다.
 * 원문 문자열은 어떤 경우에도 변형하지 않는다.
 */
export function EssayReader({ question, selectedId, matchedIds, onSelect }: Props) {
  return (
    <article className="reader">
      <header className="reader-head">
        <div className="reader-qline">
          <span className="reader-qlabel">[{question.label}]</span>
          {question.limit && <span className="reader-qlimit">{question.limit}</span>}
        </div>
        <h2 className="reader-prompt">{question.prompt}</h2>
      </header>

      <div className="reader-body">
        {question.sentences.map((s, i) => (
          <p className="sentence" key={s.id}>
            <span className="sentence-no" aria-hidden="true">
              {i + 1}
            </span>
            <span className="sentence-text">
              {renderSentence(s.text, s.id, selectedId, matchedIds, onSelect)}
            </span>
          </p>
        ))}
      </div>
    </article>
  );
}

function renderSentence(
  text: string,
  sentenceId: string,
  selectedId: string | null,
  matchedIds: Set<string> | null,
  onSelect: (h: Hotspot) => void,
) {
  const spots = hotspotsBySentence.get(sentenceId) ?? [];
  if (spots.length === 0) return text;

  // 원문에서 각 hotspot의 위치를 찾아 겹치지 않게 정렬한다.
  const ranges = spots
    .map((h) => ({ h, start: text.indexOf(h.exactText) }))
    .filter((r) => r.start >= 0)
    .sort((a, b) => a.start - b.start);

  const out: Array<string | React.ReactElement> = [];
  let cursor = 0;

  for (const { h, start } of ranges) {
    if (start < cursor) continue; // 겹치면 뒤쪽은 건너뛴다
    if (start > cursor) out.push(text.slice(cursor, start));

    const dimmed = matchedIds !== null && !matchedIds.has(h.id);
    out.push(
      <mark
        key={h.id}
        className={[
          'hotspot',
          `prio-${h.priority}`,
          h.tags.includes('RISK') ? 'has-risk' : '',
          selectedId === h.id ? 'is-selected' : '',
          dimmed ? 'is-dimmed' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="button"
        tabIndex={0}
        title={h.tooltip}
        aria-pressed={selectedId === h.id}
        onClick={() => onSelect(h)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(h);
          }
        }}
      >
        {h.exactText}
      </mark>,
    );
    cursor = start + h.exactText.length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}
