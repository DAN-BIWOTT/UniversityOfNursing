import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Clients from "../../components/clientComponents/Clients";
import Nav from "../../components/main/Nav";
import Sidebar from "../../components/sidebar/sidebar";

const AllUsers = () => {
    
  useEffect(() => {
    AllNewOrders();
  },[]);
  const [data, setData] = useState([])
  const newOrdersQuery = `query AllNewOrders {
    client(order_by: {created_at: asc}) {
        email
        full_name
        id
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
    setData(finalResp.data.client)
  };

  return (
    <Container>
        <Sidebar permission="admin"/>
      <Nav />
      <Clients data={data} title="All Clients List" count={data.length} />
    </Container>
  );
};

export default AllUsers;

const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;