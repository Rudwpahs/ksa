import { useMemo, useState } from 'react';
import {
  details,
  evidenceById,
  hotspotById,
  hotspots,
  hotspotsByQuestion,
  questions,
} from '../data';
import type { QuestionId } from '../types';

interface Props {
  onGoto: (hotspotId: string) => void;
  onOpenQuestion: (qid: QuestionId) => void;
  onOpenBank: (opts?: { drill?: boolean; onlyS?: boolean }) => void;
  onOpenFlags: () => void;
}

/** 면접 직전 — 할 일만 남긴 시작 화면 */
const MUST = [
  {
    id: 'h1-fano',
    tag: 'Q1',
    title: '파노 ≠ 도블',
    line: '파노는 7점짜리 최소 모델. 상용 도블과 같다고 말하지 않는다.',
    openVisual: true,
  },
  {
    id: 'h3-mu',
    tag: 'Q3',
    title: 'Δx ≠ 마찰계수',
    line: 'Δx는 cm 거리(미끄러짐). 마찰계수는 무차원. 같다고 쓰지 말 것.',
    openVisual: true,
  },
  {
    id: 'h4-seat',
    tag: 'Q4',
    title: '자리배치 = 협업',
    line: '먼저 밝힌다: 형이 개념·프론트, 나는 이분 매칭 구현.',
    openVisual: true,
  },
  {
    id: 'h6-ksa',
    tag: 'Q6',
    title: '왜 KSA',
    line: '학교 홍보 말고, Q1에서 혼자 막힌 지점부터 말한다.',
    openVisual: false,
  },
] as const;

function openSpot(id: string, openVisual: boolean, onGoto: (id: string) => void) {
  if (openVisual) sessionStorage.setItem('ksa.openVisual', '1');
  onGoto(id);
}

