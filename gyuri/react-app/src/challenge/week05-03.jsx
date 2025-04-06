// 챌린지 1 of 3: ? :를 사용하여 완료되지 않은 항목의 아이콘을 표시합니다. 
// isPacked가 true가 아닌 경우 조건부 연산자(cond ? a : b)를 사용하여 ❌를 렌더링합니다.

function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✅' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}

// 챌린지 2 of 3: 항목의 중요한 정도를 &&로 표시합니다. 
// 이 예시에서 각 Item은 숫자 타입인 importance를 props로 받습니다. && 연산자를 사용하여 “(Importance: X)“를 이탤릭체로 렌더링하되 난이도가 0이 아닌 항목만 렌더링합니다. 항목 목록은 다음과 같이 표시합니다.

// Space suit (Importance: 9)
// Helmet with a golden leaf
// Photo of Tam (Importance: 6)
// 두 레이블 사이에 공백을 추가하는 것을 잊지 마세요!

function Item({ name, importance }) {
  return (
    <li className="item">
      {name} {importance > 0 && <i>(Importance: {importance})</i>}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          importance={9}
          name="Space suit"
        />
        <Item
          importance={0}
          name="Helmet with a golden leaf"
        />
        <Item
          importance={6}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}


// 챌린지 3 of 3: 변수와 일련의 ? :를 if로 리팩토링합니다. 
// Drink 컴포넌트는 일련의 ? : 조건을 사용하여 name props가 tea인지 coffee인지에 따라 다른 정보를 표시합니다. 문제는 각 음료에 대한 정보가 여러 가지 조건에 걸쳐 퍼져 있다는 것입니다. 세 가지 ? : 조건 대신 하나의 if 문을 사용하도록 이 코드를 리팩토링하세요.

function Drink({ name }) {
  let part, caffeine, age;
  if(name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if(name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}


// Answer, 정보를 객체로 이동하여 조건을 완전히 제거
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
