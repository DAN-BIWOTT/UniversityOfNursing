import React, { useEffect } from "react";
import styled from "styled-components";
import NewUserBtn from "../sidebar/menu/NewUserBtn";
import Nav from "./Nav";
import Users from "../main/users/Users";

const Main = () => {
    
  useEffect(() => {
    AllNewOrders();
  });

  const newOrdersQuery = `query AllNewOrders {
    order(order_by: {client_id: asc, id: desc}) {
      id
      subject
      pages
      budget
      due_time
    }
  }`;

  const AllNewOrders = async () => {
    const response = await fetch("https://elegant-phoenix-17.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": "KqWmApoDDGIvFcJkhmxAJZGWxeERYz4g7VyRnKckrbFgdcWJ5ixe9os1559IjSTr",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: newOrdersQuery,
      }),
    });

    const finalResp = await response.json();
  };

  return (
    <Container>
      <Nav />
      <NewUserBtn />
      <Users title="New Orders" count={2} />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
