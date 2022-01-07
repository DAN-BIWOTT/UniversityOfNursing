import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../../components/main/Nav";
import Sidebar from "../../components/sidebar/sidebar";
import InCompleteOrdersList from "../../components/main/users/Users";
import Spinner from "../../components/Spinner";
import { IncompleteOrders_query } from "../../graphQl/uonQueries";

const InCompleteOrder = () => {
  const InCompleteOrdersQuery = IncompleteOrders_query;
  useEffect(() => {
    getInCompleteOrders();
  }, []);
  const [data, setData] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(<Spinner />);
  useEffect(() => {
    pageLoader ? setLoadingScreen(<Spinner />) : setLoadingScreen(<></>);
  }, [pageLoader]);
  const getInCompleteOrders = async () => {
    setPageLoader(true);
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: InCompleteOrdersQuery,
      }),
    });
    const finalResp = await response.json();
    setData(finalResp.data.order);
    setPageLoader(false);
  };
  return (
    <Container>
      {loadingScreen}
      <Sidebar permission="admin" />
      <Nav />
      <InCompleteOrdersList
        data={data}
        title="Incomplete Orders"
        count={data.length}
      />
    </Container>
  );
};

export default InCompleteOrder;

const Container = styled.div`
  background-color: #f4eaff;
  min-height: 100vh;
  height: fit-content;
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
