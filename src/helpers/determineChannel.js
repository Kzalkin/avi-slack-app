const determineChannel = (id) => {
  let user = null;
  const test = JSON.parse(localStorage.getItem("Channels"));
  const send = JSON.parse(localStorage.getItem("DirectMessage"))
  const another = test.find((item) => item.id == id);
  if (another) {
    return [another, another.name];
  } else if (send.length > 1) {
    user = send.find((item) => item.id == id);
    return [user, user.email];
  } else {
    return [send[0], send[0].email];
  }
};

export default determineChannel;
