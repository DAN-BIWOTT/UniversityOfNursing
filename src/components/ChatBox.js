import React from "react";
import styled from "styled-components";
import ChatBody from "./chatPartials/ChatBody";

const ChatBox = () => {
  return (
    <Container>
      <TopChatBar>Admin Side</TopChatBar>
      <ChatBody />
    </Container>
  );
};

export default ChatBox;

const Container = styled.div`
  margin-top: 3vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: auto;
  background: white;
  display: block;
`;

const TopChatBar = styled.div`
  width: 100%;
  height: 10vh;
  background-color: green;
  border-radius: 5px 5px 0px 0px;
  align-items: center;
  color: white;
  font-size: clamp(1rem,1vw, 1rem);
`;