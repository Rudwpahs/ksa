/**
 * 영상 재분석 결과.
 *
 * 11개 영상 전 프레임을 훑어 공이 지나가는 구간을 검출한 결과다.
 * 값은 모두 실제 분석에서 나온 것이며, 영상당 공이 보이는 시간이 얼마나 짧은지가 핵심이다.
 */

const CLIPS = [
  { n: 1, frames: 49, a: 18, b: 28 },
  { n: 2, frames: 74, a: 43, b: 50 },
  { n: 3, frames: 102, a: 68, b: 77 },
  { n: 4, frames: 113, a: 52, b: 60 },
  { n: 5, frames: 102, a: 53, b: 60 },
  { n: 6, frames: 558, a: 519, b: 528 },
  { n: 7, frames: 152, a: 108, b: 116 },
  { n: 8, frames: 92, a: 34, b: 42 },
  { n: 9, frames: 152, a: 85, b: 95 },
  { n: 10, frames: 89, a: 46, b: 56 },
  { n: 11, frames: 298, a: 241, b: 252 },
];

const FPS = 30;

export function VideoAudit() {
  const maxF = Math.max(...CLIPS.map((c) => c.frames));

  return (
    <figure className="viz">
      <div className="va-list">
        {CLIPS.map((c) => {
          const left = (c.a / maxF) * 100;
          const width = Math.max(((c.b - c.a) / maxF) * 100, 0.7);
          return (
            <div className="va-row" key={c.n}>
              <span className="va-n">#{c.n}</span>
              <div className="va-track" title={`${c.frames}프레임`}>
                <span className="va-len" style={{ width: `${(c.frames / maxF) * 100}%` }} />
                <span
                  className="va-ball"
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </div>
              <span className="va-dur">{((c.b - c.a) / FPS).toFixed(2)}s</span>
            </div>
          );
        })}
      </div>

      <div className="viz-legend">
        <span>
          <i className="lg" /> 영상 전체 길이
        </span>
        <span>
          <i className="lg bump" /> 공이 화면에 보이는 구간
        </span>
      </div>

      <figcaption className="viz-cap">
        11개 영상 <strong>모두</strong> 굴리기 시행이 한 번씩 들어 있습니다. 보고서의 총 반복
        수 11회(3+2+3+3)와 개수가 맞습니다. 다만 공이 화면에 보이는 시간은 영상당{' '}
        <strong>0.1~0.35초</strong>뿐입니다.
      </figcaption>

      <div className="va-findings">
        <h5>이 영상으로 Δx를 다시 잴 수 없는 이유</h5>
        <ol>
          <li>
            공이 보이는 프레임이 <b>3~10장</b>뿐이라 1회전 시점을 판정할 수 없습니다.
          </li>
          <li>
            그 사이 공의 화면상 지름이 <b>129px → 305px</b>로 2.4배 커집니다. 공이 카메라
            쪽으로 다가오며 지나가 원근 왜곡이 큽니다.
          </li>
          <li>
            공이 <b>멈춘 위치</b>가 찍힌 프레임이 어느 영상에도 없습니다.
          </li>
          <li>
            굴리기 직전·직후를 차분하면 반죽 영역의 변화량(6.0~19.4)이 움직이지 않는 매트
            인쇄 영역(7.7~22.3)과 <b>같은 수준</b>입니다. 반죽에 새로 눌린 자국이 보이지
            않습니다.
          </li>
          <li>카메라가 손에 들려 있어 프레임마다 시점이 움직입니다.</li>
        </ol>
      </div>

      <p className="viz-note danger">
        면접에서 “영상으로 어떻게 판독했나요?”를 받으면, 남은 영상만으로는 그 과정을 다시
        보여주기 어렵다는 점을 알고 답해야 합니다. 다른 각도의 촬영본이 따로 있었는지 먼저
        확인해 보세요.
      </p>
    </figure>
  );
}
