import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getTodo } from "~/api/todo";
import { TodoItem } from "~/type/todo";
import { parseCookies } from "~/utils/parseCookies";

export const meta: MetaFunction = () => {
  return [{ title: "To Do List" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const { token } = parseCookies(cookieHeader);
  const res = await getTodo(token);

  return res;
}

export default function Index() {
  const res = useLoaderData<typeof loader>();
  const isError = res.errors;
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex space-x-6">
        {/* Todo List */}
        <div className="w-1/3 border-r pr-4">
          <h2 className="text-2xl font-bold mb-4">Todo List</h2>
          {isError ? (
            <p className="text-gray-500">fetch failed </p>
          ) : (
            <ul>
              {(res.data as TodoItem[]).map((todo) => (
                <li
                  key={todo.id}
                  onClick={() => setSelectedTodo(todo)}
                  className={`p-2 mb-2 cursor-pointer hover:bg-gray-200 rounded ${
                    selectedTodo?.id === todo.id ? "bg-gray-300" : "bg-gray-100"
                  }`}
                >
                  {todo.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Todo Details */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-4">Todo Details</h2>
          {selectedTodo ? (
            <div>
              <h3 className="text-xl font-semibold">{selectedTodo.title}</h3>
              <p className="mt-2 text-gray-600">{selectedTodo.content}</p>
            </div>
          ) : (
            <p className="text-gray-500">
              Click on a todo item to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
