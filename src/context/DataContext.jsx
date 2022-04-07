import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userChannels, setUserChannels] = useState([]);

  useEffect(()=>{
    if (localStorage.getItem('Channels') === null) {
      setUserChannels([])
    } else {
      setUserChannels(JSON.parse(localStorage.getItem('Channels')))
    }
  },[])

  return (
    <DataContext.Provider
      value={{
        userChannels,
        getChannels: setUserChannels,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
