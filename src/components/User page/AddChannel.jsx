import React, { useState } from "react";
import "../../assets/styles/AddChannel.scss";
import useDataContext from "../../hooks/useDataContext";
import axios from "../../api/axios";

function AddChannel({ onClose, onChannelAdd }) {
  const { headerCreds, user } = useDataContext();
  const [name, setName] = useState("");
  const CHANNELS_URL = "/channels";

  const handleClose = () => {
    onClose((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      CHANNELS_URL,
      { name: name, user_ids: [user.id] },
      {
        headers: headerCreds(),
      }
    );
    onChannelAdd();
  };

  return (
    <div className="add-channel-modal">
      <i className="fa-solid fa-x" onClick={handleClose} />
      <h3>AddChannel</h3>
      <form className="add-channel-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

export default AddChannel;
