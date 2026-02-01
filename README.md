# 🍞 빵 발효 타이머

빵 반죽의 발효 과정을 단계별로 관리하는 웹 애플리케이션입니다.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)

## ✨ 주요 기능

### 🕐 다단계 타이머
- 1차 발효 → 휴지 → 성형 → 2차 발효 등 순차 진행
- 단계별 진행 상황 시각적 표시
- 일시정지/재개, 단계 건너뛰기 지원

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

### 🔔 알림
- 단계 완료 시 비프음 + 브라우저 알림

## 🚀 시작하기

### 설치
```bash
git clone https://github.com/your-repo/fermentation-timer.git
cd fermentation-timer
npm install
```

### 개발 서버
```bash
npm run dev
```
http://localhost:5173 에서 확인

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
│   ├── CustomSelect/    # 테마 드롭다운 컴포넌트
│   └── StageProgress/   # 단계 진행 표시
├── hooks/
│   ├── useTimer.ts          # 다단계 타이머 로직
│   └── useCustomPresets.ts  # 커스텀 프리셋 관리
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
- **Styling**: CSS Variables, Glassmorphism
- **Storage**: localStorage

## 📝 라이선스

MIT License
