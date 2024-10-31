import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_index";
import AddTodoForm from "./AddTodoForm";
import { TodoItem } from "~/type/todo";
import { Dispatch, SetStateAction } from "react";
import DeleteTodoForm from "./DeleteTodoForm";

interface Props {
  selectedTodo: TodoItem | null;
  setSelectedTodo: Dispatch<SetStateAction<TodoItem | null>>;
}

const TodoList = ({ selectedTodo, setSelectedTodo }: Props) => {
  const loaderRes = useLoaderData<typeof loader>();
  const isLoadError = loaderRes.errors;

  return (
    <div className="w-1/2 border-r pr-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <AddTodoForm />
      {isLoadError ? (
        <p className="text-gray-500">fetch failed </p>
      ) : (
        <ul>
          {(loaderRes.data as TodoItem[]).map((todo) => (
            <li
              key={todo.id}
              className={`p-2 mb-2 cursor-pointer hover:bg-gray-200 rounded flex justify-between items-center ${
                selectedTodo?.id === todo.id ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center flex-grow">
                <span
                  className="flex-grow"
                  onClick={() => setSelectedTodo(todo)}
                >
                  {todo.title}
                </span>
                <DeleteTodoForm id={todo.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
