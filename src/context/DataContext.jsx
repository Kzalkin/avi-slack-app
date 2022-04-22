import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userChannels, setUserChannels] = useState([]);
  const [senderList, setSenderList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Channels") === null) {
      setUserChannels([]);
    } else {
      setUserChannels(JSON.parse(localStorage.getItem("Channels")));
    }

    if (localStorage.getItem("DirectMessage") === null) {
      setSenderList([]);
    } else {
      setSenderList(JSON.parse(localStorage.getItem("DirectMessage")));
    }
  }, []);

  const addSender = (sender) => {
    setSenderList(sender)
  };

  const clearSenders = () => {
    setSenderList([]);
  };

  const clearChannels = () => {
    setUserChannels([]);
  };

  return (
    <DataContext.Provider
      value={{
        senderList,
        userChannels,
        onNewSender: addSender,
        getChannels: setUserChannels,
        resetChannels: clearChannels,
        resetSenderList: clearSenders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
