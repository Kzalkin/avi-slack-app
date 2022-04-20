import React, { useState } from "react";
import "../../assets/styles/AddChannel.scss";
import useDataContext from "../../hooks/useDataContext";
import {
  addChannelMember,
  fetchChannels,
  getUsers,
  newChannel,
} from "../../api/fetch";

function AddChannel({ onClose, title, id }) {
  const { getChannels, onNewSender } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleClose = () => {
    onClose((prev) => !prev);
  };

  const handleAddChannel = async () => {
    const data = { name: name, user_ids: [user.id] };
    const channel = await newChannel(data);
    if (channel.data) {
      localStorage.setItem("Channels", JSON.stringify(await fetchChannels()));
      getChannels(JSON.parse(localStorage.getItem("Channels")));
      setName("");
    } else {
      setHasError(true);
      setErrorMessage(channel.errors[0]);
    }
  };

  const handleDirectMessage = async () => {
    const users = await getUsers();
    const message = users ? users.find((item) => item.uid == name) : null;
    if (message) {
      localStorage.setItem("DirectMessage", JSON.stringify(message));
      onNewSender(message);
    } else {
      setHasError(true);
      setErrorMessage("No user found");
    }
  };

  const handleAddMember = async () => {
    const users = await getUsers();
    const user = users ? users.find((item) => item.uid == name) : null;
    const data = {
      id: id,
      member_id: user ? user.id : name,
    };
    const test = await addChannelMember(data);
    if (test.data.errors) {
      setHasError(true);
      setErrorMessage(test.data.errors);
    }
  };

  const determineHandler = async (e) => {
    e.preventDefault();
    if (title === "Channels") {
      handleAddChannel();
    } else if (title === "Direct messages") {
      handleDirectMessage();
    } else {
      handleAddMember();
    }
    handleClose();
  };

  return (
    <div className="add-channel-modal">
      <i className="fa-solid fa-x icon" onClick={handleClose} />
      <h3>Add Channel</h3>
      {hasError && <div>{errorMessage}</div>}
      <form className="add-channel-form" onSubmit={determineHandler}>
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

export default AddChannel;
