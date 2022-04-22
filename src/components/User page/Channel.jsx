import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannelMessages, newChannelMessage } from "../../api/fetch";
import "../../assets/styles/Channel.scss";
import determineChannel from "../../helpers/determineChannel";
import Modal from "../../helpers/Modal";
import AddMember from "./AddMember";
import ChannelMessage from "./ChannelMessage";
import Loading from "./Loading";

function Channel() {
  const { id } = useParams();
  const [channel, title] = determineChannel(id);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [addChannel, setAddChannel] = useState(false);
  const messageClass = channel["email"] ? true : false;
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);

  const image = `https://avatars.dicebear.com/api/${messageClass?`micah`:`identicon`}/`;

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [isLoading]);

  const handleAddChannel = () => {
    setAddChannel((prev) => !prev);
  };

  const getMessages = async () => {
    const data = {
      receiver_id: channel.id,
      receiver_class: messageClass ? "User" : "Channel",
    };
    const fetchedData = await getChannelMessages(data);
    localStorage.setItem("Messages", JSON.stringify(fetchedData));
    setMessageList(JSON.parse(localStorage.getItem("Messages")));
    setIsLoading(false);
  };

  useEffect(() => {
    setMessageList([]);
    setIsLoading(true);
    const interval = setInterval(() => {
      getMessages();
    }, 1000);
    return () => clearInterval(interval);
  }, [id]);

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
        <div className="channel-title">
          <img src={`${image}baby-${channel.email ? channel.email : channel.name}.svg`} alt="" className="image" />
          <h3 className="name">{title}</h3>
        </div>
        {!messageClass && (
          <span className="add-member-button" onClick={handleAddChannel}>
            Members
          </span>
        )}
      </header>
      <div className="message-container">
        <div className="message-list">
          {isLoading && <Loading />}
          {messageList.length === 0 && !isLoading && (
            <div className="message-preview">Start a conversation!</div>
          )}
          {messageList.map((item) => {
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
        <AddMember id={channel.id} onClose={setAddChannel} channel={channel} />
      </Modal>
    </section>
  );
}

export default Channel;
