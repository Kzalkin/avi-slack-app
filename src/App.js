import "./assets/styles/App.scss";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Container from "./components/Container";
import Home from "./pages/Home";
import Userpage from "./pages/Userpage";
import Channel from "./components/User page/Channel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        {/* private */}
        <Route path="userpage" element={<Userpage />}>
          <Route path=":id" element={<Channel />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
