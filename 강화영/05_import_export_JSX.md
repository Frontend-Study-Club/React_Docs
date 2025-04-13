- 컴포넌트의 가장 큰 장점은 **재사용성**이다. 각 컴포넌트 별로 **파일을 분리**하면 재사용성이 높아진다.
- root 컴포넌트 : `App.jsx` → 어플리케이션의 최상위 컴포넌트
- import/export 방식은 named와 default가 있다.

```jsx
// named export : 여러 컴포넌트를 내보내고 싶을 때 사용
export function Name() { }

// default export : 파일 하나에 한 default export만 올 수 있다
export default function Age() { }

// named import : 가져올 때는 지정된 컴포넌트 이름 그대로 가져와야한다
import { Name } from './Name.jsx';

// default import : 가져올 때 컴포넌트 이름을 바꿀 수 있다
import Test from './Age';
```

- 이름없는 컴포넌트는 디버깅하기 어렵다 ex) `export default () ⇒ {}`
---

- `JSX`는 **자바스크립트 확장문법**이다. 웹이 인터랙티브해지면서 로직(js)이 내용(html)을 결정하는데, 자바스크립트가 html을 담당하게 되는 것.
- 리액트의 컴포넌트에서는 **랜더링 로직**과 **마크업**이 그룹화되어있다.
- JSX는 빈태그(Fragment) 사용가능
- JSX는 왜 하나로 감싸줘야할까?
    - JSX는 HTML처럼 보이지만 내부적으로는 자바스크립트 객체로 변환된다. **하나로 감싸지 않은 JSX는 한 함수에서 여러 객체를 반환**하는 것과 같다. 그래서 한 함수에서 하나의 객체를 반환하기 위해 하나의 태그로 감싼다.
