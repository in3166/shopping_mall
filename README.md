# shopping_mall

- 쇼핑몰 클론 코딩 프로젝트로 React, Express, MongoDB를 사용하여 구현하였습니다.

<br>

## 구현된 기능

- 회원 가입
- 로그인
- 상품 업로드(대표 이미지 설정, 제목, 내용, 가격 작성)
- 더보기 버튼 구현(state에 저장된 현재 가져온 상품 개수와 앞으로 가져올 개수를 계산해 서버에 MongoDB 쿼리 요청)

## 사용 기술

- React
- Redux
- Javascript
- MongoDB
- Express
- HTML5
- CSS

<br>

## 개선할 사항

- 회원의 개인 정보 수정 기능
- 카트에 추가할 수량 선택 기능
- 비밀번호 찾기 기능

<br><br>

## 에러 사항

- **화살표 함수 핸들러**

  - 첫 번째 경우 인수와 함께 `submitHandler`를 호출하는 함수를 만들고 해당 함수를 `onClick`에 할당합니다.
  - `onClick`에 매개변수가 필요할 경우 화살표 함수를 사용한다. (일반함수는 즉시 실행됨)

  - 두 번째 경우 (렌더링 단계 동안) 인수와 함께 `submitHandler`를 호출하고 반환 값을 `onClick`에 할당합니다. (즉시 실행, onClick 안기다림)
  - https://stackoverflow.com/questions/62930655/whats-the-difference-between-onclick-function-and-onclick-functi

```html
<button onClick={()=>props.submitHandler(searchInputValue)}>Submit</button>
```

```html
<button onClick="{props.submitHandler(searchInputValue)}">Submit</button>
```

<br><br>

## 사용 모듈

- `axios`
- `react-hook-form`: 회원가입, 로그인 form
- `React Router Dom`: 페이지 이동 시 사용
- `http-proxy-middleware`: proxy 사용
- `chart.js`: npm install --save chart.js@2.9.4 react-chartjs-2 (최신버전 사용 시 오류 발생)
- `react-highlight-words`

- `redux`
  - store에 state 변경을 하려면 dispatch(action)으로 하는데 `Action`은 plain object(객체 형식)
  - 그런데 store은 항상 객체 형식으로 받지 않고 'Promise'나 'function' 등의 형태로도 받음
- `react-redux`

- `redux-promise`: dispatch에게 `Promise`을 받는 방법을 알려주는 미들웨어
- `redux-thunk`: dispatch에게 `function`을 받는 방법을 알려주는 미들웨어

`cd C:/Users/yu/Desktop/study/react/inflearn/shopping_mall`
