import React from "react";

function ChannelMessage({data}) {
  return (
    <div className="message">
      <span className="sender">{data.sender.email}</span>
      <p className="body">
        {data.body}
      </p>
    </div>
  );
}

export default ChannelMessage;
