import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddChannel from "./AddChannel";
import Modal from "../../helpers/Modal";

function SidebarDropdown({ title, data, onChannelAdd }) {
  const [addChannel, setAddChannel] = useState(false);
  const handleAddChannel = () => {
    setAddChannel((prev) => !prev);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-title-container">
        <span>{title}</span>
        <i className="fa-solid fa-plus" onClick={handleAddChannel} />
      </div>
      <div className="dropdown-item-list">
        {data.map((item) => {
          if (!item.errors) {
            return (
              <Link key={item.id} to={`${item.id}`} className="list-item">
                {item.email ? item.email : item.name}
              </Link>
            );
          }
        })}
      </div>
      <Modal open={addChannel}>
        <AddChannel
          onClose={setAddChannel}
          onChannelAdd={onChannelAdd}
          title={title}
        />
      </Modal>
    </div>
  );
}

export default SidebarDropdown;
