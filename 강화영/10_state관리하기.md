# State 사용해 Input 다루기

## 선언형 ui와 명령형 ui 비교

- 명령형 ui (바닐라 자바스크립트)
    - ui가 **어떻게 작동**하는지를 설명 → ui를 각각 수동으로 업데이트한다
- 선언형 ui (리액트)
    - **상태에 따라** ui가 변경되도록 → 복잡한 조건도 state에 따라 일관되게 유지 가능

## UI를 선언적인 방식으로 생각하기

### 1. 컴포넌트의 state 구분하기(시각화)

사용자가 볼 수 있는 ui의 모든 상태를 정의하고 각각의 상태를 시각화한다

| 설명 | state |
| --- | --- |
| 비활성화된 제출 버튼이 있음 | empty |
| 활성화된 제출 버튼이 있음 | typing |
| 폼이 비활성화되고 스피너 렌더링 됨 | submitting |
| 폼 대신 감사합니다 메세지 렌더링 됨 | success |
| 오류메세지 렌더링 됨 | error |

### 2. state 변화 트리거 확인하기

- human inputs : 버튼 클릭, 필드 입력, 링크 이동 등
- computer inputs : 네트워크 응답, 타임아웃, 이미지 로딩 등

→ 어떤 입력이나 이벤트가 상태를 바꾸는지 정의하기

![responding_to_input_flow.webp](attachment:8cd181f7-cf2d-41ba-b0c5-a3a44d2e749c:responding_to_input_flow.webp)

### 3. state를 useState로 표현하기

```tsx
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

### 4. 불필요한 state 변수 제거하기

- state가 역설을 일으키지 않는지? = 동시에 true가 함께할 수 없는 상태가 있는 경우
- 다른 state 변수에 이미 같은 정보가 담겨있지 않은지? = 다른 값으로 계산이 가능한 경우
- 다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있는지?

```tsx
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```


❓ 솔직히 공식 문서의 방법보다 ui를 먼저 보고 그에 맞는 state를 직관적으로 떠올리는 방식이 더 실용적인데 왜 이렇게 하는 건가?
-> 상태 간 모순이나 중복 가능성을 미리 방지하기 위해 (규모가 커질수록 서로 엇갈릴 가능성이 높다)


- reducer를 이용해 불가능한 state 제거(status가 success일때 error는 !null이 될 수 없음)
    - → 리듀서를 사용하여 state변수를 하나의 객체로 통합하고 그것을 더 큰 상태로 만들어 모순을 없앨 수 있음

### 5. 이벤트 핸들러에 state 변경함수 연결하기
<br>
<br>

# State 구조 선택하기

## State 구조화 원칙

1. **연관된 state 그룹화하기**
    
    두 개 이상의 state 변수를 **항상 동시에 업데이트** 할 경우 단일 state로 병합하기(객체화)
    
2. **state의 모순 피하기** ex) 시간에 따른 요청의 경우(`typing` - `sending` - `sent`)
3. **불필요한 state피하기**
    
    props나 state에서 계산할 수 있는 정보라면 state로 만들 필요 없다
    
    - props를 state의 초기값에 넣지 말 것(미러링)
        
        ```jsx
        function Message({ messageColor }) {
          const [color, setColor] = useState(messageColor);
          // messageColor가 변경되더라도 state 변수는 업데이트 되지 않는다
          // ✅ state는 첫번째 렌더링에서만 초기화된다
        ```
        
        - props를 미러링하는 것은 *props에 대한 업데이트를 무시하길 원할때*만 의미가 있다
4. **state의 중복 피하기**
    
    여러 상태의 변수 간 또는 중첩된 객체 내에서 동일한 데이터가 중복될 경우 동기화를 유지하기 어렵다
    
    - **`객체** 배열의 state`와 `해당 state의 요소 중 하나를 가지는 state`가 있는 경우, 두 state 중 하나의 속성값을 편집할 때 다른 요소에는 반영되지 않는다. 객체 전체를 state로 설정하기 보다 `변하지 않는 값으로 state를 설정`하여 **객체 배열 state에서 다른 속성 요소를 가져올 수 있도록** 한다.
5. **깊게 중첩된 state 피하기** → state를 평탄하게 만들기 - 트리구조가 아닌 *자식 장소의 id 배열을 가지는 객체*
<br>
<br>

# 컴포넌트 간 State 공유하기

## state 끌어올리기

- 자식 컴포넌트에 각각 동일한 state가 있으면 그건 서로에게 영향을 미치지 않는다. (지역 state) → 비제어 컴포넌트
- 이 state를 공유하고 싶다면, 자식의 공통된 부모컴포넌트에 state를 정의하고 props로 내려준다 → 제어 컴포넌트
- 컴포넌트를 작성할 때 어떤 정보가 props를 통해 제어되어야 하고 어떤 정보가 state를 통해 제어되지 않아야 하는지 고려해야 한다.

## 각 state의 단일 진리의 원칙(Single Source of Truth)

- 어떤 데이터가 있다면, **그 데이터는 오직 하나의 컴포넌트에서만 관리해야 한다**는 원칙
- 똑같은 정보를 여러 컴포넌트가 각각 state로 가지고 있으면 정보 불일치가 일어날 수 있다 → 모든 컴포넌트의 공통 부모가 그 state를 관리하도록 하기 → 필요한 정보는 props로 넘겨주기
<br>
<br>

# State를 보존하고 초기화하기

- React는 같은 컴포넌트가 같은 자리에 렌더링되는 한 state를 유지합니다.
- state는 JSX 태그에 저장되지 않습니다. state는 JSX으로 만든 트리 위치와 연관됩니다.
- 컴포넌트에 다른 key를 주어서 그 하위 트리를 초기화하도록 강제할 수 있습니다.
- 중첩해서 컴포넌트를 정의하면 원치 않게 state가 초기화될 수 있기 때문에 그렇게 하지 마세요.
