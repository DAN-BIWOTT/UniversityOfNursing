import React from "react";
import styled from "styled-components";

const ChatBody = () => {
  return (
    <Container>
      <Body />
      <Input />
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
`;

const Input = styled.textarea`
  width: 100%;
  height: 20vh;
  background-color: white;
  padding-left: 40px;
  border-radius: 0px, 0px, 5px, 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
`;

const Button = styled.button`
  width: 100%;
  height: 10vh;
  border-radius: 5px;
  margin-bottom: 20px;
`;
