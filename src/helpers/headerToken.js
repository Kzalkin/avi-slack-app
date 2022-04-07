const headerToken = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  return {
    "access-token": token["access-token"],
    client: token["client"],
    expiry: token["expiry"],
    uid: token["uid"],
  };
};

export default headerToken