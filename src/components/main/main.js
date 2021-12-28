import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Users from "../main/users/Users";

const Main = () => {
    
  useEffect(() => {
    AllNewOrders();
  },[]);
  const [data, setData] = useState([])
  const newOrdersQuery = `query AllNewOrders {
    order(order_by: {created_at: desc}, where: {progress_status: {_eq: 0}}) {
      id
      subject
      pages
      budget
      due_time
      price
      topic
      created_at
    }
  }`;

  const AllNewOrders = async () => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: newOrdersQuery,
      }),
    });

    const finalResp = await response.json();
    setData(finalResp.data.order)
  };

  return (
    <Container>
      <Nav />
      <Users data={data} title="New Orders" count={data.length} />
    </Container>
  );
};

export default Main;

const Container = styled.div`
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
