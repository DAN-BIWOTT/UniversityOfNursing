import styled from "@emotion/styled";
import React from "react";
import SortingBar from "./SortingBar";
import User from "./User.js";

const Users = ({ title, count }) => {
  
  const combinedData = [
      {
        id: 1,
        firstName: "name one",
        lastName: "name two",
      },
      {
        id: 2,
        firstName: "name 3",
        lastName: "name 4",
      },
    ]
  
  return (
    <div>
      <Title>
        {title} <UserCount> {count}</UserCount>
      </Title>
      <SortingBar />
      {combinedData.map((user) => {
        return <User data={user} key={user.id} />;
      })}
    </div>
  );
};

export default Users;

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
