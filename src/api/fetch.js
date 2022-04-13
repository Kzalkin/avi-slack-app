import axios from "./axios";
import headerToken from "../helpers/headerToken";

const SIGN_IN_URL = "/auth/sign_in";
const CHANNELS_URL = "/channels";
const REG_URL = "/auth";
const MESSAGES_URL = "/messages";
const USERS_URL = "/users";

const fetchChannels = async () => {
  const resp = await axios.get(CHANNELS_URL, {
    headers: headerToken(),
  });
  return resp.data.data;
};

const authLogin = async (data) => {
  try {
    const resp = await axios.post(SIGN_IN_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return [resp.data.data, resp.headers];
  } catch (error) {
    return [error.response.status, error.response.data.errors];
  }
};

const authRegister = async (data) => {
  try {
    await axios.post(REG_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return null;
  } catch (error) {
    return error.response.data.errors.full_messages;
  }
};

const newChannel = async (data) => {
  const resp = await axios.post(CHANNELS_URL, data, {
    headers: headerToken(),
  });
  return resp.data;
};

const newChannelMessage = async (data) => {
  const resp = await axios.post(MESSAGES_URL, data, {
    headers: headerToken(),
  });
  return resp;
};

const getChannelMessages = async (data) => {
  const resp = await axios.get(
    `/messages?receiver_id=${data.receiver_id}&receiver_class=${data.receiver_class}`,
    {
      headers: headerToken(),
    }
  );
  return resp.data.data;
};

const getUsers = async () => {
  const resp = await axios.get(USERS_URL, {
    headers: headerToken(),
  });
  return resp.data.data;
};

export {
  fetchChannels,
  authLogin,
  authRegister,
  newChannel,
  newChannelMessage,
  getChannelMessages,
  getUsers,
};
