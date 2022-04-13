import removeDuplicates from "./removeDuplicates";

const groupArray = (
  messageList,
  senderList,
  onNewSender,
  getCleanSenderList
) => {
  const test = messageList.reduce((group, message) => {
    const { sender } = message;
    group[sender] = group[sender] || [];
    group[sender].push(message);
    onNewSender(sender);
    return group;
  }, {});
  getCleanSenderList(removeDuplicates(senderList, (sender) => sender.id));
  return test;
};

export default groupArray;
