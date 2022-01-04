import React from "react";
import styled from "styled-components";

const ChatBubble = ({ data, direction }) => {
  const date = `${new Date(data.created_at.created_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })} | ${new Date(data.created_at.created_at).getDate()}/${new Date(
    data.created_at.created_at
  ).getMonth()}/${new Date(data.created_at.created_at).getFullYear()}`;

  switch (direction) {
    case true:
      return (
        <ContainerRight>
          <ChatContentRight>
            {data.msg.msg}
            <TimeStampRight>{date}</TimeStampRight>
          </ChatContentRight>
        </ContainerRight>
      );

    default:
      return (
        <ContainerLeft>
          <ChatContentLeft>{data.msg.msg}
          <TimeStampLeft>{date}</TimeStampLeft>
          </ChatContentLeft>
        </ContainerLeft>
      );
  }
};

export default ChatBubble;
const TimeStampLeft = styled.p`
padding-top: 1rem;
  float: right;
  font-size: 0.8rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;
`;
const TimeStampRight = styled.p`
padding-top: 1rem;
  float: left;
  font-size: 0.8rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: grey;
`;
const ContainerRight = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: right;
  background-color: transparent;
`;
const ChatContentRight = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #ffffff;
  padding-right: 1vw;
  padding-left: 1vw;
  max-width: 75%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px 0 0 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #000000;
`;
const ContainerLeft = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: left;
  background-color: transparent;
`;
const ChatContentLeft = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: #0000ff;
  padding-right: 1vw;
  padding-left: 1vw;
  max-width: 75%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 10px 10px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #f2f2f2;
`;
