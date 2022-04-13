import React, { useEffect, useState } from "react";
import { getChannelMessages, newChannelMessage } from "../../api/fetch";
import "../../assets/styles/Channel.scss";
import groupArray from "../../helpers/groupArray";
import useDataContext from "../../hooks/useDataContext";
import ChannelMessage from "./ChannelMessage";

function Channel({ title, channel }) {
  const {
    messageList,
    getMessageList,
    senderList,
    onNewSender,
    getCleanSenderList,
  } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));
  const [message, setMessage] = useState("");
  const messageClass = channel["email"] ? true : false;

  const getMessages = async () => {
    const data = {
      receiver_id: channel.id,
      receiver_class: messageClass ? "User" : "Channel",
    };
    const fetchedData = await getChannelMessages(data);
    let groupedArray = fetchedData;
    if (fetchedData !== undefined && messageClass) {
      groupedArray = groupArray(
        fetchedData,
        senderList,
        onNewSender,
        getCleanSenderList
      );
    }
    localStorage.setItem("Messages", JSON.stringify(groupedArray));
    if (localStorage.getItem("Messages") == 'undefined') {
      getMessageList([]);
    } else {
      getMessageList(JSON.parse(localStorage.getItem("Messages")));
    }
  };

  useEffect(() => {
    getMessages();
    console.log('channel', channel.id)
    console.log(channel.id === user.id)
    console.log('senderList', senderList)
  }, [messageClass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      receiver_id: channel.id,
      receiver_class: messageClass ? "User" : "Channel",
      body: message,
    };
    const test = await newChannelMessage(data);
    console.log(test);
    getMessages();
    setMessage("");
  };

  return (
    <section className="channel-container">
      <header className="channel-header">
        <h1>{title}</h1>
        <span>Members</span>
      </header>
      <div className="message-container">
        <div className="message-list">
          {!messageClass &&
            messageList.map((item) => {
              return <ChannelMessage key={item.id} data={item} />;
            })}
          {(messageClass && messageList[channel]) &&
            messageList[channel].map((item) => {
              return <ChannelMessage key={item.id} data={item} />;
            })}
        </div>
        <form className="message-form" onSubmit={handleSubmit}>
          <textarea
            className="message-input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            // onKeyPress={(e) => {
            //   console.log(e);
            // }}
          />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Channel;
