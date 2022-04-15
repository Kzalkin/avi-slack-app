import React, { useEffect, useState } from "react";
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
  const messageClass = channel["email"] ? true : false;
  const [addChannel, setAddChannel] = useState(false);

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
    if (fetchedData !== undefined && messageClass) {
      groupedArray = groupArray(
        fetchedData,
        senderList,
        onNewSender,
        getCleanSenderList
      );
    }
    localStorage.setItem("Messages", JSON.stringify(groupedArray));
    if (localStorage.getItem("Messages") == "undefined") {
      setMessageList([]);
    } else {
      setMessageList(JSON.parse(localStorage.getItem("Messages")));
    }
  };

  useEffect(() => {
    getMessages();
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
        {!messageClass && <span onClick={handleAddChannel}>Members</span>}
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
        </div>
        <form className="message-form" onSubmit={handleSubmit}>
          <textarea
            className="message-input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="submit" type="submit">
            Send
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
