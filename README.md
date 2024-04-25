# 서울식당

<br>

## 배포

- <a href="https://seoul-restaurant.vercel.app/" target="_blank">https://seoul-restaurant.vercel.app/</a>

<br /><br />

## 기술 스택

- Next.js
- TypeScript
- Tanstack/React Query
- Zustand
- Tailwind CSS
- Prisma
- Supabase

<br /><br />

## 주요 기능

- Next-Auth 사용자 인증
- NextScript 사용하여 카카오 지도 로드
- TM 좌표를 WGS 좌표로 변환하여 카카오 지도 커스텀 마커 로드
- 디바운스를 통해 검색 API 요청 최적화
- 식당 목록 페이지 무한 스크롤 구현
- 식당 등록, 수정, 삭제
- 식당 이름 또는 지역을 기준으로 식당, 찜한 식당 검색
- 식당 찜하기 및 찜취소
- SEO 최적화, 접근성 개선

<br /><br />

## 세부 기능

- 개발 시점(next dev)에서는 타입 에러가 발생하지 않는 코드이지만, 빌드 시점(next build)에서는 타입 에러가 발생하는 코드가 있음을 알게 되었으며, 이는 Next.js 9.4 버전 이후 fast refresh 기능으로 type-checking 되지 않기 때문이었고 이는 [Next.js 이슈](https://github.com/vercel/next.js/issues/14997)에서 확인할 수 있습니다. type-checking을 위해 아래의 scripts를 추가하여 개발 시점(next dev)에서도 타입 체크를 할 수 있게 되었습니다. [참고](https://github.com/vercel/next.js/issues/14997#issuecomment-950403623)

  ```json
  {
    "scripts": {
      "dev": "next dev",
      "dev-ts": "concurrently -n NEXT,TS -c magenta,cyan \"next dev -p 1234\" \"yarn ts --watch\"",
      "ts": "tsc --noEmit --incremental --watch"
    }
  }
  ```

- 식당 검색을 위해 입력값이 업데이트되는 즉시 API 요청을 하지 않고, 디바운스 커스텀 훅을 사용해 API 요청을 최적화하였습니다.

  ```ts
  const useDebounce = (value: string, delay: number = 500) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
  };
  ```

- URLSearchParams 값으로 `/api/restaurants?q=undefined&district=undefined` 처럼 undefined가 입력되는 이슈가 있었습니다. 아래와 같이 objectToParams 함수를 사용하여 `value !== undefined` URLSearchParams 객체를 생성하는 방식을 사용했었으나, qs 라이브러리를 통해 쉽게 Nullish 값을 제거할 수 있음을 알게 되어 가독성과 복잡성을 위해 qs 라이브러리를 채택하였습니다.

  ```ts
  const objectToParams = (object: Object): URLSearchParams => {
    const searchParams = new URLSearchParams();
    Object.entries(object).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString());
    });
    return searchParams;
  };
  ```

  ```ts
    import qs from 'qs';
    const queryParams = qs.stringify(fullParams, { skipNulls: true }
  ```

- Prisma와 Supabase를 연동하여 데이터베이스 모델링과 마이그레이션을 진행하였습니다.
- Next-Auth의 OAuth를 사용하여 Google, Naver, Kakao 계정으로 로그인, 로그아웃 및 사용자 인증을 처리하였습니다.

<br /><br />

## 폴더 구조

```
── app
    ├─ (feature)
    │  ├─ _components
    │  ├─ _constants
    │  ├─ _db
    │  ├─ _hooks
    │  ├─ _lib
    │  ├─ _model
    │  ├─ _store
    │  └─ _types
    ├─ (route)
    │  ├─ restaurant
    │  ├─ restaurants
    │  └─ user
    └─ api
        ├─ auth
        ├─ likes
        ├─ restaurant
        ├─ restaurants
        └─ user
```

- app

  - (feature) : 기능 라우트 그룹
    - \_components : 컴포넌트
    - \_constants : 상수
    - \_db : prisma
    - \_hooks: 커스텀훅
    - \_lib : 유틸 공용 함수
    - \_model : 모델 타입 정의
    - \_store : 상태 관리
    - \_types : 커스텀 타입 정의
  - (route) : 페이지 라우트 그룹

<br /><br />

## 세부 개발 환경

```json
"dependencies": {
  "@auth/prisma-adapter": "^1.5.0",
  "@prisma/client": "^5.11.0",
  "@tanstack/react-query": "^5.26.3",
  "@tanstack/react-query-devtools": "^5.27.0",
  "next": "14.1.3",
  "next-auth": "^4.24.7",
  "proj4": "^2.10.0",
  "qs": "^6.12.1",
  "react": "^18",
  "react-daum-postcode": "^3.1.3",
  "react-dom": "^18",
  "react-hook-form": "^7.51.3",
  "react-icons": "^5.0.1",
  "react-toastify": "^10.0.5",
  "zustand": "^4.5.2"
},
"devDependencies": {
  "@types/node": "^20",
  "@types/proj4": "^2.5.5",
  "@types/qs": "^6.9.14",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "autoprefixer": "^10.0.1",
  "eslint": "^8",
  "eslint-config-next": "14.1.3",
  "postcss": "^8",
  "prisma": "^5.10.2",
  "tailwindcss": "^3.3.0",
  "typescript": "^5"
}
```
