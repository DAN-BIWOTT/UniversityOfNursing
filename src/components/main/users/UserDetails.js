import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserDetails_query } from "../../../graphQl/uonQueries";
import Sidebar from "../../sidebar/sidebar";
import Spinner from "../../Spinner";
import { navigate } from "gatsby";
import UserDetailTable from "./UserDetailTable.js";
import "./UserStyle.css";

const UserDetails = ({ clientId }) => {
  const [id, setId] = useState(clientId);
  const UserDetailQuery = UserDetails_query;

  const [data, setData] = useState({});
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (id === "") {
      navigate(0);
    } else {
      getOrderDetails();
    }
  }, []);
  useEffect(() => {
    isEmpty(data)
  },[]);

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
  const isEmpty = (object) => {
    for (const property in object) {
      setDisplay(true);
    } 
  };
  
  if (display) {
    return (
      <Container>
        {loadingScreen}
        <Sidebar permission="admin" />
        <UserDetailTable tableData={data} />
      </Container>
    );
  } else {
    return (
      <Container>
        {loadingScreen}
        <Sidebar permission="admin" />
        <h1>Loading...</h1>
      </Container>
    );
  }
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
