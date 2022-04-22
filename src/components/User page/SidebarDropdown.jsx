import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddChannel from "./AddChannel";
import Modal from "../../helpers/Modal";

function SidebarDropdown({ title, data }) {
  const [addChannel, setAddChannel] = useState(false);
  const handleAddChannel = () => {
    setAddChannel((prev) => !prev);
  };
  const test = title === "Channels"
  const image = `https://avatars.dicebear.com/api/${test?`identicon`:`micah`}/`;

  return (
    <div className="dropdown-container">
      <div className="dropdown-title-container">
        <div className="title">
          <i className="fa-solid fa-caret-down" />
          <span>{title}</span>
        </div>
        <i className="fa-solid fa-plus" onClick={handleAddChannel} />
      </div>
      <div className="dropdown-item-list">
        {data.map((item) => {
          if (!item.errors) {
            return (
              <div className="channel-item">
                <img src={`${image}baby-${item.email ? item.email : item.name}.svg`} alt="" className="image"/>
                <Link key={item.id} to={`${item.id}`} className="list-item">
                  {item.email ? item.email : item.name}
                </Link>
              </div>
            );
          }
        })}
      </div>
      <Modal open={addChannel}>
        <AddChannel onClose={setAddChannel} title={title} />
      </Modal>
    </div>
  );
}

export default SidebarDropdown;
