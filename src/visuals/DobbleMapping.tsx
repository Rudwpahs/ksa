/**
 * 도블 ↔ 사영평면 대응표.
 * "카드=직선, 그림=점"이라는 번역을 눈으로 보여 준다.
 */
export function DobbleMapping() {
  const rows: Array<[string, string, string]> = [
    ['카드 한 장', '직선 하나', '카드마다 그림이 여러 개 = 직선 위에 점이 여러 개'],
    ['카드 위의 그림', '직선 위의 점', ''],
    ['두 카드의 공통 그림이 정확히 하나', '두 직선은 정확히 한 점에서 만난다', '평행선이 없다는 뜻'],
    ['같은 그림을 가진 카드들', '한 점을 지나는 직선들', ''],
  ];

  return (
    <figure className="viz">
      <div className="map-table">
        <div className="map-head">
          <span>도블 (게임)</span>
          <span aria-hidden="true">→</span>
          <span>사영평면 (수학)</span>
        </div>
        {rows.map(([l, r, note], i) => (
          <div className="map-row" key={i}>
            <div className="map-cell left">{l}</div>
            <div className="map-arrow" aria-hidden="true">
              →
            </div>
            <div className="map-cell right">
              {r}
              {note && <em className="map-note">{note}</em>}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="viz-cap">
        면접에서 이 표의 3번째 줄만 정확히 말해도 충분합니다. “두 카드에 공통 그림이{' '}
        <strong>정확히 하나</strong>”가 핵심이고, “적어도 하나”라고 말하면 안 됩니다.
      </figcaption>
    </figure>
  );
}
