import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewUserBtn from "../sidebar/menu/NewUserBtn";
import Nav from "./Nav";
import { getUser } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
import AllOrders from "./users/AllOrders";

const ClientMain = () => {
  const id = getUser().id;
  useEffect(() => {
    AllNewOrders();
  }, []);
  const [data, setData] = useState([]);
  const newOrdersQuery = `
    query UserSpecificOrders($id: Int!) {
      order(order_by: {created_at: desc}, where: {client_id: {_eq: $id}}) {
        id
        subject
        pages
        budget
        due_time
        price
        topic
        created_at
      }
    }
  `;

  const AllNewOrders = async () => {
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
      console.log(
        "🚀 ~ file: ClientMain.js ~ line 42 ~ AllNewOrders ~ finalResp",
        finalResp
      );
      setData(finalResp.data.order);
    } catch (e) {
      console.log("🚀 ~ file: ClientMain.js ~ line 47 ~ AllNewOrders ~ e", e);
      toast("Problem Retrieving Data", {
        style: {
          background: "#DC143C",
        },
      });
    }
  };

  return (
    <Container>
      <Nav />
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
  height: 100vh;
`;
