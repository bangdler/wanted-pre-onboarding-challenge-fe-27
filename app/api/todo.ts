import { TodoItem } from "~/type/todo";
import fetchWrapper from "~/utils/fetchWrapper";

const END_POINT = {
  getTodo: "/todos",
  signUp: "/users/create",
};

const baseUrl = process.env.API_SERVER;

export const getTodo = async (token: string) => {
  const res = await fetchWrapper<TodoItem[]>(`${baseUrl}${END_POINT.getTodo}`, {
    method: "GET",
    headers: { Authorization: token },
  });
  return await res.json();
};
