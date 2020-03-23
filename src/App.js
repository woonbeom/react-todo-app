import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  // 여러 종류의 값을 전달해야 하는 경우에는 객체로 한 번에 넘기는게 성능 최적화 면에서 좋다.
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  // Todo를 생성할 때 부여되는 고유 id.
  // useRef로 id 값을 생성한 이유 : useRef로 생성한 변수는 값이 변화해도 리렌더링 되지 않기 때문.
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current, // todo id 값의 변화에 따라 리렌더링이 불필요. 화면에 보이지 않기 때문.
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; // next id 갱신.
    },
    [todos], // 이전 값을 참조해야할 일이 있으면 꼭 useCallback 파라미터 배열에 값을 넣어주어야 함.
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;
