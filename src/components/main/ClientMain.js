import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewUserBtn from "../sidebar/menu/NewUserBtn";
import ClientNav from "./ClientNav";
import { getUser } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
import AllOrders from "./users/AllOrders";
import { UserSpecific_query } from "../../graphQl/uonQueries";
import Spinner from "../Spinner";

const ClientMain = () => {
  const id = getUser().id;
  useEffect(() => {
    AllNewOrders();
  }, []);

  const [pageLoader, setPageLoader] = useState(true);
  const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
  useEffect(() => {
    pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
  },[pageLoader]);
  
  const [data, setData] = useState([]);
  const newOrdersQuery = UserSpecific_query;
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
        variables: { id },
      }),
    });
    try {
      const finalResp = await response.json();
      setData(finalResp.data.order);
      setPageLoader(false);
    } catch (e) {
      toast("Problem Retrieving Data", {
        style: {
          background: "#DC143C",
        },
      });
    }
  };

  return (
    <Container>
      {loadingScreen}
      <ClientNav />
      <NewUserBtn />
      <AllOrders data={data} title="My Active Orders" count={data.length} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </Container>
  );
};

export default ClientMain;

const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
  background: #f4eaff;
  min-height: 100vh;
  height: fit-content;
`;
