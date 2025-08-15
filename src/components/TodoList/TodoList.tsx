import { TodoInfo } from '../TodoInfo/TodoInfo';
//@ts-ignore
export const TodoList = ({ dataFromServer }) => {
  return (
    <section className="TodoList">
      {dataFromServer.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
