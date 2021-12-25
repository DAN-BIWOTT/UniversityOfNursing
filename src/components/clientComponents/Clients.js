import styled from "@emotion/styled";
import React from "react";
import Client from "./Client";
import SortingBar from "./SortingBar";

const Clients = ({ data,title, count }) => {
    
  return (
    <div>
      <Title>
        {title} <UserCount> {count}</UserCount>
      </Title>
      <SortingBar /><hr/>
      {data.map((user) => {
        return <Client data={user} key={user.id} />;
      })}
    </div>
  );
};

export default Clients;

const Title = styled.h1`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

const UserCount = styled.div`
  margin-left: 1rem;
  font-size: 1rem;
  background-color: grey;
  color: white;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;