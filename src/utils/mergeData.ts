import { ITodos, IUsers } from '../components/types/data';

export const mergeData = (users: IUsers, todos: ITodos[]) => {
  todos.map(todo => {
    return {
      id: Math.max(todos.map(todo => todo.id)) + 1,
      title: title,
      completed: false,
      userId: +selectedUser,
      user: users.find(x => x.id === +selectedUser),
    };
  });
};
