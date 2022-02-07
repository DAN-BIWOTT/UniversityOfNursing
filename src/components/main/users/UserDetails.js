import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserDetails_query } from "../../../graphQl/uonQueries";
import Sidebar from "../../sidebar/sidebar";
import Spinner from "../../Spinner";

import "./UserStyle.css";

const UserDetails = ({ clientId }) => {
  const [id, setId] = useState(clientId);

  const UserDetailQuery = UserDetails_query;

  const [data, setData] = useState({});
  useEffect(() => {
    if (id === "") {
      window.location.href = "/admin";
    } else {
      getOrderDetails();
    }
  }, []);

  const [pageLoader, setPageLoader] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(<Spinner />);
  useEffect(() => {
    if (pageLoader) setLoadingScreen(<Spinner />);
    else setLoadingScreen(<></>);
  }, [pageLoader]);

  const getOrderDetails = async () => {
    setPageLoader(true);
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: UserDetailQuery,
        variables: {
          id,
        },
      }),
    });
    const finalRes = await response.json();
    console.log(finalRes);
    setData(finalRes.data.order_by_pk);
    console.log(data);
    setPageLoader(false);
  };

  return (
    <Container>
      {loadingScreen}
      <Sidebar permission="admin" />
      <table id="clients">
        <tr>
          <th>Order Id</th>
          <th>price</th>
          <th>topic</th>
          <th>doc_description</th>
        </tr>
      </table>
    </Container>
  );
};

export default UserDetails;

const Container = styled.div`
  width: auto;
  left: 16rem;
  top: 0px;
  position: fixed;
  padding: 0 4rem 4rem;
  background: #f4eaff;
  height: 100vh;
  z-index: 10;
  overflow-y: auto;
`;
