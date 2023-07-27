import { useState } from "react";
import { User } from "../types";
import MessageDisplay from "./MessageDisplay";
import NoteHeader, { NewNote } from "./NoteHeader";

type Props = {
  user: User;
};

function UserDisplay({ user }: Props) {
  const [showAddNewMessage, setAddNewMessage] = useState(false);

  return (
    <div className="w-full mb-4 md:w-1/3" id="messages__container">
      <div className="bg-slate-100 h-full rounded-lg m-2">
        <NoteHeader
          showAddNewMessage={showAddNewMessage}
          setAddNewMessage={setAddNewMessage}
          name={user.name}
        />
        <NewNote
          user={user}
          show={showAddNewMessage}
          setAddNewMessage={setAddNewMessage}
        />
        <div className="w-full">
          {user.messages
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((message) => (
              <MessageDisplay
                userId={user.id}
                key={message.id}
                message={message}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserDisplay;
