// 빵 프리셋 데이터 타입 정의
export interface BreadPreset {
  id: string;
  name: string;
  description: string;
  defaultTimeMinutes: number;
  emoji: string;
}

// 빵 프리셋 목록
export const breadPresets: BreadPreset[] = [
  {
    id: 'white-bread',
    name: '식빵',
    description: '부드럽고 폭신한 기본 식빵',
    defaultTimeMinutes: 60,
    emoji: '🍞',
  },
  {
    id: 'baguette',
    name: '바게트',
    description: '바삭한 껍질의 프랑스 빵',
    defaultTimeMinutes: 45,
    emoji: '🥖',
  },
  {
    id: 'sourdough',
    name: '사워도우',
    description: '천연 발효종으로 만든 건강빵',
    defaultTimeMinutes: 240,
    emoji: '🫓',
  },
  {
    id: 'croissant',
    name: '크루아상',
    description: '버터 풍미 가득한 페이스트리',
    defaultTimeMinutes: 90,
    emoji: '🥐',
  },
  {
    id: 'focaccia',
    name: '포카치아',
    description: '올리브 오일을 곁들인 이탈리아 빵',
    defaultTimeMinutes: 75,
    emoji: '🫓',
  },
  {
    id: 'brioche',
    name: '브리오슈',
    description: '달콤하고 부드러운 프랑스 빵',
    defaultTimeMinutes: 120,
    emoji: '🧁',
  },
  {
    id: 'custom',
    name: '직접 설정',
    description: '원하는 시간을 직접 입력하세요',
    defaultTimeMinutes: 30,
    emoji: '⏱️',
  },
];

export default breadPresets;
