import { json } from "@remix-run/react";

interface FetchWrapperOptions extends RequestInit {
  errorMessage?: string; // 커스텀 에러 메시지 옵션
}

const fetchWrapper = async <T>(
  url: string,
  options: FetchWrapperOptions = {}
) => {
  const { errorMessage = "Fetch failed", ...fetchOptions } = options;

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const { details } = await response.json(); // 서버에서 반환하는 에러 메시지 가져오기
      return json({ ok: false, errors: true, data: details as string });
    }

    const { data } = await response.json();
    return json({ ok: true, errors: false, data: data as T });
  } catch (error) {
    console.error(errorMessage, error);
    return json({ ok: false, errors: true, data: errorMessage });
  }
};

export default fetchWrapper;
