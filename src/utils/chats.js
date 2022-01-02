import { database, db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
// import { ref } from "firebase/storage";
import { onValue, getDatabase, ref, set } from "firebase/database";

// const getChats = async (order_id) => {
//   const chatRef = ref(database, "orderId/" + order_id);
//   onValue(chatRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//     return data;
//   });
// };

const getChats = async (order_id) => {
  const allChats = collection(db, "chats");
  const someChats = query(allChats, where("order_id", "==", order_id));
  const chatSnapshot = await getDocs(someChats);
  const chatList = chatSnapshot.docs.map((doc) => doc.data());
  console.log(chatList);
  return chatList;
};

const sendChats = async (msgObj) => {
  try {
    await setDoc(doc(db, "chats", `Convo Time: ${msgObj.created_at}`), {
      order_id: msgObj.order_id,
      msg: msgObj.msg,
      sender: msgObj.sender,
      created_at: msgObj.created_at,
    });
    return true;
  } catch (error) {
    return false;
  }
};

// const sendChats = async (msgObj) => {
//   set(ref(database, 'orderId/' + msgObj.order_id), msgObj);
// }

export { getChats, sendChats };
