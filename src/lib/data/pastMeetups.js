// Ported from the Claude Design `Past Meetups.dc.html` renderVals() logic.
// Builds the list of past meetups shown in the accordion.

const topics = [
  '첫 만남, 데이터 시각화란 무엇인가',
  '엑셀 차트를 넘어서: 툴 비교기',
  '컬러로 말하기 - 배색의 원칙',
  '대시보드 디자인 리뷰',
  'D3.js로 인터랙티브 차트 만들기',
  '스토리텔링 with Data',
  '지도 시각화 A to Z',
  '실무자가 말하는 삽질 경험담',
  '접근성을 고려한 차트 디자인',
  '실시간 데이터와 시각화',
  '오픈소스 시각화 라이브러리 탐방',
  '올해의 베스트 시각화 사례',
]

const kinds = ['강연', '워크샵', '스터디', '강연', '워크샵', '강연', '스터디', '강연', '워크샵', '강연', '스터디', '강연']

const speakers = [
  ['김서연', '데이터 저널리스트'],
  ['이준호', '핀테크 데이터 분석가'],
  ['박하늘', '브랜드 디자이너'],
  ['정민우', 'BI 엔지니어'],
  ['최유진', '프론트엔드 개발자'],
  ['한지원', '리서치 기획자'],
  ['오세훈', '공간정보 연구원'],
  ['임수아', '프로덕트 애널리스트'],
  ['배도현', '접근성 컨설턴트'],
  ['신재혁', '데이터 플랫폼 엔지니어'],
  ['문가영', '오픈소스 컨트리뷰터'],
  ['조은비', '시각화 디렉터'],
]

const places = ['서울', '온라인', '서울', '서울', '온라인', '서울', '서울', '온라인', '서울', '서울', '온라인', '서울']

/**
 * @param {number} count number of past meetups to generate (default 12)
 * @returns list of meetups, most-recent first
 */
export function buildPastMeetups(count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const topic = topics[i % topics.length]
    return {
      idx: i,
      label: `#${String(i + 1).padStart(2, '0')}`,
      title: topic,
      kind: kinds[i % kinds.length],
      place: places[i % places.length],
      speaker: speakers[i % speakers.length][0],
      org: speakers[i % speakers.length][1],
      summary: `‘${topic}' — 사례와 실무 경험을 나눴어요. 발표 후에는 참가자들과 함께 이야기 나누는 시간을 가졌습니다.`,
      date: `2025.${String((i % 12) + 1).padStart(2, '0')}`,
    }
  }).reverse()
}
