export const isValidEmail = (email: string) => {
  return email && email.includes("@");
};

export const isValidPassword = (password: string) => {
  return password !== "null" && password.length < 12;
};
