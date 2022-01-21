import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../../components/main/Nav";
import Sidebar from "../../components/sidebar/sidebar";
import RejectedOrdersList from "../../components/main/users/Users";
import { RejectedOrders_query } from "../../graphQl/uonQueries";
import Spinner from "../../components/Spinner";

const RejectedOrders = () => {
  const RejectedOrdersQuery = RejectedOrders_query;

  useEffect(() => {
    getRejectedOrders();
  }, []);
  const [data, setData] = useState([]);

  const [pageLoader, setPageLoader] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(<Spinner />);
  useEffect(() => {
    pageLoader ? setLoadingScreen(<Spinner />) : setLoadingScreen(<></>);
  }, [pageLoader]);

  const getRejectedOrders = async () => {
    setPageLoader(true);
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: RejectedOrdersQuery,
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
      <RejectedOrdersList
        data={data}
        title="Rejected Orders"
        count={data.length}
      />
    </Container>
  );
};

export default RejectedOrders;

const Container = styled.div`
  background-color: #f4eaff;
  min-height: 100vh;
  height: fit-content;
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;