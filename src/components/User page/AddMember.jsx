import React, { useEffect, useState } from "react";
import "../../assets/styles/AddMember.scss";
import { addChannelMember, getChannelDetails, getUsers } from "../../api/fetch";
import Loading from "./Loading";

const AddMember = ({ id, onClose, channel }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("User"));
  const isOwner = userData.id === channel.owner_id;

  console.log(channel["owner_id"]);

  const handleClose = () => {
    onClose((prev) => !prev);
  };

  const getMembers = async () => {
    const users = await getUsers();
    const memberId = await getChannelDetails(id);
    const test = memberId.map((item) =>
      users.find((user) => user.id == item["user_id"])
    );
    setMembers(test);
    setIsLoading(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!isOwner) {
      setErrorMessage("invalid user privilege");
      return;
    }
    const users = await getUsers();
    const user = users ? users.find((item) => item.uid == name) : null;
    const data = {
      id: id,
      member_id: user ? user.id : name,
    };
    const test = await addChannelMember(data);
    if (test.data.errors) {
      setErrorMessage(test.data.errors);
      return;
    }
    getMembers();
    setName("");
  };

  useEffect(() => {
    setIsLoading(true);
    getMembers();
  }, []);

  return (
    <div className="add-member-modal">
      <div className="modal-container">
        <div className="close">
          <i className="fa-solid fa-x icon" onClick={handleClose} />
        </div>
        <div className="member-list-container">
          <span className="text-header">Channel Members</span>
          <div className="member-list">
            {isLoading && <Loading />}
            {members.map((item) => {
              return (
                <div key={item.id} className="member-item">
                  {item.email}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-body">
          <div className="error">{errorMessage}</div>
          {isOwner && (
            <form className="add-channel-form" onSubmit={handleAddMember}>
              <input
                type="email"
                placeholder="Add member"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage("");
                }}
              />
              <button>Add</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMember;
