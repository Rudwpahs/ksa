import { useState } from 'react';

/**
 * 세 랜드마크로 관절각을 구하고 20도 임계값으로 판정하는 과정.
 * RealTimeYoga main.py의 calculateAngle / process_angle을 그대로 재현한다.
 *
 * 슬라이더로 팔을 움직이면 판정과 색이 실시간으로 바뀐다.
 */

const REF = 150; // 기준 각도
const THRESHOLD = 20; // main.py: success = diff < 20

const SHOULDER = { x: 90, y: 70 };
const ELBOW = { x: 150, y: 140 };
const LEN = 78;

export function JointAngle() {
  const [deg, setDeg] = useState(150);

  // 팔꿈치를 꼭짓점으로, 어깨 방향에서 deg만큼 벌어진 곳에 손목을 둔다
  const baseAngle = Math.atan2(SHOULDER.y - ELBOW.y, SHOULDER.x - ELBOW.x);
  const wristAngle = baseAngle - (deg * Math.PI) / 180;
  const wrist = {
    x: ELBOW.x + LEN * Math.cos(wristAngle),
    y: ELBOW.y + LEN * Math.sin(wristAngle),
  };

  let diff = Math.abs(deg - REF);
  if (diff > 180) diff = 360 - diff;
  const ok = diff < THRESHOLD;

  // 각도 호
  const arcR = 34;
  const a1 = baseAngle;
  const a2 = wristAngle;
  const large = Math.abs(deg) > 180 ? 1 : 0;
  const arc = `M${ELBOW.x + arcR * Math.cos(a1)} ${ELBOW.y + arcR * Math.sin(a1)} A${arcR} ${arcR} 0 ${large} 0 ${ELBOW.x + arcR * Math.cos(a2)} ${ELBOW.y + arcR * Math.sin(a2)}`;

  return (
    <figure className="viz">
      <svg viewBox="0 0 300 240" className="viz-svg" role="img" aria-label="관절각 계산">
        {/* 기준 자세 (반투명) */}
        {(() => {
          const ra = baseAngle - (REF * Math.PI) / 180;
          return (
            <line
              className="ja-ref"
              x1={ELBOW.x}
              y1={ELBOW.y}
              x2={ELBOW.x + LEN * Math.cos(ra)}
              y2={ELBOW.y + LEN * Math.sin(ra)}
            />
          );
        })()}

        {/* 뼈대 */}
        <line className="ja-bone" x1={SHOULDER.x} y1={SHOULDER.y} x2={ELBOW.x} y2={ELBOW.y} />
        <line className="ja-bone" x1={ELBOW.x} y1={ELBOW.y} x2={wrist.x} y2={wrist.y} />

        {/* 각도 호 */}
        <path className={`ja-arc ${ok ? 'ok' : 'no'}`} d={arc} fill="none" />
        <text className={`ja-deg ${ok ? 'ok' : 'no'}`} x={ELBOW.x + 46} y={ELBOW.y - 22}>
          {deg}°
        </text>

        {/* 랜드마크 */}
        <circle className="ja-lm" cx={SHOULDER.x} cy={SHOULDER.y} r={6} />
        <text className="ja-lmlabel" x={SHOULDER.x - 10} y={SHOULDER.y - 10} textAnchor="end">
          어깨
        </text>
        <circle className={`ja-lm vertex ${ok ? 'ok' : 'no'}`} cx={ELBOW.x} cy={ELBOW.y} r={11} />
        <text className="ja-lmlabel" x={ELBOW.x - 16} y={ELBOW.y + 20} textAnchor="end">
          팔꿈치
        </text>
        <circle className="ja-lm" cx={wrist.x} cy={wrist.y} r={6} />
        <text className="ja-lmlabel" x={wrist.x + 10} y={wrist.y + 4}>
          손목
        </text>

        <text className={`ja-verdict ${ok ? 'ok' : 'no'}`} x={150} y={218} textAnchor="middle">
          {ok ? '성공 — 원이 파란색' : '실패 — 원이 빨간색'}
        </text>
      </svg>

      <div className="viz-slider">
        <label htmlFor="ja-range">팔을 움직여 보세요</label>
        <input
          id="ja-range"
          type="range"
          min={60}
          max={240}
          value={deg}
          onChange={(e) => setDeg(Number(e.target.value))}
        />
      </div>

      <div className="ja-calc">
        <div className="ja-row">
          <span>기준 각도</span>
          <b>{REF}°</b>
        </div>
        <div className="ja-row">
          <span>측정 각도</span>
          <b>{deg}°</b>
        </div>
        <div className="ja-row">
          <span>차이 (0~180으로 접음)</span>
          <b className={ok ? 'ok' : 'no'}>{diff}°</b>
        </div>
        <div className="ja-row">
          <span>판정 (차이 &lt; 20°)</span>
          <b className={ok ? 'ok' : 'no'}>{ok ? 'True' : 'False'}</b>
        </div>
      </div>

      <figcaption className="viz-cap">
        가운데 점(팔꿈치)을 꼭짓점으로 두고, 거기서 나가는 두 방향의 각을{' '}
        <code>atan2</code>로 각각 구해 뺍니다. 음수면 360을 더합니다.
      </figcaption>

      <pre className="viz-code">{`angle1 = math.atan2(y3 - y2, x3 - x2)
angle2 = math.atan2(y1 - y2, x1 - x2)
angle  = math.degrees(angle1 - angle2)
if angle < 0: angle += 360`}</pre>

      <p className="viz-note">
        <strong>MediaPipe가 한 일</strong>은 영상에서 어깨·팔꿈치·손목의 좌표를 찾아 주는
        것까지입니다. 위 계산과 20° 임계값, 색 규칙은 직접 만든 부분입니다.
      </p>
    </figure>
  );
}
