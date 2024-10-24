import { TodoItem } from "~/type/todo";
import fetchWrapper from "~/utils/fetchWrapper";

const END_POINT = {
  getTodo: "/todos",
  createTodo: "/todos",
};

const baseUrl = process.env.API_SERVER;

export const getTodo = async (token: string) => {
  const res = await fetchWrapper<TodoItem[]>(`${baseUrl}${END_POINT.getTodo}`, {
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
  const res = await fetchWrapper<TodoItem[]>(
    `${baseUrl}${END_POINT.createTodo}`,
    {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    }
  );
  return await res.json();
};
