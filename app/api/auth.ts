import fetchWrapper from "~/utils/fetchWrapper";

const END_POINT = {
  login: "/users/login",
  signUp: "/users/create",
};

const baseUrl = process.env.API_SERVER;

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetchWrapper(`${baseUrl}${END_POINT.login}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetchWrapper(`${baseUrl}${END_POINT.signUp}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};
