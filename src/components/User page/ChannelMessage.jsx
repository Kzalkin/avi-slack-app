import React from "react";

function ChannelMessage({ data }) {
  const image = "https://avatars.dicebear.com/api/micah/";
  return (
    <div className="message">
      <div className="sender">
        <img
          src={`${image}baby-${data.sender.email}.svg`}
          alt="avatar"
          className="image"
        />
        <div className="sender-details">
          <span className="name">{data.sender.email}</span>
          <p className="body">{data.body}</p>
        </div>
      </div>
    </div>
  );
}

export default ChannelMessage;
