// 발효 단계 타입 정의
export type StageType = 'mixing' | 'autolyse' | 'firstRise' | 'stretch' | 'punch' | 'rest' | 'shaping' | 'secondRise' | 'retard' | 'baking';

export interface FermentationStage {
    id: StageType | string;
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
    isCustom?: boolean;
}

// 단계별 한글 이름 및 설명
export const stageInfo: Record<StageType, { name: string; emoji: string }> = {
    mixing: { name: '반죽', emoji: '🥣' },
    autolyse: { name: '오토리즈', emoji: '💧' },
    firstRise: { name: '1차 발효', emoji: '🌡️' },
    stretch: { name: '스트레치 & 폴드', emoji: '🤲' },
    punch: { name: '펀치/가스빼기', emoji: '👊' },
    rest: { name: '휴지', emoji: '😴' },
    shaping: { name: '성형', emoji: '✋' },
    secondRise: { name: '2차 발효', emoji: '🍞' },
    retard: { name: '냉장 발효', emoji: '❄️' },
    baking: { name: '굽기', emoji: '🔥' },
};

// 빵 프리셋 목록 (15종)
export const defaultPresets: BreadPreset[] = [
    // === 기본 빵 ===
    {
        id: 'white-bread',
        name: '식빵',
        description: '부드럽고 폭신한 기본 식빵',
        emoji: '🍞',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '따뜻한 곳에서 2배로 부풀 때까지', durationMinutes: 60 },
            { id: 'punch', name: '가스빼기', emoji: '👊', description: '가스를 빼고 다시 둥글리기', durationMinutes: 2 },
            { id: 'rest', name: '벤치 타임', emoji: '😴', description: '반죽을 쉬게 하기', durationMinutes: 15 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '틀에 넣고 2배로 부풀 때까지', durationMinutes: 45 },
        ],
    },
    {
        id: 'milk-bread',
        name: '우유식빵',
        description: '우유로 만든 촉촉한 식빵',
        emoji: '🥛',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '따뜻한 곳에서 발효', durationMinutes: 70 },
            { id: 'punch', name: '가스빼기', emoji: '👊', description: '가스를 빼기', durationMinutes: 2 },
            { id: 'rest', name: '벤치 타임', emoji: '😴', description: '반죽 휴지', durationMinutes: 20 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '틀에서 발효', durationMinutes: 50 },
        ],
    },
    // === 프랑스 빵 ===
    {
        id: 'baguette',
        name: '바게트',
        description: '바삭한 껍질의 프랑스 빵',
        emoji: '🥖',
        stages: [
            { id: 'autolyse', name: '오토리즈', emoji: '💧', description: '밀가루와 물 결합', durationMinutes: 30 },
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '실온에서 벌크 발효', durationMinutes: 90 },
            { id: 'rest', name: '벤치 타임', emoji: '😴', description: '분할 후 휴지', durationMinutes: 20 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '바게트 모양으로 성형', durationMinutes: 5 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '쿠프 전 최종 발효', durationMinutes: 45 },
        ],
    },
    {
        id: 'pain-de-campagne',
        name: '캉파뉴',
        description: '프랑스 시골빵, 통밀 풍미',
        emoji: '🫓',
        stages: [
            { id: 'autolyse', name: '오토리즈', emoji: '💧', description: '밀가루 수화', durationMinutes: 45 },
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '폴딩과 함께 발효', durationMinutes: 180 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '둥글게 성형', durationMinutes: 10 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '바네통에서 발효', durationMinutes: 60 },
        ],
    },
    // === 천연발효빵 ===
    {
        id: 'sourdough',
        name: '사워도우',
        description: '천연 발효종으로 만든 건강빵',
        emoji: '🫓',
        stages: [
            { id: 'autolyse', name: '오토리즈', emoji: '💧', description: '밀가루와 물 결합', durationMinutes: 60 },
            { id: 'firstRise', name: '벌크 발효', emoji: '🌡️', description: '스트레치 & 폴드 포함', durationMinutes: 240 },
            { id: 'shaping', name: '프리쉐이핑 + 성형', emoji: '✋', description: '두 번에 나눠 성형', durationMinutes: 30 },
            { id: 'retard', name: '냉장 발효', emoji: '❄️', description: '냉장고에서 오버나이트', durationMinutes: 480 },
        ],
    },
    {
        id: 'sourdough-short',
        name: '사워도우 (단축)',
        description: '같은 날 완성하는 사워도우',
        emoji: '⏰',
        stages: [
            { id: 'firstRise', name: '벌크 발효', emoji: '🌡️', description: '실온에서 발효', durationMinutes: 300 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '프리쉐이핑 후 성형', durationMinutes: 20 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '실온에서 최종 발효', durationMinutes: 90 },
        ],
    },
    // === 페이스트리 ===
    {
        id: 'croissant',
        name: '크루아상',
        description: '버터 풍미 가득한 페이스트리',
        emoji: '🥐',
        stages: [
            { id: 'firstRise', name: '데트랑프 발효', emoji: '🌡️', description: '반죽 1차 발효', durationMinutes: 60 },
            { id: 'retard', name: '냉장 휴지', emoji: '❄️', description: '버터 접기 전 냉장', durationMinutes: 30 },
            { id: 'rest', name: '접기 사이 휴지', emoji: '😴', description: '글루텐 이완', durationMinutes: 30 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '삼각형으로 자르고 말기', durationMinutes: 20 },
            { id: 'secondRise', name: '최종 발효', emoji: '🍞', description: '따뜻한 곳에서 발효', durationMinutes: 120 },
        ],
    },
    {
        id: 'danish',
        name: '데니쉬',
        description: '달콤한 덴마크 페이스트리',
        emoji: '🥮',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '반죽 발효', durationMinutes: 60 },
            { id: 'retard', name: '냉장 휴지', emoji: '❄️', description: '버터 작업 준비', durationMinutes: 60 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '원하는 모양으로 성형', durationMinutes: 15 },
            { id: 'secondRise', name: '최종 발효', emoji: '🍞', description: '토핑 올리기 전 발효', durationMinutes: 90 },
        ],
    },
    // === 이탈리아 빵 ===
    {
        id: 'focaccia',
        name: '포카치아',
        description: '올리브 오일을 곁들인 이탈리아 빵',
        emoji: '🫒',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '볼에서 발효', durationMinutes: 90 },
            { id: 'rest', name: '팬 휴지', emoji: '😴', description: '팬에 펴고 휴지', durationMinutes: 30 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '딤플 만들고 발효', durationMinutes: 45 },
        ],
    },
    {
        id: 'ciabatta',
        name: '치아바타',
        description: '구멍이 큰 이탈리아 빵',
        emoji: '🥖',
        stages: [
            { id: 'autolyse', name: '오토리즈', emoji: '💧', description: '높은 수분 결합', durationMinutes: 30 },
            { id: 'firstRise', name: '벌크 발효', emoji: '🌡️', description: '폴딩과 함께 발효', durationMinutes: 180 },
            { id: 'rest', name: '분할 휴지', emoji: '😴', description: '분할 후 휴지', durationMinutes: 30 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '최종 발효', durationMinutes: 45 },
        ],
    },
    // === 부드러운 빵 ===
    {
        id: 'brioche',
        name: '브리오슈',
        description: '달콤하고 부드러운 프랑스 빵',
        emoji: '🧁',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '실온에서 발효', durationMinutes: 90 },
            { id: 'retard', name: '냉장 휴지', emoji: '❄️', description: '다루기 쉽게 냉장', durationMinutes: 60 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '브리오슈 모양 성형', durationMinutes: 10 },
            { id: 'secondRise', name: '최종 발효', emoji: '🍞', description: '틀에서 발효', durationMinutes: 60 },
        ],
    },
    {
        id: 'challah',
        name: '할라',
        description: '유대 전통 꽈배기 빵',
        emoji: '🪢',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '2배로 부풀 때까지', durationMinutes: 90 },
            { id: 'rest', name: '분할 휴지', emoji: '😴', description: '분할 후 휴지', durationMinutes: 15 },
            { id: 'shaping', name: '꽈배기 엮기', emoji: '✋', description: '끈 만들어 엮기', durationMinutes: 15 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '달걀물 전 발효', durationMinutes: 45 },
        ],
    },
    // === 특수 빵 ===
    {
        id: 'pizza-dough',
        name: '피자 도우',
        description: '얇고 바삭한 피자 반죽',
        emoji: '🍕',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '실온 발효', durationMinutes: 60 },
            { id: 'rest', name: '볼링 후 휴지', emoji: '😴', description: '분할 후 둥글려 휴지', durationMinutes: 30 },
        ],
    },
    {
        id: 'bagel',
        name: '베이글',
        description: '쫄깃한 뉴욕 스타일 베이글',
        emoji: '🥯',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '실온에서 발효', durationMinutes: 60 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '도넛 모양으로 성형', durationMinutes: 10 },
            { id: 'retard', name: '냉장 발효', emoji: '❄️', description: '오버나이트 냉장', durationMinutes: 480 },
        ],
    },
    {
        id: 'pretzel',
        name: '프레첼',
        description: '독일식 꽈배기 빵',
        emoji: '🥨',
        stages: [
            { id: 'firstRise', name: '1차 발효', emoji: '🌡️', description: '실온에서 발효', durationMinutes: 60 },
            { id: 'rest', name: '분할 휴지', emoji: '😴', description: '분할 후 휴지', durationMinutes: 10 },
            { id: 'shaping', name: '성형', emoji: '✋', description: '프레첼 모양 만들기', durationMinutes: 15 },
            { id: 'secondRise', name: '2차 발효', emoji: '🍞', description: '잿물 담그기 전 발효', durationMinutes: 30 },
        ],
    },
];

// 총 발효 시간 계산
export function getTotalTime(stages: FermentationStage[]): number {
    return stages.reduce((sum, stage) => sum + stage.durationMinutes, 0);
}

// 새 빈 단계 생성
export function createEmptyStage(): FermentationStage {
    return {
        id: 'firstRise',
        name: '1차 발효',
        emoji: '🌡️',
        description: '',
        durationMinutes: 60,
    };
}

// 새 커스텀 프리셋 생성
export function createCustomPreset(name: string, stages: FermentationStage[]): BreadPreset {
    return {
        id: `custom-${Date.now()}`,
        name,
        description: '나만의 발효 레시피',
        emoji: '⭐',
        stages,
        isCustom: true,
    };
}

export default defaultPresets;
