import React, { useState } from "react";
import "../../assets/styles/AddChannel.scss";
import useDataContext from "../../hooks/useDataContext";
import { fetchChannels, getUsers, newChannel } from "../../api/fetch";
import { useNavigate } from "react-router-dom";
import removeDuplicates from "../../helpers/removeDuplicates";
import Loading from "./Loading";

function AddChannel({ onClose, title }) {
  const { getChannels, onNewSender, senderList } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose((prev) => !prev);
  };

  const handleAddChannel = async () => {
    setIsLoading(true)
    const data = { name: name, user_ids: [user.id] };
    const channel = await newChannel(data);
    if (channel.data) {
      localStorage.setItem("Channels", JSON.stringify(await fetchChannels()));
      getChannels(JSON.parse(localStorage.getItem("Channels")));
      setName("");
      handleClose();
      navigate(`/userpage/${channel.data.id}`);
    } else {
      setIsLoading(false)
      setErrorMessage(channel.errors[0]);
    }
  };

  const handleDirectMessage = async () => {
    setIsLoading(true)
    const users = await getUsers();
    const message = users ? users.find((item) => item.uid == name) : null;
    if (message) {
      const list = [...senderList, message];
      const newList = removeDuplicates(list, (item) => item.id);
      onNewSender(newList);
      localStorage.setItem("DirectMessage", JSON.stringify(newList));
      handleClose();
      navigate(`/userpage/${message.id}`);
    } else {
      setIsLoading(false)
      setErrorMessage("No user found");
    }
  };

  const determineHandler = async (e) => {
    e.preventDefault();
    if (title === "Channels") {
      handleAddChannel();
    } else if (title === "Direct messages") {
      handleDirectMessage();
    }
  };

  return (
    <div className="add-channel-modal">
      <div className="modal-container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="close">
              <i className="fa-solid fa-x icon" onClick={handleClose} />
            </div>
            <div className="modal-body">
              <h3 className="text-header">{`Add ${title.toLowerCase()}`}</h3>
              <div className="error">{errorMessage}</div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default AddChannel;
