import React, { useEffect, useRef, useState } from "react";
import { getChannelMessages, newChannelMessage } from "../../api/fetch";
import "../../assets/styles/Channel.scss";
import groupArray from "../../helpers/groupArray";
import Modal from "../../helpers/Modal";
import useDataContext from "../../hooks/useDataContext";
import AddChannel from "./AddChannel";
import ChannelMessage from "./ChannelMessage";

function Channel({ title, channel }) {
  const { senderList, onNewSender, getCleanSenderList } = useDataContext();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [addChannel, setAddChannel] = useState(false);
  const messageClass = channel["email"] ? true : false;
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messageList]);

  const handleAddChannel = () => {
    setAddChannel((prev) => !prev);
  };

  const getMessages = async () => {
    const data = {
      receiver_id: channel.id,
      receiver_class: messageClass ? "User" : "Channel",
    };
    const fetchedData = await getChannelMessages(data);
    let groupedArray = fetchedData;
    if (fetchedData.length > 0 && messageClass) {
      groupedArray = groupArray(
        fetchedData,
        senderList,
        onNewSender,
        getCleanSenderList
      );
    }
    localStorage.setItem("Messages", JSON.stringify(groupedArray));
    setMessageList(JSON.parse(localStorage.getItem("Messages")));
  };

  useEffect(() => {
    getMessages();
  }, []);

  const newMessage = async () => {
    const data = {
      receiver_id: channel.id,
      receiver_class: messageClass ? "User" : "Channel",
      body: message,
    };
    await newChannelMessage(data);
    getMessages();
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    newMessage();
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      newMessage();
    }
  };

  return (
    <section className="channel-container">
      <header className="channel-header">
        <h3>{title}</h3>
        {!messageClass && <span className="add-member-button" onClick={handleAddChannel}>Members</span>}
      </header>
      <div className="message-container">
        <div className="message-list">
          {!messageList[channel]
            ? messageList.map((item) => {
                return <ChannelMessage key={item.id} data={item} />;
              })
            : messageList[channel].map((item) => {
                return <ChannelMessage key={item.id} data={item} />;
              })}
          <div ref={ref}></div>
        </div>
        <form className="message-form" onSubmit={handleSubmit}>
          <textarea
            className="message-input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${title}`}
            onKeyDown={handleKeyPress}
          />
          <button
            className="submit"
            type="submit"
            disabled={message ? false : true}
          >
            <i className="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
      <Modal open={addChannel}>
        <AddChannel id={channel.id} onClose={setAddChannel} title={title} />
      </Modal>
    </section>
  );
}

export default Channel;
