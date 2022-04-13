import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userChannels, setUserChannels] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [senderList, setSenderList] = useState([]);
  // const [isChannel, setIsChannel] = useState('')

  useEffect(() => {
    if (localStorage.getItem("Channels") === null) {
      setUserChannels([]);
    } else {
      setUserChannels(JSON.parse(localStorage.getItem("Channels")));
    }
    if (localStorage.getItem("DirectMessage") === null) {
      setSenderList([]);
    } else {
      setSenderList([JSON.parse(localStorage.getItem("DirectMessage"))]);
    }
  }, []);

  const addSender = (sender) => {
    setSenderList((prev) => (prev === sender ? [...prev] : [...prev, sender]));
  };
  const clearSenders = () => {
    setSenderList([]);
  };
  return (
    <DataContext.Provider
      value={{
        // isChannel,
        senderList,
        messageList,
        userChannels,
        onNewSender: addSender,
        getChannels: setUserChannels,
        resetSenderList: clearSenders,
        getMessageList: setMessageList,
        getCleanSenderList: setSenderList,
        // getChannelStatus: setIsChannel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
