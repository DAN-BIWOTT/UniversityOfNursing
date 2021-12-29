import React, { useState } from "react";
import styled from "styled-components";
import ChatBody from "./chatPartials/ChatBody";
import { BiChat } from "react-icons/Bi/index";
import { CSSTransition } from 'react-transition-group';
import "./chatPartials/chatBox.css";

const ChatBox = ({ orderData, sender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    console.log(isOpen)
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <TopChatBar>
        <h1>Order: {orderData} | Press button 👉 to Start Chat</h1>
        <Button onClick={(event)=>toggle()}>
          <BiChat style={styleIcon} />
        </Button>
      </TopChatBar>

      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames="chat"
        unmountOnExit
      >
          <ChatBody sender={sender} orderId={orderData} />
      </CSSTransition>

    
    </Container>
  );
};

export default ChatBox;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background:transparent;
  position: absolute;
  font-size: 1.5em;
  margin-left: 40vw;
  margin-top: 0.7rem;
  border: none;
  box-shadow: 2px 14px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: #8000ff;
`

const styleIcon = {
  color: "#fff",
  fontSize: "1.5em",
  cursor: "pointer",
};

const Container = styled.div`
  margin-top: 3vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: auto;
  background: #fcf9ff;
  display: block;
`;

const TopChatBar = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: #8e6fe1;
  border-radius: 5px 5px 0px 0px;
  justify-content: center;
  h1 {
    padding-top: 1rem;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(1rem, 1vw, 1rem);
    font-weight: 300;
  }
`;
