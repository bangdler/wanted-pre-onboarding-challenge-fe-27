import { TodoItem } from "~/type/todo";
import { Dispatch, SetStateAction } from "react";
import EditTodoForm from "./EditTodoForm";

interface Props {
  selectedTodo: TodoItem | null;
  editingTodo: TodoItem | null;
  setEditingTodo: Dispatch<SetStateAction<TodoItem | null>>;
}

const TodoDetails = ({ selectedTodo, editingTodo, setEditingTodo }: Props) => {
  return (
    <div className="w-2/3">
      <div className="flex justify-between items-center flex-grow mb-4">
        <h2 className="text-2xl font-bold ">Todo Details</h2>
        <button
          onClick={() => setEditingTodo(selectedTodo)}
          className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
        >
          Edit
        </button>
      </div>
      {selectedTodo ? (
        editingTodo ? (
          <EditTodoForm
            selectedTodo={selectedTodo}
            setEditingTodo={setEditingTodo}
          />
        ) : (
          <div>
            <h3 className="text-xl font-semibold">{selectedTodo.title}</h3>
            <p className="mt-2 text-gray-600">{selectedTodo.content}</p>
          </div>
        )
      ) : (
        <p className="text-gray-500">Click on a todo item to view details</p>
      )}
    </div>
  );
};

export default TodoDetails;
