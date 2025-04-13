// 챌린지 1 of 3: 고장난 시계를 고쳐보세요 
// 이 컴포넌트는 자정부터 아침 6시까지의 시간에는 <h1>의 CSS 클래스를 "night"로 설정하고 그 외에 시간에는 "day"로 설정하려고 합니다. 하지만 이건 동작하지 않습니다. 이 컴포넌트를 고칠 수 있나요?

// 컴퓨터의 시간대를 일시적으로 변경하여 정답이 동작하는지 확인할 수 있습니다. 현재 시간이 자정에서 아침 6시 사이이면 시계의 색상이 반전되어야 합니다!

export default function Clock({ time }) {
  let hours = time.getHours();
  let theme = (hours >= 0 && hours <= 6) ? 'night' : 'day';
  return (
    <h1 id="time" className={theme}>
      {time.toLocaleTimeString()}
    </h1>
  );
}


// 챌린지 2 of 3: 망가진 프로필을 고쳐보세요 
// 두 개의 Profile 컴포넌트 서로 다른 데이터로 나란히 렌더링됩니다. 첫 번째 프로필에서 “Collapse”를 누른 다음 “Expand”를 누릅니다. 이제 두 프로필에 동일한 사람이 표시됩니다. 이것은 버그입니다.

// 버그의 원인을 찾아서 고치세요.

import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

// let currentPerson;

export default function Profile({ person }) {
  // currentPerson = person;
  return (
    <Panel>
      <Header person={person}/>
      <Avatar person={person}/>
    </Panel>
  )
}

function Header({person}) {
  return <h1>{person.name}</h1>;
}

function Avatar({person}) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}

// 문제는 Profile 컴포넌트가 기존 변수인 currentPerson를 수정하고 Header 및 Avatar 컴포넌트가 이 변수를 읽는다는 점입니다. 이것은 세 가지 모두를 순수하지 않게 만들고 예측하기 어렵게 만듭니다.
// 버그를 수정하려면 currentPerson 변수를 제거하세요. 대신 Props를 통해 Profile의 모든 정보를 Header 및 Avatar로 전달하세요. 두 컴포넌트에 person 프로퍼티를 추가해서 끝까지 전달해야 합니다.
// React는 컴포넌트 함수가 특정 순서로 실행된다는 것을 보장하지 않기 때문에 변수를 설정해서 컴포넌트 함수간에 소통할 수 없습니다. 모든 소통은 프로퍼티를 통해 이루어져야 합니다.


// 챌린지 3 of 3: 깨진 StoryTray를 수리해보세요 
// 회사의 CEO가 온라인 시계 앱에 “stories”를 추가해 달라고 요청했는데 거절할 수 없는 상황입니다. “Create Story” 플레이스홀더 뒤에 stories 목록을 받는 StoryTray컴포넌트를 작성했습니다.

// 프로퍼티로 받는 stories 배열 끝에 가짜 story를 하나 더 추가해서 “Create Story” 플레이스홀더를 구현했습니다. 하지만 어떤 이유에서인지 “Create Story”는 한 번 이상 등장합니다. 이 문제를 해결해보세요.

export default function StoryTray({ stories }) {
  // const storyList = stories;
  // storyList.push({
  //   id: 'create',
  //   label: 'Create Story'
  // });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
      <li>Create Story</li>
    </ul>
  );
}

// 시계가 업데이트될 때마다 “Create story”가 두 번 추가됩니다. 이는 렌더링 중에 변경이 있음을 암시합니다. 엄격 모드는 컴포넌트를 두 번 호출하여 이러한 문제를 더 눈에 띄 만들도록 해줍니다.

// StoryTray 함수는 순수하지 않습니다. 전달된 stories 배열(Prop)에서 push를 호출하면 StroyTray가 렌더링을 시작하기 전에 객체를 변경합니다. 이로 인해 버그가 발생하고 예측하기가 매우 어렵습니다.

// 가장 간단한 해결 방법은 배열을 전혀 건드리지 않고 “Create Story”를 별도로 렌더링하는 것입니다.
// 또는 항목을 추가하기 전에 새로운 배열(기존 배열을 복사해서)을 생성할 수 있습니다.

export default function StoryTray({ stories }) {
  // Copy the array!
  let storiesToDisplay = stories.slice();

  // Does not affect the original array:
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}

// 이 코드는 지역 변경으로 유지하고 렌더링 함수를 순수하게 만듭니다. 그러나 여전히 조심해야 합니다. 예를 들어 배열의 기존 항목을 변경하려고 하면 해당 항목도 복사해야 합니다.

// 배열에서 어떤 연산이 변경을 일으키는지, 어떤 작업이 그렇지 않은지를 기억하는 것이 유용합니다. 예를 들어 push, pop, reverse, sort는 기존 배열을 변경하지만 slice, filter, map은 새로운 배열을 만듭니다.