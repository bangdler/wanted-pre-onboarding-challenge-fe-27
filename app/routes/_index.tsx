import {
  ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodo, updateTodo } from "~/api/todo";
import TodoDetails from "~/components/TodoDetails";
import TodoList from "~/components/TodoList";
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
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const fetcher = useFetcher<typeof action>({ key: "todo" });

  useEffect(() => {
    if (fetcher.formMethod === "PUT" && fetcher.data?.ok) {
      setEditingTodo(null);
      setSelectedTodo(fetcher.data?.data as TodoItem);
    }
    if (fetcher.formMethod === "DELETE" && fetcher.data?.ok) {
      setSelectedTodo(null);
      setEditingTodo(null);
    }
  }, [fetcher.state]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex space-x-6">
        <TodoList
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
        <TodoDetails
          selectedTodo={selectedTodo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
        />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const { token } = parseCookies(cookieHeader);
  const formData = await request.formData();

  switch (request.method) {
    case "POST": {
      const title = String(formData.get("title"));
      const content = String(formData.get("content"));

      const res = await createTodo({ token, title, content });
      return res;
    }
    case "PUT": {
      const id = String(formData.get("todoId"));
      const title = String(formData.get("title"));
      const content = String(formData.get("content"));

      const res = await updateTodo({ token, id, title, content });
      return res;
    }
    case "DELETE": {
      const id = String(formData.get("todoId"));

      const res = await deleteTodo({ token, id });
      return res;
    }
  }
}
