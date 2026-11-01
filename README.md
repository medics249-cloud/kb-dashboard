# KB 주간 아파트 대시보드

KB부동산 주간 시계열(매매·전세 증감률, 매수우위지수)을 지도·그래프로 보는 정적 웹페이지입니다.
GitHub Pages로 무료 배포되고, PC·핸드폰 어디서나 같은 주소로 열립니다.

## 매주 업데이트
1. KB부동산에서 주간 아파트 시계열 엑셀을 받습니다.
2. 이 저장소의 `kb` 폴더 → **Add file → Upload files** 로 올리고 **Commit changes** 를 누릅니다.
3. 2~3분 뒤 사이트를 새로고침하면 반영돼 있어요. 진행 상황은 **Actions** 탭에서 볼 수 있어요.

## 구성
- `index.html` — 대시보드 화면
- `data/data.json` — 누적 데이터 (자동 갱신)
- `lib/parser.js` — KB 엑셀 해석 코드 (화면과 자동 갱신이 같이 씀)
- `scripts/update.mjs` — kb 폴더의 엑셀을 data.json에 합치는 스크립트
- `.github/workflows/deploy.yml` — 업로드 시 자동 실행·배포

지도 경계: 통계청 경계 기반 [vuski/admdongkor](https://github.com/vuski/admdongkor)
