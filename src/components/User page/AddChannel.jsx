import React, { useState } from "react";
import "../../assets/styles/AddChannel.scss";
import useDataContext from "../../hooks/useDataContext";
import { fetchChannels, newChannel } from "../../api/fetch";

function AddChannel({ onClose }) {
  const { getChannels } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));
  const [name, setName] = useState("");

  const handleClose = () => {
    onClose((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name: name, user_ids: [user.id] };
    const channel = await newChannel(data);
    if (channel.errors) {
      console.log(channel.errors[0]);
    } else {
      localStorage.setItem("Channels", JSON.stringify(await fetchChannels()));
      getChannels(JSON.parse(localStorage.getItem("Channels")));
      setName("");
    }
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
