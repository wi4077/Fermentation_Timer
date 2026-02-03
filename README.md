# 🍞 빵 발효 타이머

빵 반죽의 발효 과정을 단계별로 관리하는 웹 애플리케이션입니다.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Push-3FCF8E?logo=supabase)

## 🌐 라이브 데모

**[https://wi4077.github.io/Fermentation_Timer/](https://wi4077.github.io/Fermentation_Timer/)**

## ✨ 주요 기능

### 🕐 다단계 타이머
- 1차 발효 → 휴지 → 성형 → 2차 발효 등 순차 진행
- 단계별 진행 상황 시각적 표시
- 일시정지/재개, 단계 건너뛰기 지원

### 🔔 푸시 알림 (PWA)
- **로컬 알림**: 앱이 열려있을 때 멜로디 + 브라우저 알림
- **백그라운드 알림**: 앱이 닫혀도 푸시 알림 수신 (최대 1분 지연)
- 알림 클릭 시 앱으로 바로 이동
- Supabase Edge Function + Cron-job.org 활용

### 🥖 15종 빵 프리셋
| 카테고리 | 빵 종류 |
|----------|---------| 
| 기본 | 식빵, 바게트, 치아바타, 포카치아 |
| 달콤한 빵 | 브리오슈, 우유식빵, 할라 |
| 페이스트리 | 크루아상, 데니쉬 |
| 특수 | 사워도우(장시간/단축), 캉파뉴, 베이글, 프레첼, 피자 도우 |

### ⭐ 커스텀 프리셋
- 나만의 발효 레시피 저장
- 단계 추가/삭제/수정
- localStorage에 자동 저장

## 🚀 시작하기

### 설치
```bash
git clone https://github.com/wi4077/Fermentation_Timer.git
cd Fermentation_Timer
npm install
```

### 환경 변수 설정
`.env` 파일 생성:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key
```

### 개발 서버
```bash
npm run dev
```
http://localhost:5173/Fermentation_Timer/ 에서 확인

### 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Timer/           # 타이머 표시 및 컨트롤
│   ├── BreadSelector/   # 빵 프리셋 선택
│   ├── PresetEditor/    # 커스텀 프리셋 에디터
│   └── StageProgress/   # 단계 진행 표시
├── hooks/
│   ├── useTimer.ts          # 다단계 타이머 로직
│   ├── useCustomPresets.ts  # 커스텀 프리셋 관리
│   └── usePushNotification.ts  # 푸시 알림 훅
├── lib/
│   └── supabase.ts          # Supabase 클라이언트
├── data/
│   └── presets.ts           # 빵 프리셋 데이터
└── App.tsx
```

## 🎨 디자인

- **테마**: 따뜻한 베이커리 컬러 (브라운/골드)
- **스타일**: 글래스모피즘 카드 UI
- **반응형**: 모바일/데스크톱 지원

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **Build**: Vite 7
- **Backend**: Supabase (Edge Functions, Database)
- **Styling**: CSS Variables, Glassmorphism
- **Storage**: localStorage, Supabase DB
- **Push**: Web Push API, Service Worker

## 📝 라이선스

MIT License
