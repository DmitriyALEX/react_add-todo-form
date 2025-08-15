import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ dataFromServer }) => {
  console.log('dataFromServer', dataFromServer);
  return (
    <section className="TodoList">
      {dataFromServer.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
