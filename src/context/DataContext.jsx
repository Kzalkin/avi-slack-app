import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userChannels, setUserChannels] = useState([]);
  const [userToken, setUserToken] = useState({});

  const handleTokens = () => {
    return {
      "access-token": userToken["access-token"],
      client: userToken["client"],
      expiry: userToken["expiry"],
      uid: userToken["uid"],
    };
  };

  return (
    <DataContext.Provider
      value={{
        user,
        userToken,
        userChannels,
        getUser: setUser,
        getToken: setUserToken,
        headerCreds: handleTokens,
        getChannels: setUserChannels,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
