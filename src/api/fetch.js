import axios from "./axios";
import headerToken from "../helpers/headerToken";

const SIGN_IN_URL = "/auth/sign_in";
const CHANNELS_URL = "/channels";
const REG_URL = "/auth";

const fetchChannels = async () => {
  const resp = await axios.get(CHANNELS_URL, {
    headers: headerToken(),
  });
  return resp.data.data;
};

const authLogin = async (data) => {
  try {
    const resp = await axios.post(SIGN_IN_URL, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
    return [resp.data.data, resp.headers];
  } catch (error) {
    return [error.response.status, error.response.data.errors];
  }
};

const authRegister = async (data) => {
  try {
    await axios.post(REG_URL, JSON.stringify(data), {
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

export { fetchChannels, authLogin, authRegister, newChannel };
