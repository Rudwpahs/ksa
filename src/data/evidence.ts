import type { Evidence } from '../types';

/**
 * Evidence index — 모든 항목은 실제 소스에서 직접 확인한 것만 넣는다.
 *
 * excerpt = 원문 인용 (교사 기록, 코드, 보고서 문장)
 * interpretation = 해석. 인용과 절대 섞지 않는다.
 *
 * 개인정보 보호: 생기부의 주민등록번호·주소·사진·문서확인번호는 이 앱에 넣지 않는다.
 */
export const evidence: Evidence[] = [
  // ─────────────────────────────── 생기부 (PANEL)
  {
    id: 'sr-club-seat',
    title: '생기부 2학년 동아리활동 — 이분 매칭 자리 배치 프로그램',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 3/14쪽, 5.창의적 체험활동상황 > 2학년 동아리활동 (코딩크래프트, 30시간)',
    excerpt:
      '(코딩크래프트)(30시간) 이분 매칭 알고리즘을 응용하여 자리 배치 문제를 해결하는 프로그램을 개발하여 배포함. 각자가 원하는 좌석을 3개까지 선택할 수 있도록 설정하고, 알고리즘을 활용해 최대한 많은 사람이 만족할 수 있는 최적 배치를 산출함. 단순히 하나의 해에 머무르지 않고, 동일 조건에서 최적 해가 중복으로 발생하는 상황을 분석하며, 사람 순서를 섞어 다양한 경우를 탐색함으로써 알고리즘의 한계를 보완하려는 수학적 사고를 보여줌. 이론 적용에 그치지 않고 알고리즘 구조와 한계를 분석하며 개선 방안을 설계하여 높은 수준의 문제 해결 능력을 발휘함. 텍스트 기반 프로그래밍 언어로 직접 구현하며 수학적 개념을 정보 과학적 문제 해결에 접목하고, 디버깅과 논리 구조 최적화를 통해 체계적이고 비판적인 사고 태도를 기름.',
    interpretation:
      '면접관이 Q4의 자리배치 문장을 파고들 때 근거로 쓸 수 있는 유일한 PANEL 자료다. "사람 순서를 섞어 다양한 경우를 탐색"은 실제 코드의 random.shuffle과 정확히 대응한다. 다만 이 기록에는 협업자(형)가 등장하지 않으므로, 면접관은 단독 작업으로 읽을 수 있다.',
  },
  {
    id: 'sr-career-2',
    title: '생기부 2학년 진로활동 — IT 전문 기업 경영자',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 3/14쪽, 2학년 진로활동 (31시간)',
    excerpt:
      '희망분야: IT 관련 분야, IT 전문 기업 경영자. … 미래에는 기업들이 인공지능을 적극 활용하는 환경에 맞춘 새로운 형태의 경영을 실천하여 혁신적인 IT 기업을 설립하고 싶다는 목표를 설정함. 창업 활동에서는 바이오 기술을 접목한 웨어러블 기기 제작 아이디어를 제시하며 기술 융합적 관점을 드러냄.',
    interpretation:
      'Q6 "라이프테크 사업"의 가장 강한 PANEL 근거다. 특히 "바이오 기술을 접목한 웨어러블 기기"는 자소서의 추상적인 표현을 구체적 제품 아이디어로 내려앉힐 수 있는 연결점이다.',
  },
  {
    id: 'sr-career-1',
    title: '생기부 1학년 진로활동 — IT 및 공학 분야 CEO',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 2/14쪽, 1학년 진로활동 (16시간)',
    excerpt: '희망분야: IT 및 공학 분야 CEO',
    interpretation:
      '1학년(IT 및 공학 분야 CEO) → 2학년(IT 전문 기업 경영자)로 진로 희망이 2년간 일관된다. "갑자기 사업 이야기를 꺼낸 것 아니냐"는 의심을 차단하는 근거다.',
  },
  {
    id: 'sr-club-coding-1',
    title: '생기부 1학년 동아리활동 — 코딩연구실',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 2/14쪽, 1학년 동아리활동 (코딩연구실, 10시간)',
    excerpt:
      '(코딩연구실)(10시간) 매시간 코딩 활동에 높은 성공률을 보임. 난수를 활용해 움직이는 이모티콘을 만들고, 배열을 활용해 임의의 문장을 출력하는 방법에 대해 익힌 후, 이를 응용하여 더 빨리 버튼을 눌러 점수를 얻는 순발력 게임을 훌륭하게 제작함. 가위바위보 게임 만들기에서 두 개 이상의 조건을 비교하여 조건에 맞는 글자를 출력하는 프로그래밍 기초를 기반으로, 무작위로 가위, 바위, 보가 나타나면 이긴 쪽으로 서보 모터가 돌아가게 하는 프로그래밍 응용 활동을 훌륭히 완수해냄.',
    interpretation:
      'Q4 "코딩을 통해 다양한 문제를 해결하는 경험을 해왔습니다"의 지속성 근거. 1학년 기초 → 2학년 이분 매칭으로 이어지는 성장 곡선을 보여준다.',
  },
  {
    id: 'sr-sw-gifted',
    title: '생기부 1학년 기술·가정 — 영재교육원 SW 심화과정 102시간 이수',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 6/14쪽, 1학년 2학기 기술·가정 세부능력 및 특기사항',
    excerpt: '(2학기)기술·가정: 영재교육원에서 중1 심화과정 SW 영역(106시간) 102시간을 이수함.',
    interpretation:
      '코딩이 취미 수준이 아니라 공식 교육 이수 기록으로 뒷받침된다는 PANEL 근거.',
  },
  {
    id: 'sr-science-artifact',
    title: '생기부 2학년 과학 — 아티팩트가 나타나도 결과를 그대로 존중',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 8/14쪽, 2학년 2학기 과학 세부능력 및 특기사항',
    excerpt:
      '(2학기)과학: 물과 에탄올의 분리 실험에서 측정값에 아티팩트가 나타나도 실험 결과를 그대로 존중함. 열평형을 학습한 후 물체의 입자 운동과 에너지 이동을 이용해 열평형이 단열된 상태가 아니라 같은 양의 열을 주고받는 동적인 평형 상태임을 추론함. 매 수업에 집중해서 참여하고 과학탐구를 대하는 태도가 진지해지는 성장을 보임.',
    interpretation:
      'Q3의 "예상과 다른 데이터가 나왔을 때 실험이 잘못됐다고 생각하지 않고"와 교사 기록이 독립적으로 일치한다. 자소서 주장 중 PANEL 자료가 직접 뒷받침하는 가장 강력한 항목이다.',
  },
  {
    id: 'sr-behavior-2',
    title: '생기부 2학년 행동특성 — 친구 학습 지원과 갈등 중재',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 12/14쪽, 9.행동특성 및 종합의견 (2학년)',
    excerpt:
      '평소 반에서 친구들이 학습 내용이나 문제를 질문할 때마다 친절하고 차분하게 설명해 주며, 학습을 돕는 역할을 자발적으로 수행함. 또한 친구 간의 갈등 상황이 발생했을 때 적극적으로 중재에 나서 갈등이 커지지 않도록 조율하며, 학급 분위기를 안정적으로 유지하는 데 이바지함. 말수가 적은 친구들에게도 먼저 다가가 말을 건네는 등 배려심 있는 태도를 보이며, 또래 관계에서도 신뢰받는 모습을 보임. 과학 분야에 꾸준한 관심을 가지고 일상생활 속에서 일어나는 다양한 현상을 과학적 원리로 설명하려는 태도를 보이며, 탐구적인 사고력을 기르기 위해 노력함.',
    interpretation:
      'Q5 "친구들에게 공부를 도와주며"의 직접 근거. 자소서에 없는 "갈등 중재"까지 기록되어 있어 면접에서 확장 답변이 가능하다.',
  },
  {
    id: 'sr-behavior-1',
    title: '생기부 1학년 행동특성 — 학급 회장·1인 1역',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 12/14쪽, 9.행동특성 및 종합의견 (1학년) / 2/14쪽 자율활동',
    excerpt:
      '2학기 학급 회장(2024.08.16.-2025.02.28.)으로서 임원 캠프에서 학생회 임원 및 대의원 상견례 후 리더십 소양 교육을 받고 학급회와 대의원회의 역할에 대해 생각해 보는 시간을 가짐. … 1인 1역으로 1학기에 사진 도우미를 담당하여 학급 행사 때 사진을 찍어서 공유해 주는 역할을 하고 2학기에는 학급 SNS를 관리하고 시간표, 준비물, 수행평가 일정을 안내하여 학생들이 수업에 적극적으로 참여할 수 있도록 도움. … 교외 체험활동의 모둠장을 맡아서 모둠원들이 무탈하게 체험활동을 마칠 수 있도록 이끌어 주는 모습을 통해서 책임감과 봉사 정신을 엿볼 수 있음.',
    interpretation:
      'Q5의 책임·협업 주장을 뒷받침한다. 자소서가 다루지 않은 회장 경험이므로 면접관이 먼저 물어볼 수 있는 항목이다.',
  },
  {
    id: 'sr-volunteer',
    title: '생기부 봉사활동 실적 — 담배꽁초 활동은 기재되어 있지 않음',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 4/14쪽, 봉사활동 실적',
    excerpt:
      '1학년: 2024.03.15. 봉사활동 사전교육(1시간) / 2024.05.02. 학급별 봉사체험(3시간) / 2024.10.11. 봉사활동 소양교육(1시간), 누계 5시간. 2학년: 2025.03.14. 봉사활동 사전교육(1시간) / 2025.09.19. 봉사활동 평가(1시간), 누계 2시간.',
    interpretation:
      '자소서 Q5의 핵심 사례인 담배꽁초 줍기는 초등학교 때 경험이므로 중학교 생기부에는 없다. 면접관이 생기부에서 이 활동을 확인할 방법이 없다는 점을 알고 답해야 한다.',
  },
  {
    id: 'sr-math-grades',
    title: '생기부 교과 성적 — 수학·과학 일관된 A',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 5/14, 7/14, 8/14, 9/14쪽 교과학습발달상황',
    excerpt:
      '1학년 2학기 수학 100/77.4 A, 과학 96/82.0 A. 2학년 1학기 수학 96/81.8 A, 과학 95/74.3 A, 정보 94/82.1 A. 2학년 2학기 수학 97/79.4 A, 과학 96/77.6 A, 정보 98/85.5 A. 3학년 1학기 수학 98/76.9 A, 과학 91/77.6 A. 수상: 1학년 2학기 교과우수상(수학), 2025.01.10., 목운중학교장.',
    interpretation:
      '원점수/과목평균 격차가 크고 3년간 유지된다. Q3 "재능이 있다고 생각하게 된 계기"의 배경 근거로 쓸 수 있다.',
  },
  {
    id: 'sr-science-club',
    title: '생기부 1학년 자율동아리 — 과학에 몰입하는 사람들(과학 토론 동아리)',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 2/14쪽, 1학년 자율동아리',
    excerpt: '(과학에몰입하는사람들 : 자율동아리) 과학 토론 동아리',
    interpretation:
      'Q2 "동아리를 구성해 함께 하나의 문제에 대해 고민할 수 있는 경험"의 직접 근거.',
  },
  {
    id: 'sr-no-math-record',
    title: '생기부에 나비 정리·도블·파노 평면 탐구 기록은 없음',
    sourceKind: 'SCHOOL_RECORD',
    visibility: 'PANEL',
    certainty: 'MEASURED',
    sourceRef: '학교생활기록부 전 14쪽 확인 (2학년 수학 세특 미기재, 3학년 세특은 당해학년도 미제공)',
    excerpt:
      '2학년 세부능력 및 특기사항에는 과학·정보만 기재되어 있고 수학은 기재되어 있지 않음. 3학년 세부능력 및 특기사항과 창의적 체험활동은 『학교생활기록 작성 및 관리지침(교육부훈령 제169호)』을 근거로 당해학년도에는 제공하지 않음.',
    interpretation:
      'Q1의 수학 탐구는 자소서에만 존재한다. 면접관은 이 탐구를 자소서 문장만으로 판단하므로, 질문이 오면 근거를 전적으로 본인 설명으로 만들어야 한다.',
  },

  // ─────────────────────────────── 탐구보고서 (PREP)
  {
    id: 'rep-design',
    title: '탐구보고서 실험 설계 — 변수와 측정 방법',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/03_basketball_moisture_report.pdf, 3.실험 설계',
    excerpt:
      '독립변수: 밀가루 800g에 섞은 물의 양. 종속변수: 기준선과 농구공 접점 사이의 거리 차이 Δx. 통제변수: 같은 농구공, 같은 경사면, 같은 촬영 각도, 같은 눈금판(1칸 = 1cm), 같은 밀가루 양. 경사면의 높이는 28.4cm, 빗면 길이는 90cm였습니다.',
    interpretation:
      '자소서에는 없는 수치(밀가루 800g, 경사 높이 28.4cm, 빗면 90cm, 눈금 1칸=1cm)가 여기에 있다. 꼬리질문에서 "구체적으로 어떻게 쟀나"를 물으면 이 수치로 답한다.',
  },
  {
    id: 'rep-data',
    title: '탐구보고서 측정 결과 — 조건별 평균 Δx',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/03_basketball_moisture_report.pdf, 4.실제 실험 결과',
    excerpt:
      '350g(43.75%) 반복 3회 평균 Δx 28.16cm, 표준편차 10.24, 최소 16.80, 최대 36.67 / 370g(46.25%) 반복 2회 평균 32.04cm, 표준편차 0.16, 최소 31.93, 최대 32.15 / 410g(51.25%) 반복 3회 평균 27.62cm, 표준편차 4.89, 최소 21.98, 최대 30.74 / 450g(56.25%) 반복 3회 평균 31.42cm, 표준편차 2.82, 최소 29.23, 최대 34.59',
    interpretation:
      '평균값의 순서는 28.16 → 32.04 → 27.62 → 31.42으로, 올라갔다 내려갔다 다시 올라간다. 자소서가 말한 "V 자형"과 형태가 다르다. 또한 350g 조건은 표준편차가 10.24로 조건 간 차이(약 4cm)보다 크다.',
  },
  {
    id: 'rep-interpret',
    title: '탐구보고서 결과 해석 — 윤활과 점착의 경쟁',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/03_basketball_moisture_report.pdf, 5.결과 해석',
    excerpt:
      '다만 결과는 단순히 \'물이 많을수록 더 미끄럽다\'처럼 한 방향으로만 나오지 않았습니다. 350g에서 370g으로 갈 때는 평균 Δx가 커졌지만, 410g에서는 다시 작아졌고, 450g에서는 다시 커졌습니다. 이렇게 된 이유는 물이 많아지면 표면에 윤활 효과가 생겨 미끄러짐이 커질 수도 있지만, 동시에 밀가루 반죽이 더 끈적해지면서 공의 움직임을 방해할 수도 있기 때문이라고 생각했습니다. 즉, 이번 실험에서는 수분량만이 아니라 점성, 점착성, 부분 미끄러짐 같은 여러 요소가 함께 작용한 것으로 볼 수 있습니다.',
    interpretation:
      '보고서는 원인을 "윤활 vs 점성·점착"의 경쟁으로 설명한다. 자소서는 같은 현상을 "미끄러짐 vs 표면장력"으로 설명한다. 두 설명이 다르므로 면접에서는 어느 쪽을 말할지 미리 정해야 한다.',
  },
  {
    id: 'rep-limits',
    title: '탐구보고서 한계점 — 본인이 이미 문서에 기록한 약점',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/03_basketball_moisture_report.pdf, 7.한계점',
    excerpt:
      '실제 손 대신 밀가루-물 혼합물을 사용했기 때문에 실제 손의 땀과 피부 상태를 완전히 재현하지는 못했다. 밀가루 표면은 수분량뿐 아니라 점성, 점착성도 함께 변하므로 순수한 마찰력만 분리해서 보기는 어려웠다. 영상 캡처를 이용한 분석이라 원근 왜곡과 모션 블러의 영향을 완전히 없애지 못했다. 370g 조건은 2회, 나머지는 3회만 측정해 반복 수가 충분히 많지 않았다.',
    interpretation:
      '면접관이 지적할 약점을 본인이 먼저 문서에 적어 두었다. 공격받았을 때 방어가 아니라 "보고서 한계점에 이미 적었습니다"로 받으면 태도 점수가 올라간다.',
  },
  {
    id: 'rep-hypothesis',
    title: '탐구보고서 가설 — 단조롭지 않을 수 있음을 미리 예상',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/03_basketball_moisture_report.pdf, 2.가설',
    excerpt:
      '수분량이 달라지면 농구공의 미끄러짐 정도도 달라질 것이다. 즉, 손과 농구공 사이 마찰력의 크기는 수분량에 따라 달라질 것이다. 하지만 그 변화는 단순히 계속 증가하거나 감소하지 않고, 점성이나 점착성의 영향 때문에 복잡하게 나타날 수 있다.',
    interpretation:
      '보고서의 가설은 자소서("반비례할 것이라고 예상")보다 신중하다. 보고서가 자소서보다 나중에 정리된 문서라면 생각이 발전한 것이고, 그 자체를 성장으로 설명할 수 있다. 다만 작성 시점은 확인되지 않았다.',
  },
  {
    id: 'vid-count',
    title: '실험 원본 영상 11개 — 모두 굴리기 시행이 1회씩 담겨 있음',
    sourceKind: 'VIDEO',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef:
      'sources/04_experiment_videos.zip — mp4 11개. 전 프레임을 색·형태로 훑어 공 통과 구간을 검출함',
    excerpt:
      '모두 1080×1920 세로, 30fps. 길이 1.6s~18.6s. 11개 영상 각각에서 농구공이 화면을 가로지르는 구간이 정확히 한 번씩 검출됨. 파일명은 _talkv_wzn… 형식의 해시라 조건을 알 수 없음.',
    interpretation:
      '영상 개수 11개가 보고서의 총 반복 수(3+2+3+3=11)와 일치하고, 영상마다 시행이 한 번씩 들어 있다는 점까지 확인됐다. 다만 각 영상이 어느 수분량 조건인지는 여전히 알 수 없다.',
  },
  {
    id: 'vid-reanalysis',
    title: '영상 재분석 — 이 영상들로는 Δx를 다시 잴 수 없음',
    sourceKind: 'VIDEO',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef:
      'sources/04_experiment_videos.zip 11개 전 프레임 분석 (OpenCV, 2026-08-12 수행)',
    excerpt:
      '① 공이 화면에 보이는 시간은 영상당 3~10프레임(약 0.1~0.35초)뿐이다. ② 그 사이 공의 화면상 지름이 129px에서 305px로 2.4배 커진다 — 공이 카메라 쪽으로 다가오며 지나간다는 뜻이다. ③ 공이 멈춘 최종 위치가 찍힌 프레임이 어느 영상에도 없다. ④ 굴리기 직전과 직후를 차분하면, 반죽 영역의 변화량(6.0~19.4)이 움직이지 않는 매트 인쇄 영역의 변화량(7.7~22.3)과 같은 수준이다. 즉 반죽에 공이 눌린 새 자국이 나타나지 않는다. ⑤ 카메라가 삼각대가 아니라 손에 들려 있어 프레임마다 시점이 움직인다.',
    interpretation:
      '눈금은 제빵 매트(PASTRY MAT) 가장자리에 인쇄된 cm 자를 썼고 보고서의 "1칸=1cm"와 맞다. 하지만 1회전 시점을 판정할 프레임도, 공의 정지 위치도, 기준선 대비 접점도 이 영상에서는 읽을 수 없다. 따라서 이 영상들은 실험을 했다는 기록이지 Δx를 재현·검증할 수 있는 측정 자료가 아니다. 다른 각도의 촬영본이 따로 있었을 가능성은 남아 있다.',
  },

  // ─────────────────────────────── 코드 (PREP)
  {
    id: 'code-arrange',
    title: '자리배치 arrange.py — DFS 기반 이분 매칭 원본 코드',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/05_seat_matching_source.zip → seats/files/arrange.py',
    excerpt: `def dfs_match(left, visited, left_match, right_match, can):
    if visited[left]:
        return False
    visited[left] = True
    for right in can[left]:
        if right_match[right] == 0 or dfs_match(right_match[right], visited, left_match, right_match, can):
            left_match[left] = right
            right_match[right] = left
            return True
    return False

def bipartite_match(n, can):
    left_match = [0] * (n + 1)
    right_match = [0] * (n + 1)
    left_nodes = list(range(1, n + 1))
    random.shuffle(left_nodes)
    for left in left_nodes:
        visited = [False] * (n + 1)
        dfs_match(left, visited, left_match, right_match, can)
    return left_match, right_match`,
    interpretation:
      '표준적인 쾨니그式 증가 경로 DFS 이분 매칭이다. 인덱스 0을 "아직 배정 없음" 표시로 쓰기 때문에 학생·좌석 번호가 1부터 시작한다. 학생 수와 좌석 수가 모두 n으로 같다고 가정한다.',
  },
  {
    id: 'code-complete',
    title: '자리배치 complete_matching — 미매칭 학생 무작위 배정',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/05_seat_matching_source.zip → seats/files/arrange.py',
    excerpt: `def complete_matching(n, can):
    left_match, right_match = bipartite_match(n, can)
    unmatched_left = [i for i in range(1, n + 1) if left_match[i] == 0]
    unmatched_right = [j for j in range(1, n + 1) if right_match[j] == 0]
    random.shuffle(unmatched_left)
    random.shuffle(unmatched_right)
    for left, right in zip(unmatched_left, unmatched_right):
        left_match[left] = right
        right_match[right] = left
    return left_match, right_match`,
    interpretation:
      '희망 좌석을 못 받은 학생은 남은 좌석 중 아무 곳에나 무작위로 배정된다. 즉 "모든 사람이 최대한 선호하는 자리"라는 자소서 표현은 정확히는 "희망 목록 중 하나를 받는 학생 수를 최대로 만들고, 나머지는 무작위 배정"이다.',
  },
  {
    id: 'code-launcher',
    title: '자리배치 ZIP의 프론트엔드는 빈 Pygame 창뿐',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'sources/05_seat_matching_source.zip → seats/utils/launcher.py, seats/main.py',
    excerpt: `def run():
    pygame.init()
    screen = pygame.display.set_mode((800, 600))
    pygame.display.set_caption("런처에서 실행된 파이게임")
    ...
        screen.fill((255, 255, 255))
        pygame.display.flip()`,
    interpretation:
      '이 ZIP에 들어 있는 UI 코드는 흰 화면만 띄우는 껍데기다. 형이 최종적으로 어떤 프론트엔드를 만들었는지는 이 자료로 확인할 수 없다(UNKNOWN). 화면을 설명해 달라는 질문이 오면 추측하지 말 것.',
  },
  {
    id: 'gh-yoga-angle',
    title: 'RealTimeYoga main.py — 세 랜드마크로 관절각 계산',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/RealTimeYoga — main.py (raw 확인)',
    url: 'https://github.com/Rudwpahs/RealTimeYoga',
    excerpt: `def calculateAngle(landmark1, landmark2, landmark3):
    _, x1, y1 = landmark1
    _, x2, y2 = landmark2
    _, x3, y3 = landmark3
    angle1 = math.atan2(y3 - y2, x3 - x2)
    angle2 = math.atan2(y1 - y2, x1 - x2)
    angle = math.degrees(angle1 - angle2)
    if angle < 0:
        angle += 360
    return angle`,
    interpretation:
      '가운데 점(landmark2)을 꼭짓점으로 두고, 그 점에서 나가는 두 벡터의 편각을 atan2로 각각 구한 뒤 차를 낸다. 음수가 나오면 360을 더해 0~360도로 맞춘다. 이것이 "본인이 구현한 부분"의 핵심이다.',
  },
  {
    id: 'gh-yoga-threshold',
    title: 'RealTimeYoga — 20도 임계값 판정과 색 피드백',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/RealTimeYoga — main.py (raw 확인)',
    url: 'https://github.com/Rudwpahs/RealTimeYoga',
    excerpt: `def process_angle(img, yy, lm1, lm2, lm3, ref_angle):
    angle = calculateAngle(lm1, lm2, lm3)
    diff = angle - ref_angle
    if diff < 0: diff += 360
    if diff > 180: diff = 360 - diff
    success = diff < 20
    color = (255, 0, 0) if success else (0, 0, 255)
    cv2.circle(img, (lm2[1], lm2[2]), 10, color, 2)
    return success`,
    interpretation:
      '기준 각과의 차이를 0~180도 범위로 접은 뒤 20도 미만이면 성공으로 본다. 판정된 관절 위에 원을 그려 성공/실패를 색으로 알려 준다. 임계값 20도는 학습된 값이 아니라 본인이 정한 상수다.',
  },
  {
    id: 'gh-yoga-timer',
    title: 'RealTimeYoga — 10초 유지 로직',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/RealTimeYoga — main.py (raw 확인)',
    url: 'https://github.com/Rudwpahs/RealTimeYoga',
    excerpt: `if seccess > 10:
    interval = now_time - start_time
    if 0 < interval <= 10:
        cv2.putText(img, f'Time:{int(interval)}s', ...)
    if interval > 10.0 and interval < 11.0:
        yoga_success = True
        cv2.putText(img, 'Great Job!', ...)`,
    interpretation:
      '자소서의 "10초 동안 유지하면 다음으로 넘어가는 방식"이 코드에 그대로 있다. 자세가 맞는 관절 수가 기준을 넘으면 타이머가 흐르고, 10초를 넘기면 성공 처리된다.',
  },
  {
    id: 'gh-yoga-pretrained',
    title: 'RealTimeYoga — 사전학습된 MediaPipe 모델 파일 사용',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/RealTimeYoga — 루트에 pose_landmarker_lite.task, pose_compat.py 존재',
    url: 'https://github.com/Rudwpahs/RealTimeYoga',
    excerpt:
      '저장소 루트 파일: main.py, pose_compat.py, pose_landmarker_lite.task, angle.txt, tts.py, requirements.txt, test_angle.py, installer/, web/, scripts/, .github/workflows/. 저장소 설명: "This program uses mediapipe to inform you of the accuracy of yoga postures."',
    interpretation:
      'pose_landmarker_lite.task는 Google이 배포하는 사전학습 모델 파일이다. 저장소 어디에도 학습 스크립트나 데이터셋이 없다. 따라서 "AI 모델을 직접 학습시켰다"는 표현은 사실이 아니다.',
  },
  {
    id: 'gh-yoga-history',
    title: 'RealTimeYoga 커밋 이력 — 2022년 9월 시작, 2026년 6월까지',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/RealTimeYoga/commits/main (총 47 commits)',
    url: 'https://github.com/Rudwpahs/RealTimeYoga/commits/main',
    excerpt:
      '가장 오래된 커밋: 2022년 9월 1일 "Update main.py". 가장 최근 커밋: 2026년 6월 26일 "Publish website through gh-pages branch". 총 47개 커밋.',
    interpretation:
      '요가 프로젝트는 2022년에 시작해 2026년까지 이어진 장기 프로젝트다. 자소서의 "최근에 … 두 가지 프로젝트를 만들었습니다"라는 묶음 표현과는 시점이 어긋난다.',
  },
  {
    id: 'gh-shoot-history',
    title: 'shooting-form-analysis 커밋 이력 — 2026년 2월 19일 시작',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/shooting-form-analysis/commits/main (총 25 commits)',
    url: 'https://github.com/Rudwpahs/shooting-form-analysis/commits/main',
    excerpt:
      '2026-02-19 Initial commit 외 8개 커밋(초기 구현). 2026-05-06 Streamlit/Render 배포 관련 11개 커밋(Dockerfile, render.yaml, "Rewrite Streamlit app with safer UI and error handling", "Restore slow comparison video rendering" 등). 2026-08-11 "Fix shooting-form runtime stability and smoke checks".',
    interpretation:
      '웹앱 형태는 2026년 5월 6일 작업으로 존재했다. 2026년 8월 11일 커밋은 자기소개서 제출 이후일 가능성이 높으므로, 그 시점 이후의 기능을 "지원서 당시에 있었다"고 말하면 안 된다.',
  },
  {
    id: 'gh-shoot-readme',
    title: 'shooting-form-analysis — 저장소 구성과 기능',
    sourceKind: 'GITHUB',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'github.com/Rudwpahs/shooting-form-analysis — README.md 및 루트 파일 목록',
    url: 'https://github.com/Rudwpahs/shooting-form-analysis',
    excerpt:
      '루트: main.py, web_app.py, models/, tests/, Dockerfile, render.yaml, DEPLOYMENT.md, requirements.txt, .github/workflows/. README 요지: MediaPipe pose landmark를 사용하는 Streamlit 앱 및 CLI 도구. 슈팅 영상에서 팔꿈치·어깨·엉덩이·무릎 각도를 추정하고, 저장된 프로필 또는 참조 영상과 비교하며, 느린 비교 영상을 생성함. 농구공 검출은 YOLO 옵션.',
    interpretation:
      'README가 설명하는 비교 대상은 "저장된 프로필 또는 참조 영상"이다. 자소서가 말한 "원하는 농구 선수의 이름을 입력"이 실제 동작하는 기능인지는 이 확인 범위에서 판단할 수 없다(UNKNOWN).',
  },

  // ─────────────────────────────── 이론 (PREP)
  {
    id: 'th-fano',
    title: '이론 — 파노 평면과 도블의 관계',
    sourceKind: 'THEORY',
    visibility: 'PREP',
    certainty: 'INFERRED',
    sourceRef: '유한사영평면 일반 이론 (면접 대비용 정리, 원본 자료 아님)',
    excerpt:
      '차수 n인 유한사영평면은 n²+n+1개의 점과 같은 수의 직선을 가지며, 각 직선 위에 n+1개의 점이 있고, 각 점을 지나는 직선이 n+1개이며, 서로 다른 두 직선은 정확히 한 점에서 만난다. 파노 평면은 n=2인 경우로 점 7개, 직선 7개, 한 직선 위의 점 3개다.',
    interpretation:
      '"카드=직선, 그림=점"으로 두면 두 카드가 정확히 한 그림을 공유하는 성질이 곧 두 직선이 한 점에서 만난다는 성질이 된다. 이 대응은 원리를 설명하는 것이고, 상용 도블 제품의 카드 구성이 특정 사영평면과 완전히 같다고 단정할 근거는 이 패키지에 없다.',
  },
  {
    id: 'th-matching',
    title: '이론 — 이분 매칭과 증가 경로',
    sourceKind: 'THEORY',
    visibility: 'PREP',
    certainty: 'INFERRED',
    sourceRef: '그래프 이론 일반 (면접 대비용 정리, 원본 자료 아님)',
    excerpt:
      '학생 집합과 좌석 집합을 두 부분으로 하는 이분 그래프에서, 학생이 희망한 좌석을 간선으로 둔다. 매칭은 서로 끝점을 공유하지 않는 간선 집합이다. 증가 경로는 매칭되지 않은 정점에서 시작해 비매칭 간선과 매칭 간선을 번갈아 지나 매칭되지 않은 정점에서 끝나는 경로이며, 이 경로를 뒤집으면 매칭 크기가 1 늘어난다. 증가 경로가 더 이상 없으면 그 매칭은 최대 매칭이다.',
    interpretation:
      'arrange.py의 재귀는 정확히 이 증가 경로를 찾는 과정이다. 좌석이 이미 찼으면 그 좌석을 쓰는 학생을 다른 희망 좌석으로 밀어낼 수 있는지 재귀로 확인하고, 성공하면 자리를 넘겨받는다.',
  },
  {
    id: 'th-complexity',
    title: '이론 — 시간복잡도와 Hopcroft–Karp',
    sourceKind: 'THEORY',
    visibility: 'PREP',
    certainty: 'INFERRED',
    sourceRef: '알고리즘 일반 (면접 대비용 정리, 원본 자료 아님)',
    excerpt:
      '왼쪽 정점마다 한 번씩 DFS를 돌리고 각 DFS가 최대 O(E)이므로 전체는 O(V·E)이다. 학생 n명·좌석 n개이고 희망 좌석이 최대 3개면 E는 최대 3n이므로 대략 O(n²)이다. Hopcroft–Karp는 BFS로 최단 증가 경로의 층을 만든 뒤 DFS로 여러 개를 한 번에 처리해 O(E√V)를 달성한다.',
    interpretation:
      'Hopcroft–Karp는 이후에 공부한 개선 방법이지 당시 구현한 알고리즘이 아니다. 질문을 받으면 반드시 그렇게 구분해서 말해야 한다.',
  },
  {
    id: 'th-friction',
    title: '이론 — Δx가 마찰계수가 아닌 이유',
    sourceKind: 'THEORY',
    visibility: 'PREP',
    certainty: 'INFERRED',
    sourceRef: '역학 일반 (면접 대비용 정리, 원본 자료 아님)',
    excerpt:
      '마찰계수 μ는 마찰력과 수직항력의 비로 정의되는 무차원량이다. 이번 실험이 측정한 Δx는 공이 1회전하는 동안 순수 구름 상태와 실제 위치 사이에 생긴 거리 차이로, 단위가 cm인 미끄러짐 거리다. 미끄러짐이 크다는 것과 μ가 작다는 것은 같은 방향을 가리킬 수는 있지만 같은 양이 아니다.',
    interpretation:
      'Δx는 마찰 거동의 대리 지표(proxy)다. 자소서의 "즉 마찰 계수가 최대가 되도록 하는"이라는 표현은 이 구분을 건너뛰고 있어, 면접에서 가장 정확하게 정정해야 할 지점이다.',
  },
  {
    id: 'th-surface-tension',
    title: '이론 — 표면장력 설명의 취약점',
    sourceKind: 'THEORY',
    visibility: 'PREP',
    certainty: 'INFERRED',
    sourceRef: '물리 일반 (면접 대비용 정리, 원본 자료 아님)',
    excerpt:
      '표면장력은 액체 표면이 스스로 넓이를 줄이려는 성질이고, 두 고체 사이의 얇은 액체막이 만드는 끌어당김은 보통 액체 가교(liquid bridge)에 의한 모세관 부착력으로 설명한다. 반죽처럼 걸쭉한 계에서는 점성 저항과 점착이 함께 작용해 표면장력만으로 분리해 말하기 어렵다.',
    interpretation:
      '자소서는 "표면장력", 보고서는 "점성·점착"으로 같은 현상을 설명한다. 면접에서는 "당시에는 표면장력이라고 표현했지만, 지금은 점착과 점성이 함께 작용한 것으로 봅니다"처럼 성장으로 말하는 편이 안전하다.',
  },

  // ─────────────────────────────── 본인 설명 (PREP)
  {
    id: 'note-seat-roles',
    title: '본인 설명 — 자리배치 프로젝트의 역할 분담',
    sourceKind: 'USER_NOTE',
    visibility: 'PREP',
    certainty: 'UNKNOWN',
    sourceRef: '사용자가 핸드오프 패키지에 직접 적은 설명 (docs/05_KNOWN_FACTS_AND_RISKS.md). 문서·코드로는 확인되지 않음',
    excerpt:
      '동아리 시간에 아는 형과 둘이 작업했다. 형이 이분 매칭 알고리즘의 개념·원리를 알려주었고, 본인이 그 알고리즘을 파이썬으로 구현했다. 형이 프론트엔드를 제작했다.',
    interpretation:
      '이 역할 분담은 본인 진술이며 생기부에도 코드에도 기록이 없다. 그래도 면접에서는 반드시 먼저 밝혀야 한다. 숨겼다가 꼬리질문으로 드러나는 쪽이 훨씬 나쁘다.',
  },
  {
    id: 'note-essay-date',
    title: '확인 필요 — 자기소개서 제출일',
    sourceKind: 'USER_NOTE',
    visibility: 'PREP',
    certainty: 'UNKNOWN',
    sourceRef: '이 패키지의 어떤 자료에도 제출일이 적혀 있지 않음',
    excerpt: '자기소개서 PDF에 작성일·제출일 표기가 없다.',
    interpretation:
      '제출일을 알아야 GitHub 커밋 중 어디까지가 "지원서 당시 기능"인지 선을 그을 수 있다. 특히 2026년 8월 11일 커밋이 제출 전인지 후인지가 갈린다. 본인이 날짜를 확정해 이 항목을 채워야 한다.',
  },

  // ─────────────────────────────── LUNDA / PR1 / PR2 (PREP 전용)
  // 면접관이 전형 당일 보는 자료가 아니다. PANEL로 승격하지 않는다.
  {
    id: 'lunda-brand-phrases',
    title: 'LUNDA 브랜드 문구 — screen-light outdoor audio',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef:
      'LUNDA_PR1_AlwaysLinked_MASTER.svg / LUNDA_PR1_FieldSignal_CropStressPreview.png / LUNDA Instagram profile previews (KSA_Cursor_LUNDA_Handoff)',
    excerpt:
      'PR1 CONNECTS SOUND, NOT DISTRACTION. LISTEN OUTSIDE. STAY WITH THE PEOPLE AND PLACE AROUND YOU. SCREEN-LIGHT OUTDOOR AUDIO. PHONE DOWN. SOUND ON. STAY PRESENT. Make space for what matters. ALWAYS LINKED / PROTOTYPE 01. PROTOTYPE IN PROGRESS. BUILD · TEST · LEARN. NO BLUETOOTH, NO WIFI, JUST THE SIGNAL.',
    interpretation:
      'Q6 "현실과 디지털을 하나로 통합"을 구체화하는 PREP 사례다. 디지털 기능을 늘리는 통합이 아니라, 화면·주의분산을 줄이면서 필요한 소리만 연결해 주변 사람·장소에 머무르게 한다는 방향이다. 완성 제품·사업 성과 근거가 아니며 prototype in progress 이상으로 확대하면 안 된다.',
  },
  {
    id: 'lunda-build-test-learn',
    title: 'LUNDA 작업 흐름 — IDEA → PROBLEM → BUILD → LEARN',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'LUNDA brand narrative materials (THE IDEA / PROBLEM / RESPONSE / PRINCIPLE / WORK / PROJECT / DIRECTION)',
    excerpt:
      'THE IDEA / LISTEN → THE PROBLEM / WITHOUT DISTRACTION → THE RESPONSE / MOVE → THE PRINCIPLE / MAKE IT REAL → THE WORK / BUILD → THE PROJECT / PR1 → THE DIRECTION / LEARN. BUILD · TEST · LEARN. PROTOTYPE IN PROGRESS.',
    interpretation:
      'Q6 "혁명" 표현을 방어할 때 큰 말을 키우지 않고, 아이디어·문제정의·prototype·build·test·learn을 반복하는 현재의 작은 행동으로 낮추는 PREP 근거다. 면접관에게 프로젝트 이름을 안다고 가정하지 말고, "지금 실제로 하는 일"로만 말한다.',
  },
  {
    id: 'pr1-outdoor-audio',
    title: 'PR1 — outdoor audio / 화면 의존을 줄이는 문제정의',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'PR1 프로젝트 인계 자료 (KSA_PR1_PR2_Interview_Supplement / 01_PR1_STORY.md)',
    excerpt:
      '공원·운동장 등에서 스마트폰 화면을 계속 보지 않고도 필요한 오디오를 듣는 장거리 무선 오디오 프로토타입. Bluetooth/Wi‑Fi를 쓰지 않는 방향. 송신기 1대 ↔ 수신기 1대. 초기 예산 약 15만 원. 첫 목표는 상품 완성이 아니라 실제 하드웨어 종단간 PoC. 제품 철학: 소리는 연결하되, 화면과 주의분산은 줄이자.',
    interpretation:
      '라이프테크·통합 문장을 "기능을 더 붙이는 제품"이 아니라 "현실의 행동을 덜 방해하면서 필요한 도움만 주는 기술"로 내려앉히는 현재 프로젝트 사례다. PANEL 자료가 아니므로 면접관이 PR1을 이미 안다고 전제한 질문을 만들지 않는다.',
  },
  {
    id: 'pr1-packet-constraint',
    title: 'PR1 — 654 B packet 제약 발견과 설계 수정',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'PR1 프로젝트 인계 자료 — 사전 검증·Day 13 압축 후보',
    excerpt:
      '초기 설계: 32 kHz / 16-bit / mono / 10 ms frame / 640 B PCM + 14 B header = 총 654 B application packet, 약 100 packets/s. 654 B가 실제 SX1280 계열 RF packet 하나에 들어가지 않는다는 문제가 드러남. 대응: 설계를 고집하지 않음 → 제약을 숫자로 재확인 → 압축/분할 후보 검토 → 예상 payload가 아니라 encoder 실제 반환값을 쓰도록 설계. Day 13 후보: 24 kHz mono 10 ms Opus VOIP 48 kbps hard CBR, DTX off, FEC off.',
    interpretation:
      '실패·검증 인성 질문용 PREP 증거다. 기술 이름을 길게 설명하지 말고, "생각이 틀렸을 때 고집하지 않고 숫자로 다시 확인한 뒤 설계를 바꿨다"는 행동 증거로만 쓴다.',
  },
  {
    id: 'pr1-verified-vs-unknown',
    title: 'PR1 — localhost 성공 ≠ 실제 RF / GO·NO-GO 판정',
    sourceKind: 'REPORT',
    visibility: 'PREP',
    certainty: 'MEASURED',
    sourceRef: 'PR1 프로젝트 인계 자료 — 검증한 것 / 안 한 것 · Gate 방식',
    excerpt:
      '검증: localhost UDP 10,000 packets, missing=0, 약 100 packets/s, PC 소프트웨어 구조 일부. 미검증: 실제 SX1280 RF 성능, 실제 ESP32-S3 실시간 Opus, 안테나/벽/사람에 의한 손실, 실제 오디오 지연, 발열/전력/장시간 안정성. 판정: 하드웨어 검증 GO / 양산 NO-GO. Gate: 부품 확인 → 보드 bring-up → RF ping → 로컬 오디오 → on-device Opus → 압축 패킷 RF 전송 → 실시간 재생 → 종단간 측정.',
    interpretation:
      '모르는 것을 인정하고, 원하는 결론보다 실제 상태를 우선하는 태도 증거다. localhost 성공을 실제 RF 성공처럼 말하면 안 된다. 규정·안전도 제품 설계의 일부로 본다는 점까지 연결할 수 있다.',
  },
  {
    id: 'pr2-ai-autonomy',
    title: 'PR2 — AI 개입과 사용자 자율성 (본인 진술 복원)',
    sourceKind: 'USER_NOTE',
    visibility: 'PREP',
    certainty: 'UNKNOWN',
    sourceRef:
      '이전 대화에서 사용자가 직접 제시한 아이디어 복원 (KSA_PR1_PR2_Interview_Supplement / 03_PR2_STORY.md). 하드웨어·성능 문서는 미확보',
    excerpt:
      'Meta 계열 안경 같은 웨어러블과 경쟁해야 하는가? JARVIS 같은 assistant AI가 들어갈 수 있는가? 사용자가 항상 AI와 연결되어 있기를 원할까? 개인시간/비개입 모드가 필요하지 않을까? "개인시간을 가지고 싶을 수도 있잖아."',
    interpretation:
      '자소서 Q6의 "AI 없이는 살아가기 어려운 세상"에서 이어질 수 있는 PREP 사고실험이다. "무엇을 더 할 수 있는 AI인가"뿐 아니라 "언제 물러나야 하는 AI인가"를 묻는다. PR2의 센서·배터리·통신·완성도·성능은 확정하지 않는다.',
  },
  {
    id: 'pr2-wearable-form',
    title: 'PR2 — 착용 위치·형태 탐색 (본인 진술 복원)',
    sourceKind: 'USER_NOTE',
    visibility: 'PREP',
    certainty: 'UNKNOWN',
    sourceRef: '이전 대화 기반 복원 — 귀에 손을 대며 확인한 착용감·주변음 탐색',
    excerpt:
      '귀 주변/귓바퀴 안쪽에 매우 얇게 들어가는 오디오·AI 보조 장치 아이디어. snug 부근, antitragus 방향, inner concha 안쪽, 얇고 반투명한 형태, 주변음 차단감을 실제 귀에 손을 대보며 확인하며 아이디어를 수정.',
    interpretation:
      '성능 수치나 완성된 prototype이 아니라, 착용감·주변음·존재감도 설계 조건으로 본다는 태도 증거다. 구체 하드웨어를 발명해서 말하면 안 된다.',
  },
  {
    id: 'note-pr1-pr2-common',
    title: 'PR1·PR2 공통 방향 — 필요할 때만 존재하는 기술',
    sourceKind: 'USER_NOTE',
    visibility: 'PREP',
    certainty: 'INFERRED',
    sourceRef: 'PR1·PR2 교차 정리 (05_CROSS_PROJECT_VALUES.md). 공식 좌우명이 아님',
    excerpt:
      '좋은 기술은 사용자의 시간을 더 많이 차지하는 기술이 아니라, 필요할 때 도움을 주고 필요하지 않을 때 물러날 수 있는 기술이다.',
    interpretation:
      '두 프로젝트에서 드러나는 공통 방향으로만 쓴다. 공식 슬로건처럼 단정하지 않는다. PR1의 화면 의존 감소와 PR2의 AI 비개입·개인시간이 같은 줄기에 있다.',
  },
];

export const evidenceById = new Map(evidence.map((e) => [e.id, e]));
