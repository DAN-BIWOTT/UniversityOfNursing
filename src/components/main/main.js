import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Users from "../main/users/Users";
import { AdminAllNewOrders_query } from "../../graphQl/uonQueries";
import Spinner from "../Spinner";
import { navigate } from "gatsby";
import { Button } from "theme-ui";

const Main = () => {
    
  useEffect(() => {
    AllNewOrders();
  },[]);

  const [pageLoader, setPageLoader] = useState(true);
  const [loadingScreen,setLoadingScreen] = useState(<Spinner/>);

  useEffect(() => {
    pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
  },[pageLoader]);

  const [data, setData] = useState([])
  const newOrdersQuery = AdminAllNewOrders_query;

  const AllNewOrders = async () => {
    setPageLoader(true)
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

  const blog = (event) =>{
    event.preventDefault();
    const confirmationAction = window.confirm("Login Credentials as chief editor\r\n"+
    "email: universityofnursingke@gmail.com \r\n"+
    "Password: Alchemy_254");
    if(confirmationAction){
      navigate("https://www.blogger.com/blog/posts/5324359413116762170")
    }
  }

  const generalChats = (event) =>{
    event.preventDefault();
    const confirmationAction = window.confirm("Login Credentials as Admin\r\n"+
    "email: universityofnursingke@gmail.com \r\n"+
    "Password: Alchemy_254");
    if(confirmationAction){
      navigate("https://dashboard.tawk.to/#/chat")
    }
  }

  const billingManagement = (event) =>{
    event.preventDefault();
      navigate("https://laughing-heyrovsky-3e37f1.netlify.app")
    
  }

  return (
    <Container>
      {loadingScreen}
      <Nav />
      <Button style={{marginBottom:"6vh"}} onClick={(event)=>{blog(event)}}>Blog</Button>
      <Button style={{marginBottom:"6vh",marginLeft:"2rem",backgroundColor:"blueviolet"}} onClick={(event)=>{generalChats(event)}}>General Chats</Button>
      {/* <Button style={{marginBottom:"6vh",marginLeft:"2rem",backgroundColor:"blueviolet"}} onClick={(event)=>{billingManagement(event)}}>Billing Management</Button> */}
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
