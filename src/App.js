import "./assets/styles/App.scss";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Container from "./components/Container";
import Home from "./pages/Home";
import Userpage from "./pages/Userpage";
import Channel from "./components/User page/Channel";
import useDataContext from "./hooks/useDataContext";

function App() {
  const { userChannels, senderList } = useDataContext();
  // const user = JSON.parse(localStorage.getItem("User"));

  return (
    <Routes>
      <Route path="/" element={<Container />}>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* private */}
        <Route path="/userpage" element={<Userpage />}>
          {userChannels.map((item) => {
            return (
              <Route
                path={`${item.id}`}
                key={item.id}
                element={
                  <Channel key={item.id} title={item.name} channel={item} />
                }
              />
            );
          })}
          {senderList.map((item) => {
            return (
              <Route
                path={`${item.id}`}
                key={item.id}
                element={
                  <Channel key={item.id} title={item.email} channel={item} />
                }
              />
            );
          })}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
