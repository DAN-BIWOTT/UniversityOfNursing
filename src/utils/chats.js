import { database } from "./firebase";

import { onValue, ref, push } from "firebase/database";

const getChats = async (order_id) => {
  const chatRef = ref(database, "orderId/" + order_id);
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

const readNotifications = async (msgObj) => {
  const chatRef = ref(database, "Notifications/" + msgObj.clientId + "/");
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

const readGeneralNotifications = async () => {
  const chatRef = ref(database, "GeneralNotifications/");
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

// const getChats = async (order_id) => {
//   const allChats = collection(db, "chats");
//   const someChats = query(allChats, where("order_id", "==", order_id));
//   const chatSnapshot = await getDocs(someChats);
//   const chatList = chatSnapshot.docs.map((doc) => doc.data());
//   console.log(chatList);
//   return chatList;
// };

// const sendChats = async (msgObj) => {
//   try {
//     await setDoc(doc(db, "chats", `Convo Time: ${msgObj.created_at}`), {
//       order_id: msgObj.order_id,
//       msg: msgObj.msg,
//       sender: msgObj.sender,
//       created_at: msgObj.created_at,
//     });
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

const sendChats = async (msgObj) => {
  await push(ref(database, "Chats/" + msgObj.order_id + "/"), {
    created_at: {
      created_at: msgObj.created_at,
    },
    sender: {
      sender: msgObj.sender,
    },
    msg: {
      msg: msgObj.msg,
    },
  });
  return true;
};
const sendGeneralNotification = async (msgObj) => {
  await push(ref(database, "GeneralNotifications/"), {
    created_at: msgObj.created_at,
    sender: msgObj.sender,
    msg: msgObj.msg,
  });
  return true;
};

const sendNotification = async (msgObj) => {
  await push(ref(database, "Notifications/" + msgObj.clientId + "/"), {
    created_at: msgObj.created_at,
    sender: msgObj.sender,
    msg: msgObj.msg,
    orderId: msgObj.orderId
  });
  return true;
};

export {
  getChats,
  sendChats,
  sendGeneralNotification,
  sendNotification,
  readGeneralNotifications,
  readNotifications,
};
