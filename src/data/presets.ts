// 발효 단계 타입 정의
export type StageType = 'mixing' | 'firstRise' | 'punch' | 'rest' | 'shaping' | 'secondRise' | 'baking';

export interface FermentationStage {
    id: StageType;
    name: string;
    description: string;
    durationMinutes: number;
    emoji: string;
}

// 빵 프리셋 데이터 타입 정의
export interface BreadPreset {
    id: string;
    name: string;
    description: string;
    emoji: string;
    stages: FermentationStage[];
}

// 단계별 한글 이름 및 설명
const stageInfo: Record<StageType, { name: string; emoji: string }> = {
    mixing: { name: '반죽', emoji: '🥣' },
    firstRise: { name: '1차 발효', emoji: '🌡️' },
    punch: { name: '펀치/가스빼기', emoji: '👊' },
    rest: { name: '휴지', emoji: '😴' },
    shaping: { name: '성형', emoji: '✋' },
    secondRise: { name: '2차 발효', emoji: '🍞' },
    baking: { name: '굽기', emoji: '🔥' },
};

// 빵 프리셋 목록
export const breadPresets: BreadPreset[] = [
    {
        id: 'white-bread',
        name: '식빵',
        description: '부드럽고 폭신한 기본 식빵',
        emoji: '🍞',
        stages: [
            { id: 'firstRise', name: stageInfo.firstRise.name, emoji: stageInfo.firstRise.emoji, description: '따뜻한 곳에서 2배로 부풀 때까지', durationMinutes: 60 },
            { id: 'punch', name: stageInfo.punch.name, emoji: stageInfo.punch.emoji, description: '가스를 빼고 다시 둥글리기', durationMinutes: 2 },
            { id: 'rest', name: stageInfo.rest.name, emoji: stageInfo.rest.emoji, description: '반죽을 쉬게 하기', durationMinutes: 15 },
            { id: 'secondRise', name: stageInfo.secondRise.name, emoji: stageInfo.secondRise.emoji, description: '틀에 넣고 2배로 부풀 때까지', durationMinutes: 45 },
        ],
    },
    {
        id: 'baguette',
        name: '바게트',
        description: '바삭한 껍질의 프랑스 빵',
        emoji: '🥖',
        stages: [
            { id: 'firstRise', name: stageInfo.firstRise.name, emoji: stageInfo.firstRise.emoji, description: '실온에서 1차 발효', durationMinutes: 90 },
            { id: 'rest', name: stageInfo.rest.name, emoji: stageInfo.rest.emoji, description: '분할 후 벤치 타임', durationMinutes: 20 },
            { id: 'shaping', name: stageInfo.shaping.name, emoji: stageInfo.shaping.emoji, description: '바게트 모양으로 성형', durationMinutes: 5 },
            { id: 'secondRise', name: stageInfo.secondRise.name, emoji: stageInfo.secondRise.emoji, description: '쿠프 전 최종 발효', durationMinutes: 45 },
        ],
    },
    {
        id: 'sourdough',
        name: '사워도우',
        description: '천연 발효종으로 만든 건강빵',
        emoji: '🫓',
        stages: [
            { id: 'firstRise', name: stageInfo.firstRise.name, emoji: stageInfo.firstRise.emoji, description: '실온에서 벌크 발효 (폴딩 포함)', durationMinutes: 240 },
            { id: 'shaping', name: stageInfo.shaping.name, emoji: stageInfo.shaping.emoji, description: '프리쉐이핑 및 성형', durationMinutes: 10 },
            { id: 'secondRise', name: stageInfo.secondRise.name, emoji: stageInfo.secondRise.emoji, description: '바네통에서 냉장 발효 (또는 실온)', durationMinutes: 60 },
        ],
    },
    {
        id: 'croissant',
        name: '크루아상',
        description: '버터 풍미 가득한 페이스트리',
        emoji: '🥐',
        stages: [
            { id: 'firstRise', name: stageInfo.firstRise.name, emoji: stageInfo.firstRise.emoji, description: '데트랑프 발효', durationMinutes: 60 },
            { id: 'rest', name: stageInfo.rest.name, emoji: stageInfo.rest.emoji, description: '냉장 휴지 (버터 접기 전)', durationMinutes: 30 },
            { id: 'shaping', name: stageInfo.shaping.name, emoji: stageInfo.shaping.emoji, description: '삼각형으로 자르고 말기', durationMinutes: 15 },
            { id: 'secondRise', name: stageInfo.secondRise.name, emoji: stageInfo.secondRise.emoji, description: '따뜻한 곳에서 최종 발효', durationMinutes: 90 },
        ],
    },
    {
        id: 'focaccia',
        name: '포카치아',
        description: '올리브 오일을 곁들인 이탈리아 빵',
        emoji: '🫓',
        stages: [
            { id: 'firstRise', name: stageInfo.firstRise.name, emoji: stageInfo.firstRise.emoji, description: '볼에서 1차 발효', durationMinutes: 90 },
            { id: 'rest', name: stageInfo.rest.name, emoji: stageInfo.rest.emoji, description: '팬에 펴고 휴지', durationMinutes: 30 },
            { id: 'secondRise', name: stageInfo.secondRise.name, emoji: stageInfo.secondRise.emoji, description: '딤플 만들고 2차 발효', durationMinutes: 45 },
        ],
    },
    {
        id: 'brioche',
        name: '브리오슈',
        description: '달콤하고 부드러운 프랑스 빵',
        emoji: '🧁',
        stages: [
            { id: 'firstRise', name: stageInfo.firstRise.name, emoji: stageInfo.firstRise.emoji, description: '실온에서 1차 발효', durationMinutes: 90 },
            { id: 'rest', name: stageInfo.rest.name, emoji: stageInfo.rest.emoji, description: '냉장 휴지 (다루기 쉽게)', durationMinutes: 60 },
            { id: 'shaping', name: stageInfo.shaping.name, emoji: stageInfo.shaping.emoji, description: '브리오슈 모양 성형', durationMinutes: 10 },
            { id: 'secondRise', name: stageInfo.secondRise.name, emoji: stageInfo.secondRise.emoji, description: '틀에서 최종 발효', durationMinutes: 60 },
        ],
    },
    {
        id: 'custom',
        name: '직접 설정',
        description: '나만의 발효 시간을 설정하세요',
        emoji: '⏱️',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '원하는 시간으로 설정', durationMinutes: 60 },
        ],
    },
];

// 총 발효 시간 계산
export function getTotalTime(stages: FermentationStage[]): number {
    return stages.reduce((sum, stage) => sum + stage.durationMinutes, 0);
}

export default breadPresets;
