// 챌린지 1 of 1: 신호등 구현하기 
// 다음은 버튼을 누르면 토글되는 신호등 컴포넌트입니다.
// 클릭 핸들러에 alert를 추가하세요. 신호등이 녹색이고 “걷기”라고 표시되면 버튼을 클릭하면 “다음은 정지입니다”라고 표시되어야 합니다. 신호등이 빨간색이고 “중지”라고 표시되면 버튼을 클릭하면 “다음은 걷기입니다”라고 표시되어야 합니다.

// alert를 setWalk 호출 전이나 후에 넣는 것이 차이가 있을까요?

import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);
  let msg = walk ? "다음은 걷기입니다" : "다음은 정지입니다" ;

  function handleClick() {
    setWalk(!walk);
    setTimeout(()=>{
      alert(msg)
    },2000);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}

// Answer.
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Stop is next' : 'Walk is next');
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}


// setWalk 호출 앞에 넣든, 뒤에 넣든 아무런 차이가 없습니다. 해당 렌더링의 walk 값은 고정되어 있습니다. setWalk를 호출하면 다음 렌더링에 대해서만 변경되고, 이전 렌더링의 이벤트 핸들러에는 영향을 미치지 않습니다.

// 이 라인은 처음에는 직관적이지 않게 보일 수 있습니다.

// alert(walk ? 'Stop is next' : 'Walk is next');
// 하지만 이렇게 읽으면 이해가 될 것입니다. “신호등에 ‘Walk now’가 표시되면, 메시지에 ‘Stop is next.‘라고, 표시되어야 합니다.” 이벤트 핸들러 내부의 walk 변수는 해당 렌더링의 값인 walk와 일치하며 변경되지 않습니다.

// 대체 메서드를 적용하여 이것이 올바른지 확인할 수 있습니다. walk가 true이면 다음과 같은 결과를 얻습니다.

// <button onClick={() => {
//   setWalk(false);
//   alert('Stop is next');
// }}>
//   Change to Stop
// </button>
// <h1 style={{color: 'darkgreen'}}>
//   Walk
// </h1>
// 따라서 “Change to Stop”을 클릭하면 walk가 false로 설정된 렌더링이 대기열에 추가되고 “Stop is next”라는 경고가 표시됩니다.



// 챌린지 3 of 4: 충돌 고치기 
// 사용자가 피드백을 남길 수 있는 간단한 폼이 있는데, 피드백을 제출하면 감사 메시지가 표시되어야 합니다. 그러나 “예상보다 적은 훅을 렌더링했습니다”라는 오류 메시지와 함께 충돌이 발생합니다. 실수를 발견하고 고칠 수 있나요?

import { useState } from 'react';

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if(isSent) return (<h1>Thank you!</h1>);
return (
  <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }

// Answer.
// 훅은 컴포넌트 함수의 최상위 수준에서만 호출할 수 있습니다. 여기서 첫 번째 isSent 정의는 이 규칙을 따르지만 message 정의는 조건문 내에 중첩되어 있습니다.

// 문제를 해결하려면 조건문 밖으로 옮기세요.
// 훅은 무조건 항상 동일한 순서로 호출되어야 한다는 것을 기억하세요!

// 또한 중첩을 줄이기 위해 불필요한 else 분기를 제거할 수도 있습니다. 그러나 여전히 모든 훅 호출이 첫 번째 return 이전에 발생하는 것이 중요합니다.

import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert(`Sending: "${message}"`);
      setIsSent(true);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}


// 챌린지 4 of 4: 불필요한 state 제거하기 
// 이 예시에서 버튼이 클릭 되면 사용자의 이름을 요청하고 그런 다음 환영 메시지를 표시해야 합니다. 이름을 유지하기 위해 state를 사용하려고 했지만, 어떤 이유로 항상 “Hello, !”라고 표시됩니다.

// When the button is clicked, this example should ask for the user’s name and then display an alert greeting them. You tried to use state to keep the name, but for some reason the first time it shows “Hello, !”, and then “Hello, [name]!” with the previous input every time after.

// 이 코드를 수정하려면 불필요한 state 변수를 제거하세요. (왜 이것이 작동하지 않는지에 대해서는 나중에 설명하겠습니다.)

// 이 state 변수가 불필요한 이유를 설명할 수 있을까요?

// import { useState } from 'react';

export default function FeedbackForm() {
  // const [name, setName] = useState('');

  function handleClick() {
    let name = prompt('What is your name?');
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}

// -> 해당 변수는 렌더링 후에도 유지되어야 하는 변수가 아니라 일회성으로 사용되는 변수이므로 state 변수로 사용할 필요가 없다.
// -> setState로 state를 변경해도 렌더링 후에 업데이트 되므로 alert에 표시되는 state변수는 이전 스냅샷에서 저장된 상태를 사용하기 때문에 현재 시점의 변경을 반영할 수 없다.



// Answer.
// 다음은 필요한 곳에서 선언된 일반적인 name 변수를 사용하는 수정된 버전입니다.
// 컴포넌트가 다시 렌더링 될 때만 정보를 유지하기 위해 state 변수가 필요합니다. 단일 이벤트 핸들러 내에서는 일반 변수가 잘 작동합니다. 일반 변수가 잘 동작할 때 state 변수를 도입하지 마세요

export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('What is your name?');
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}