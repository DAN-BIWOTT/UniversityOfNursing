import styled from "@emotion/styled";
import React from "react";
import SingleOrder from "./singleOrder";
import ClientSortingBar from "./ClientSortingBar";

const AllOrders = ({ data,title, count }) => {
    
  return (
    <Container>
      <Title>
        {title} <UserCount> {count}</UserCount>
      </Title>
      <ClientSortingBar />
      {data.map((user) => {
        return <SingleOrder data={user} key={user.id} />;
      })}
    </Container>
  );
};

export default AllOrders;

const Container = styled.div`
box-shadow: 2px 14px 9px 2px rgba(0, 0, 0, 0.25);
  padding:1rem;
  border-radius: 5px;
`

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