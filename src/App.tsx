import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

interface ITodos {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App = () => {
  const visibleData = preperedData(usersFromServer, todosFromServer);
  const [dataFromServer, setDataFromServer] =
    useState<ITodos[]>(todosFromServer);
  // console.log('todosFromServer', todosFromServer);
  // console.log('dataFromServer', dataFromServer);
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedUserError, setSelectedUserError] = useState<boolean>(false);
  const [] = useState();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setSelectedUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);

      // return;
    }

    if (selectedUser === '0') {
      setSelectedUserError(true);
    }

    setDataFromServer(prevTodos => {
      return [
        ...prevTodos,
        {
          id: Math.max(...prevTodos.map(todo => todo.id)) + 1,
          title: title,
          completed: false,
          userId: +selectedUser,
          user: usersFromServer.find(x => x.id === +selectedUser),
        },
      ];
    });
  };

  function preperedData(users: User[], todos: Todo[]): UserWithTodos[] {
    const unionData = todos.map((todo: Todo) => {
      return {
        user: users.find((user: User) => todo.userId === user.id)!,
        title: todo.title,
        todoId: todo.id,
        completed: todo.completed,
      };
    });

    return unionData;
  }

  //action="/api/todos" method="POST"
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList dataFromServer={dataFromServer} />
    </div>
  );
};
