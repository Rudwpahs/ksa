/**
 * "최적"이라는 말이 무엇을 뜻하는지 두 그림으로 갈라 보여 준다.
 * 코드가 실제로 하는 일과, 자소서 표현이 암시하는 일이 다르다는 것이 핵심이다.
 */

const ROWS = [
  { student: 1, wish: [1, 2, 3], got: 1, rank: 1 },
  { student: 2, wish: [1, 4], got: 4, rank: 2 },
  { student: 3, wish: [2, 3], got: 3, rank: 2 },
  { student: 4, wish: [2], got: 2, rank: 1 },
  { student: 5, wish: [1, 3], got: 7, rank: 0 },
];

export function SeatOptimality() {
  const matched = ROWS.filter((r) => r.rank > 0).length;

  return (
    <figure className="viz">
      <div className="opt-grid">
        {ROWS.map((r) => (
          <div className={`opt-row ${r.rank === 0 ? 'unmatched' : ''}`} key={r.student}>
            <span className="opt-student">학생 {r.student}</span>
            <span className="opt-wishes">
              {r.wish.map((w, i) => (
                <span key={w} className={`opt-wish ${r.got === w ? 'hit' : ''}`}>
                  {i + 1}순위 · {w}번
                </span>
              ))}
            </span>
            <span className={`opt-got rank-${r.rank}`}>
              {r.rank === 0 ? `${r.got}번 (무작위 배정)` : `${r.got}번 배정`}
            </span>
          </div>
        ))}
      </div>

      <div className="opt-compare">
        <div className="opt-card real">
          <h5>코드가 실제로 최대화하는 것</h5>
          <p className="opt-big">{matched}명</p>
          <p>
            희망 목록 중 <strong>하나라도</strong> 받은 사람 수. 1순위든 3순위든 똑같이 한 명으로
            셉니다.
          </p>
        </div>
        <div className="opt-card claim">
          <h5>“최대한 선호하는 자리”가 들리게 하는 것</h5>
          <p className="opt-big">순위 가중치</p>
          <p>
            1순위에 더 높은 점수를 주어 <strong>총 만족도</strong>를 최대화하는 구조. 이 코드에는
            없습니다.
          </p>
        </div>
      </div>

      <figcaption className="viz-cap">
        학생 2는 2순위, 학생 3도 2순위를 받았지만 알고리즘 입장에서는 학생 1(1순위)과 똑같은
        “성공 1명”입니다. 학생 5는 희망을 못 받아 <strong>남은 좌석에 무작위로</strong>
        배정됩니다.
      </figcaption>

      <p className="viz-note danger">
        면접에서 “최적”을 물으면 <strong>“희망 좌석 중 하나를 받는 사람 수를 최대로 만드는
        것”</strong>이라고 답하세요. “모두가 최대한 선호하는 자리”는 코드가 하는 일보다 강한
        표현입니다.
      </p>
    </figure>
  );
}
