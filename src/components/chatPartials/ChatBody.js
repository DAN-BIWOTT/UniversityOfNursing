import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatBubble from "./ChatBubble";
import { RiSendPlaneFill } from "react-icons/ri";
import { getChats, sendChats, sendGeneralNotification } from "../../utils/chats";
import toast, { Toaster } from "react-hot-toast";
import { animateScroll } from "react-scroll";
import Loader from "react-loader-spinner";
import { database } from "../../utils/firebase.js";
import { onValue, ref } from "firebase/database";

const ChatBody = ({ orderId, sender }) => {
  const msgObj = {
    order_id: "",
    msg: "",
    sender: sender,
    created_at: "",
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  });


  const [tempChats, setTempChats] = useState([{
    created_at:{
      created_at: 0,
    },
    sender:{
      sender: 0,
    },
    msg:{
      msg : 0
    }
  }]);

  const [waitingButton, setWaitingButton] = useState(false);
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "bottom-chat",
    });
  };

  const getMessages = async () => {
    const chatRef = ref(database, 'Chats/' + msgObj.order_id + '/');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chatList = []
      for(let contentId in data[orderId]){
        chatList.push(data[orderId][contentId])
      }
      setTempChats(chatList)
    });
  };

  const [text, setText] = useState("");
  const sendText = async () => {
    msgObj.order_id = orderId;
    msgObj.msg = text;
    msgObj.created_at = Date.now();
    const resp = await sendChats(msgObj);

    if (resp) {
      let notification = {
        created_at: Date.now(),
        sender: "Order: ".concat(orderId),
        msg: "New Chat Message",
        order_id: orderId
      };
      sendGeneralNotification(notification);
      setWaitingButton(false);
      toast("Message Sent Successfully.", { style: { background: "#00FF00" } });
      setText("");
    } else {
      setWaitingButton(false);
      toast("Something went wrong when sending your message", {
        style: { background: "#DC143C" },
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setWaitingButton(true);
    if (text !== "") {
      sendText();
    } else {
      setWaitingButton(false);
      toast("Can't send an empty message.", {
        style: { background: "#DC143C" },
      });
    }
  };
  return (
    <Container>

      <Body id="bottom-chat">
        {tempChats.map((chatItem) => {
          if(chatItem.created_at.created_at !== 0){
          return chatItem.sender.sender === "admin" ? (
            <ChatBubble data={chatItem} direction={true} key={chatItem.created_at.created_at} />
          ) : (
            <ChatBubble data={chatItem} direction={false} key={chatItem.created_at.created_at} />
          );}
        })}
      </Body>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Input Message here..."
          onChange={(event) => setText(event.target.value)}
          value={text}
        />

        {waitingButton ? (
          <Loader
            type="Bars"
            color="#00BFFF"
            height={40}
            width={40}
            style={{ marginLeft: "40%" }}
          />
        ) : (
          <Button>
            <RiSendPlaneFill style={{ width: "5vw", height: "5vh" }} />
            Send
          </Button>
        )}
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </Container>
  );
};

export default ChatBody;

const Container = styled.div`
  margin: 0, 0, 10px, 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: 50vh;
  max-height:50vh;
  background: #f5f5f5;
  display: block;
  border-radius: 0px, 0px, 0px, 0px;
`;

const Body = styled.div`
  height: 50vh;
  width: 100%;
  overflow-y: scroll;
`;

const Input = styled.textarea`
  width: 100%;
  height: 20vh;
  background-color: white;
  padding-left: 10px;
  padding-top: 10px;
  border-radius: 0px, 0px, 5px, 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-color: transparent;
  font-size: 3vh;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  :hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
  :active {
    border-color: transparent;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 10vh;
  border-radius: 5px;
  margin-bottom: 20px;
  background: #9483c5;
  border: none;
  color: #ffffff;
  font-size: clamp(1rem, 1vw, 1rem);
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  cursor: pointer;
  :hover {
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  }
`;
