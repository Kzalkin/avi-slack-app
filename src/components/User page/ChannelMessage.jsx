import React from "react";

function ChannelMessage({data}) {
  return (
    <div className="message">
      <h3>{data.sender.email}</h3>
      <p>
        {data.body}
      </p>
    </div>
  );
}

export default ChannelMessage;
