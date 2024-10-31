import { useFetcher } from "@remix-run/react";
import { action } from "~/routes/_index";
import { TodoItem } from "~/type/todo";
import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedTodo: TodoItem;
  setEditingTodo: Dispatch<SetStateAction<TodoItem | null>>;
}

const EditTodoForm = ({ selectedTodo, setEditingTodo }: Props) => {
  const fetcher = useFetcher<typeof action>({ key: "todo" });

  return (
    <fetcher.Form method="put">
      <div>
        <input type="hidden" name="todoId" value={selectedTodo.id} />
        <input
          name="title"
          defaultValue={selectedTodo.title}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <textarea
          name="content"
          defaultValue={selectedTodo.content}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingTodo(null)}
            className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
};

export default EditTodoForm;
