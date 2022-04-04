import React from "react";
import '../../assets/styles/Channel.scss'

function Channel({title}) {
  return (
    <section className="channel-container">
      <h1>{title}</h1>
    </section>
  );
}

export default Channel;
