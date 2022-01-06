import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Users from "../main/users/Users";
import { AdminAllNewOrders_query } from "../../graphQl/uonQueries";
import Spinner from "../Spinner";

const Main = () => {
    
  useEffect(() => {
    AllNewOrders();
  },[]);
  useEffect(() => {
    loadingFunc();
  });
  const [pageLoader, setPageLoader] = useState(false);
  const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
  const loadingFunc = ()=>{
    pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
  }

  const [data, setData] = useState([])
  const newOrdersQuery = AdminAllNewOrders_query;

  const AllNewOrders = async () => {
    setPageLoader(true);
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
    setPageLoader(false)
  };

  return (
    <Container>
      {loadingScreen}
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
