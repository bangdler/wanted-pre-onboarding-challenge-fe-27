import { json } from "@remix-run/react";

interface FetchWrapperOptions extends RequestInit {
  errorMessage?: string; // 커스텀 에러 메시지 옵션
}

export default async function fetchWrapper(
  url: string,
  options: FetchWrapperOptions = {}
) {
  const { errorMessage = "Fetch failed", ...fetchOptions } = options;

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const { details } = await response.json(); // 서버에서 반환하는 에러 메시지 가져오기
      return json({ ok: false, errors: true, details });
    }

    // 응답이 JSON 형식이라고 가정하고 처리
    const data = await response.json();
    return data;
  } catch (error) {
    // 에러 처리
    console.error(errorMessage, error);
    return json({ ok: false, errors: true, details: errorMessage });
  }
}
