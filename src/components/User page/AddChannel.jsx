import React, { useEffect, useState } from "react";
import "../../assets/styles/AddChannel.scss";
import useDataContext from "../../hooks/useDataContext";
import {
  addChannelMember,
  fetchChannels,
  getUsers,
  newChannel,
} from "../../api/fetch";
import { useNavigate } from "react-router-dom";
import removeDuplicates from "../../helpers/removeDuplicates";

function AddChannel({ onClose, title, id }) {
  const { getChannels, onNewSender, senderList } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate()

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
      handleClose();
      navigate(`/userpage/${channel.data.id}`)
    } else {
      setHasError(true);
      setErrorMessage(channel.errors[0]);
    }
  };

  const handleDirectMessage = async () => {
    const users = await getUsers();
    const message = users ? users.find((item) => item.uid == name) : null;
    if (message) {
      const list = [...senderList, message]
      const newList = removeDuplicates(list, (item) => item.id)
      onNewSender(newList);
      localStorage.setItem('DirectMessage', JSON.stringify(newList))
      handleClose()
      navigate(`/userpage/${message.id}`)
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
      return;
    }
    handleClose();
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
  };

  const handleTitle = () => {
    if (title === "Channels" || title === "Direct messages") {
      return title.toLowerCase();
    } else {
      return `new member`;
    }
  };

  return (
    <div className="add-channel-modal">
      <div className="modal-container">
        <div className="close">
          <i className="fa-solid fa-x icon" onClick={handleClose} />
        </div>
        <div className="modal-body">
          <h3 className="text-header">{`Add ${handleTitle()}`}</h3>
          {hasError && <div className="error">{errorMessage}</div>}
          <form className="add-channel-form" onSubmit={determineHandler}>
            <input
              type={title === "Channels" ? "text" : "email"}
              placeholder={
                title === "Channels" ? "Channel name" : "Email address"
              }
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage("");
              }}
            />
            <button>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddChannel;
