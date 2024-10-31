import { TodoItem } from "~/type/todo";
import fetchWrapper from "~/utils/fetchWrapper";

const END_POINT = {
  todos: "/todos",
};

const baseUrl = process.env.API_SERVER;

export const getTodo = async (token: string) => {
  const res = await fetchWrapper<TodoItem[]>(`${baseUrl}${END_POINT.todos}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  return await res.json();
};

export const createTodo = async ({
  token,
  title,
  content,
}: {
  token: string;
  title: string;
  content: string;
}) => {
  const res = await fetchWrapper<TodoItem[]>(`${baseUrl}${END_POINT.todos}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return await res.json();
};

export const deleteTodo = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const res = await fetchWrapper<null>(`${baseUrl}${END_POINT.todos}/${id}`, {
    method: "DELETE",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  return await res.json();
};

export const updateTodo = async ({
  token,
  id,
  title,
  content,
}: {
  token: string;
  id: string;
  title: string;
  content: string;
}) => {
  const res = await fetchWrapper<TodoItem>(
    `${baseUrl}${END_POINT.todos}/${id}`,
    {
      method: "PUT",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    }
  );
  return await res.json();
};
