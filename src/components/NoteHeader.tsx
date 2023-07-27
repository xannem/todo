import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "urql";
import { AddNewTaskDocument } from "../graphql/generated";
import { User } from "../types";

type Props = {
  name: string;
  showAddNewMessage: boolean;
  setAddNewMessage: Dispatch<SetStateAction<boolean>>;
};

function NoteHeader({ name, showAddNewMessage, setAddNewMessage }: Props) {
  return (
    <div className="w-full rounded-t-lg p-0 flex justify-center items-center drop-shadow-sm w-48 h-12">
      <p className="text-lg w-full text-center text-neutral-700 font-light">
        {name}
      </p>
      <div className=" py-3  px-0 h-full absolute right-0 ">
        <button
          className="inline-flex text-lg items-center justify-center w-7 h-7 mr-2 text-white rounded-full font-bold hover:bg-sky-400 active:bg-sky-500 transition-colors duration-150 bg-sky-300 focus:shadow-outline "
          title="Add new to-do item"
          onClick={() => setAddNewMessage(!showAddNewMessage)}
        >
          {showAddNewMessage ? <> - </> : <> +</>}
        </button>
      </div>
    </div>
  );
}

type NewNoteProps = {
  show: boolean;
  setAddNewMessage: Dispatch<SetStateAction<boolean>>;
  user: User;
};

export function NewNote({ show, setAddNewMessage, user }: NewNoteProps) {
  const [, executeAddNewTask] = useMutation(AddNewTaskDocument);

  const [newTaskInput, setNewTaskInput] = useState<string>("");

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => setNewTaskInput(event.target.value);

  const addNewTask = async () => {
    await executeAddNewTask({
      id: parseInt(user.id),
      task: newTaskInput,
    });
    setNewTaskInput("");
    setAddNewMessage(false);
    return;
  };

  return (
    <>
      {show && (
        <div className="justify-center text-sm rounded-sm  m-0  p-2 ">
          <input
            placeholder="New to-do item..."
            value={newTaskInput}
            onChange={onValueChange}
            className="w-full h-12 mb-2 p-1 rounded-sm"
          />
          <br />
          <button
            className=" text-sm transition-colors duration-150 hover:bg-slate-300 bg-slate-200 text-slate-700 py-1 px-2 drop-shadow-sm rounded-sm mr-1"
            onClick={() => {
              setNewTaskInput("");
              setAddNewMessage(false);
            }}
          >
            Cancel
          </button>
          <button
            className="text-sm transition-colors duration-150 hover:bg-sky-500 bg-sky-400 drop-shadow-sm text-white py-1 px-2 rounded-sm"
            onClick={() => {
              addNewTask().catch((err) => {
                console.log(err);
              });
            }}
          >
            Add Item
          </button>
        </div>
      )}
    </>
  );
}

export default NoteHeader;
