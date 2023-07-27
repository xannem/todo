import { useMutation } from "urql";
import {
  DeleteTaskDocument,
  GetUsersQuery,
  ToogleCompletedDocument,
} from "../graphql/generated";
import { Message } from "../types";

type Props = {
  userId: string;
  message: Message;
};

export type User = GetUsersQuery["users"][0];

function MessageDisplay({ userId, message }: Props) {
  const [completeState, executeToogleComplete] = useMutation(
    ToogleCompletedDocument
  );

  const completeTask = async () => {
    await executeToogleComplete({
      id: parseInt(userId),
      taskId: parseInt(message.id),
    });
    return;
  };

  const [deleteTaskState, executeDeleteTask] = useMutation(DeleteTaskDocument);

  const deleteTask = async () => {
    await executeDeleteTask({
      id: parseInt(userId),
      taskId: parseInt(message.id),
    });
  };

  return (
    <div className="bg-slate-50  flex p-1 group mb-1 items-center">
      <button
        className="bg-slate-100 transition-colors duration-150 hover:bg-slate-200 h-5 w-5 ml-1 flex justify-center items-center p-0 rounded-sm  border-slate-200 border-2 active:bg-slate-300 active:border-slate-300"
        onClick={() => {
          completeTask().catch((err) => console.log(err));
        }}
      >
        {message.completed && (
          <i className="fa fa-check" style={{ color: "grey" }}></i>
        )}
      </button>

      <p
        className={`text-sm w-full text-black-200 px-2 overflow-hidden truncate  ${
          message.completed ? "line-through" : ""
        }`}
      >
        {message.task}
      </p>

      <button
        className=" pr-1 rounded-sm text-slate-400 hover:text-slate-600 "
        title="Delete to-do"
        onClick={() => {
          deleteTask().catch((err) => console.log(err));
        }}
      >
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  );
}

export default MessageDisplay;
