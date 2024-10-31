import { useFetcher } from "@remix-run/react";
import { action } from "~/routes/_index";

interface Props {
  id: string;
}

const DeleteTodoForm = ({ id }: Props) => {
  const fetcher = useFetcher<typeof action>({ key: "todo" });

  return (
    <fetcher.Form method="delete">
      <input type="hidden" name="todoId" value={id} />
      <button type="submit" className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </fetcher.Form>
  );
};

export default DeleteTodoForm;
