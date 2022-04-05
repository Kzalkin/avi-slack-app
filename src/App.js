import "./assets/styles/App.scss";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Container from "./components/Container";
import Home from "./pages/Home";
import Userpage from "./pages/Userpage";
import Channel from "./components/User page/Channel";
import { useState } from "react";
import useDataContext from "./hooks/useDataContext";

function App() {
  const {userChannels} = useDataContext()
  // const [test1, setTest1] = useState(["user1", "user2", "user3"]);
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* private */}
        <Route path="/userpage" element={<Userpage />}>
          { userChannels && userChannels.map((item) => {
            return (
              <Route path={`${item.name}`} key={item.id} element={<Channel title={item.name} />} />
            );
          })}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
