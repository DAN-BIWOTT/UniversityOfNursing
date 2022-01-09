import React from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import NewOrderForm from "../../components/clientComponents/NewOrderForm";
import ClientNav from "../../components/main/ClientNav";
import Sidebar from "../../components/sidebar/sidebar";

const NewOrder = () => {
  return (
    <Container>
      <Sidebar />
      <ClientNav />
      <NewOrderForm />
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

export default NewOrder;

const Container = styled.div`
background: #f4eaff;
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
