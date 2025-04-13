// 챌린지 1 of 4: 리스트를 둘로 나누기 
// 예시는 모든 사람의 리스트를 보여줍니다.
// 두 개의 개별 리스트 Chemists와 Everyone Else을 차례로 표시하도록 변경하세요. 이전과 마찬가지로 person.profession === 'chemist'를 확인하여 어떤 사람이 chemist인지 확인할 수 있습니다.

import { people } from './data.js';
import { getImageUrl } from './utils.js';

function itemList (people) {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );

  return listItems;
}

export default function List() {
  const chemists = [];
  const everyoneElse = [];
  people.filter(person => {
      if(person.profession === 'chemist') return chemists.push(person);
      else return everyoneElse.push(person);
    }
  ); 
  
  return (
    <article>
      <h1>chemists</h1>
      <ul>{itemList(chemists)}</ul>
      <h1>Everyone Else</h1>
      <ul>{itemList(people)}</ul>
    </article>
  );
}


// answer : ListSection 컴포넌트로 분리하기
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}


// 챌린지 2 of 4: 하나의 컴포넌트에 중첩된 리스트 
// 이 배열에서 레시피 리스트를 만들어 보세요! 배열의 각 레시피에 대해 이름을 <h2>로 표시하고 재료를 <ul>에 나열합니다.

import { recipes } from './data.js';

function RecipeItem({recipe}) {
  const ingredient = recipe.ingredients.map(v=><li key={v}>{v}</li>);
  return (
    <>
      <h2>{recipe.name}</h2>
      <ul>
        {ingredient}
      </ul>
    </>
  )
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe=><RecipeItem key={recipe.id} recipe={recipe}/>)}
    </div>
  );
}


// Answer
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// 챌린지 3 of 4: 리스트 항목 컴포넌트 추출하기 
// RecipeList 컴포넌트에는 두 개의 중첩된 map 호출이 포함되어 있습니다. 이를 단순화하기 위해 id, name, ingredients props를 허용하는 Recipe 컴포넌트를 추출합니다. 외부 key를 어디에 위치하고 그 이유는 무엇일까요?

// Answer
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}

// 챌린지 4 of 4: 구분 기호가 있는 리스트 
// 이 예시는 Tachibana Hokushi 의 유명한 하이쿠(일본의 정형시)를 렌더링하며, 각 행은 <p> 태그로 래핑되어 있습니다. 여러분이 해야 할 일은 각 단락 사이에 <hr /> 구분 기호를 삽입하는 것입니다. 결과 구조는 다음과 같아야 합니다.

import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>(
        <Fragment key={index}>
          <p>
            {line}
          </p>
          {(index !== poem.lines.length-1) ? <hr /> : ''}
        </Fragment>
      ))}
    </article>
  );
}


// Answer
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // 출력할 배열을 작성합니다.
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // 첫 번째 <hr />을 삭제합니다.
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}