export function Overview({
  onGoto,
  onOpenQuestion,
  onOpenBank,
  onOpenFlags,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  const sSpots = useMemo(
    () => hotspots.filter((h) => h.priority === 'S'),
    [],
  );

  const highRiskCount = useMemo(
    () =>
      details.reduce(
        (n, d) => n + (d.risks?.filter((r) => r.level === 'HIGH').length ?? 0),
        0,
      ),
    [],
  );

  const rows = questions.map((q) => {
    const spots = hotspotsByQuestion(q.id);
    const ds = spots
      .map((h) => details.find((d) => d.hotspotId === h.id))
      .filter((d): d is NonNullable<typeof d> => Boolean(d));
    const high = ds.flatMap((d) => d.risks ?? []).filter((r) => r.level === 'HIGH').length;
    const sCount = spots.filter((h) => h.priority === 'S').length;
    const panel = new Set(
      ds.flatMap((d) =>
        d.evidenceIds.filter((id) => evidenceById.get(id)?.visibility === 'PANEL'),
      ),
    ).size;
    return { q, spots, high, sCount, panel };
  });

  return (
    <div className="ov home">
      <header className="home-hero">
        <p className="home-kicker">면접 직전용</p>
        <h2 className="home-title">지금 할 일만 보세요</h2>
        <p className="home-sub">
          자료는 이미 다 들어 있습니다. 시험 전에는 아래 <b>3단계</b>만 돌리면 됩니다.
        </p>
      </header>

      <ol className="home-steps">
        <li>
          <button type="button" className="home-step" onClick={onOpenFlags}>
            <span className="home-step-n">1</span>
            <span className="home-step-body">
              <strong>고칠 말 확인</strong>
              <em>위험 표현 {highRiskCount}건 — 이렇게 말한다만 읽기</em>
            </span>
            <span className="home-step-go">열기 →</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="home-step primary"
            onClick={() => onOpenBank({ drill: true, onlyS: true })}
          >
            <span className="home-step-n">2</span>
            <span className="home-step-body">
              <strong>S급 압박 연습</strong>
              <em>중요한 질문만 · 꼬리질문까지 버팀</em>
            </span>
            <span className="home-step-go">시작 →</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="home-step"
            onClick={() => onGoto('h4-seat')}
          >
            <span className="home-step-n">3</span>
            <span className="home-step-body">
              <strong>필수 4지점 복습</strong>
              <em>아래 카드 한 줄씩만 외우기</em>
            </span>
            <span className="home-step-go">아래로 ↓</span>
          </button>
        </li>
      </ol>

      <section className="home-must" aria-label="필수 한 줄">
        <h3>필수 한 줄 · 4개</h3>
        <p className="home-must-note">헷갈리면 이 문장만 말하세요. 누르면 원문·그림이 열립니다.</p>
        <ul className="home-must-list">
          {MUST.map((m) => {
            const h = hotspotById.get(m.id);
            return (
              <li key={m.id}>
                <button type="button" className="home-must-card" onClick={() => openSpot(m.id, m.openVisual, onGoto)}>
                  <span className="home-must-tag">{m.tag}</span>
                  <span className="home-must-title">{m.title}</span>
                  <span className="home-must-line">{m.line}</span>
                  {h && <span className="home-must-from">「{trim(h.exactText, 22)}」</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="home-viz" aria-label="그림으로 복습">
        <h3>그림으로 복습</h3>
        <p className="home-must-note">말로 안 되면 그림을 누르세요. 시각화는 그대로 두었습니다.</p>
        <div className="home-viz-grid">
          {(
            [
              ['h1-fano', '파노 평면'],
              ['h1-dobble', '도블 번역'],
              ['h3-mu', 'Δx 정의'],
              ['h3-vshape', 'V자 차트'],
              ['h4-seat', '이분 매칭'],
              ['h6-revolution', 'LUNDA 루프'],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" className="home-viz-chip" onClick={() => openSpot(id, true, onGoto)}>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="home-cheat" aria-label="S급 표현">
        <h3>S급 표현 {sSpots.length}개</h3>
        <p className="home-must-note">거의 확실히 물어봅니다. 툴팁 = 그때 떠올릴 한 줄.</p>
        <div className="home-cheat-grid">
          {sSpots.map((h) => (
            <button
              key={h.id}
              type="button"
              className={`home-cheat-item ${h.tags.includes('RISK') ? 'risk' : ''}`}
              onClick={() => onGoto(h.id)}
            >
              <span className="home-cheat-q">{h.questionId.toUpperCase()}</span>
              <span className="home-cheat-text">{trim(h.exactText, 18)}</span>
              <span className="home-cheat-tip">{h.tooltip}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="home-more">
        <button
          type="button"
          className="home-more-toggle"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
        >
          {showAll ? '문항별 지도 접기 △' : '문항별 지도 펼치기 ▽'}
        </button>
      </div>

      {showAll && (
        <div className="ov-grid home-grid">
          {rows.map(({ q, spots, high, sCount, panel }) => (
            <article className={`ov-card heat-${q.heat}`} key={q.id}>
              <button className="ov-title" onClick={() => onOpenQuestion(q.id)}>
                <span className="ov-qid">{q.id.toUpperCase()}</span>
                <span className={`ov-heat h-${q.heat}`}>
                  {q.heat === 'S' ? '최우선' : q.heat === 'A' ? '중요' : '보조'}
                </span>
              </button>
              <p className="ov-prompt">{q.prompt}</p>
              <div className="ov-riskline">
                <b>S {sCount}</b>
                {high > 0 && <b className="r-high">위험 {high}</b>}
                <span className={panel === 0 ? 'ov-ev-panel zero' : ''}>PANEL {panel}</span>
              </div>
              <div className="ov-spots">
                {spots
                  .filter((h) => h.priority === 'S')
                  .map((h) => (
                    <button
                      key={h.id}
                      className={`ov-spot p-S ${h.tags.includes('RISK') ? 'risky' : ''}`}
                      onClick={() => onGoto(h.id)}
                      title={h.tooltip}
                    >
                      {trim(h.exactText, 16)}
                    </button>
                  ))}
              </div>
              <button className="linkish ov-open-all" onClick={() => onOpenQuestion(q.id)}>
                이 문항 자소서 열기 →
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function trim(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}
