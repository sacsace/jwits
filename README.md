# JWITS Engineering Website

기아자동차를 주요 고객으로 하는 엔지니어링 회사 **JWITS** 홍보 웹사이트입니다.

## 실행

```bash
npm install
npm run dev
```

- 공개 사이트: [http://localhost:3600/ko](http://localhost:3600/ko)
- 관리자: [http://localhost:3600/admin](http://localhost:3600/admin)

언어: `/ko` `/en` `/zh` `/ja`

## 관리자 계정

`.env.local` 기준 기본값:

- 아이디: `admin`
- 비밀번호: `jwits2026!`

로그인 후 **계정 설정** 메뉴에서 비밀번호를 변경할 수 있습니다.
변경된 비밀번호는 `data/admin.json`에 해시로 저장됩니다.

## 기능

### 공개 사이트
- 홈, 회사소개, 사업영역, 실적, 뉴스, 문의

### 관리자
- 사이트 콘텐츠(회사정보/히어로/미션·비전) 수정
- 뉴스·실적 CRUD
- 문의 접수 확인 및 상태 관리

데이터는 `data/store.json`에 저장됩니다.
