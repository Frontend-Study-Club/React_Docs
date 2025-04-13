## JSX에서 자바스크립트 사용하기

- JSX에서는 중괄호`{ }`로 자바스크립트를 사용할 수 있다.
    - JSX 태그 안의 문자 `<h1>{name}'s To Do List</h1>`
    - 함수 호출  `<h1>To Do List for {formatDate(today)}</h1>`
    - 어트리뷰트에 값 전달 `<img src={avatar} / >`
        - 백틱으로 문자열을 전달할 때도 중괄호 사용 
        `<img src={`${baseUrl}image.jpg`} />`
    - 인라인 CSS 스타일 `style={{ backgroundColor: 'black', color: 'pink' }}`

## Props

- 리액트에서는 부모 컴포넌트에서 자식 컴포넌트에게 **`props`를 통해 정보를 전달**한다. props로 정보를 전달할 때는 props라는 **객체** 안의 **속성**으로 전달된다. 자식 컴포넌트에서는 **구조 분해 할당**으로 해당 정보를 바로 받을 수 있다.
    
    ```jsx
    const Child = ({ name, age }) => {
    // (props)로 받고 {props.name}로 받을 수도 있다
      return (
        <div>
          <h1>이름: {name} / 나이: {age}</h1>
        </div>
      )
    }
    
    const Parent = () => {
      return (
        <Child name='kim' age={20} />
      )
    }
    ```
    
- 컴포넌트의 prop에 값을 전달해주지 않으면 설정한 **props** **기본값**이 사용된다
    
    ```jsx
    const Child = ({ name, age = 30 }) => {
      // ...
    }
    ```
    
- props는 **스프레드 문법**을 사용하여 전달 할 수 있다.
    
    ```jsx
    const Child = (props) => {
      return (
        <Profile {...props} />
      )
    }
    ```
    
- JSX 태그 내에 **콘텐츠를 중첩**하면, 부모 컴포넌트는 내부 콘텐츠를 **children 이라는 프롭스**로 받아 렌더링한다.
    
    ```jsx
    function Card({ children }) {
      return (
        <div>
          {children}
        </div>
      );
    }
    
    function Contents() {
      return (
        <Card>
          <Child name='kim' age={20} />  // Child 컴포넌트는 Card 컴포넌트 내부에서 렌더링 된다.
        </Card>
      )
    }
    ```
    
- props의 변경 - `props는 '변경할 수 없다'라는 의미의 불변성을 가지고 있습니다.`
  이 불변성은 **자식 컴포넌트 내부에서는 직접 수정할 수 없다**는 의미이다. prop가 변경될 수 있는 건 **부모 컴포넌트에서 새로운 값으로 내려주는 경우 변경될 수 있다** ex) 유저와의 상호작용, 새로운 데이터 응답
