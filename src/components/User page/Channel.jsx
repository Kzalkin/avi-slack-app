import React from "react";
import "../../assets/styles/Channel.scss";

function Channel({ title }) {
  return (
    <section className="channel-container">
      <header className="channel-header">
        <h1>{title}</h1>
        <span>Members</span>
      </header>
    </section>
  );
}

export default Channel;
