import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserDetails_query } from "../../../graphQl/uonQueries";
import Sidebar from "../../sidebar/sidebar";
import Spinner from "../../Spinner";
import { navigate } from "gatsby";

import "./UserStyle.css";

const UserDetails = ({ clientId }) => {
  const [id, setId] = useState(clientId);
  const UserDetailQuery = UserDetails_query;
  
  const [data, setData] = useState({});
  console.log("this is client id: ",id)
  useEffect(() => {
    if (id === "") {
      navigate(0);
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
    console.log("this is: ", id);
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
    setData(finalRes.data);
    console.log(data);

    setPageLoader(false);
  };

  return (
    <Container>
      {loadingScreen}
      <Sidebar permission="admin" />
      <Title>{data.client[0]?.full_name}</Title>
      <Title>{data.client[0]?.email}</Title>
      <table id="clients">
        <tr>
          <th>Order Id</th>
          <th>price</th>
          <th>topic</th>
          <th>doc_description</th>
        </tr>
        {data.client[0].orders.map((orders) => {
          return (
            <tr>
              <td>{orders.id}</td>
              <td>{orders.price}</td>
              <td>{orders.topic}</td>
              <td>{orders.doc_description}</td>
            </tr>
          );
        })}
      </table>
    </Container>
  );
};

export default UserDetails;

const Container = styled.div`
  width: 80%;
  height: 100vh;
  left: 16rem;
  top: 0px;
  position: fixed;
  padding: 0 4rem 4rem;
  background: #f4eaff;
  z-index: 10;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;
