import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import { login } from "~/api/auth";
import { isValidEmail, isValidPassword } from "~/utils/validate";

export default function Login() {
  const actionData = useActionData<typeof action>();
  const isError = actionData?.errors;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            로그인
          </h1>
        </header>
        <Form method="post">
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
            <div>
              <p>Please sign in</p>
            </div>
            <label>
              Email: <input type="text" name="email" />
            </label>
            <label>
              Password: <input type="password" name="password" />
            </label>
            <p>{isError ? "잘못된 입력입니다." : null}</p>
            <button type="submit" className="border rounded-lg p-4">
              로그인
            </button>
            <Link to={"/signup"}>회원가입 하기</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  // 유효성 검사
  const isValid = isValidEmail(email) && isValidPassword(password);
  if (!isValid) {
    return json({ ok: false, errors: true, details: "잘못된 입력입니다." });
  }

  const res = await login({ email, password });
  if (res.ok) {
    return redirect("/", {
      headers: { "Set-Cookie": `token=${res.token}; HttpOnly;` },
    });
  } else {
    return res;
  }
}
