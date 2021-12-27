import { db } from "./firebase";
import { collection, getDocs,setDoc,doc, collectionGroup, query, where } from "firebase/firestore/lite";

const getChats = async (order_id) => {
  const allChats = collection(db, "chats");
  const someChats = query(allChats,where("order_id","==",order_id))
  const chatSnapshot = await getDocs(someChats);
  const chatList = chatSnapshot.docs.map((doc) => doc.data());
  console.log(chatList)
  return chatList;
};

const sendChats = async (msgObj) => {
  try {
    await setDoc(doc(db, "chats",`Convo Time: ${msgObj.created_at}`), {
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

export { getChats, sendChats };
