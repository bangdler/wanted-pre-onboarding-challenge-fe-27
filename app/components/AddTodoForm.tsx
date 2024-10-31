import { useFetcher } from "@remix-run/react";
import { action } from "~/routes/_index";

const AddTodoForm = () => {
  const fetcher = useFetcher<typeof action>({ key: "todo" });

  const isActionError = fetcher.data?.errors;

  return (
    <fetcher.Form method="post">
      <div className="mb-4">
        <input
          name="title"
          type="text"
          placeholder="Enter todo title"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <textarea
          name="content"
          placeholder="Enter todo content"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
        {isActionError && (
          <p className="text-gray-500">{fetcher.data?.data as string}</p>
        )}
      </div>
    </fetcher.Form>
  );
};

export default AddTodoForm;
