import React from "react";
import styled from "styled-components";
import ChatBubble from "./ChatBubble";

const ChatBody = () => {
  return (
    <Container>
      <Body>
        <ChatBubble direction={true} />
        <ChatBubble direction={false}/>
        <ChatBubble direction={true} />
        <ChatBubble direction={false}/>
      </Body>
      <Input placeholder="Input Message here..." />
      <Button>Send</Button>
    </Container>
  );
};

export default ChatBody;

const Container = styled.div`
  margin: 0,0,10px,0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: 40vh;
  background: #f5f5f5;
  display: block;
  border-radius: 0px, 0px, 0px, 0px;
`;

const Body = styled.div`
  height: 40vh;
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  :hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
  :active{
    border-color: transparent;
  }
  
`;

const Button = styled.button`
  width: 100%;
  height: 10vh;
  border-radius: 5px;
  margin-bottom: 20px;
`;
