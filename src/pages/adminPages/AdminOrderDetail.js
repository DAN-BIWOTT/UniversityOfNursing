import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminDetailMain from "../../components/adminPages/AdminDetailMain";
import Sidebar from "../../components/sidebar/sidebar";
import Spinner from "../../components/Spinner";
import { AdminOrderDetail_Query } from "../../graphQl/uonQueries";

const AdminOrderDetail = ({ orderId }) => {
   const [id, setId] = useState( orderId);

  const OrderDetailQuery = AdminOrderDetail_Query;

  const [data, setData] = useState({});
  useEffect(() => {
    if(id===""){
        window.location.href = "/admin"
    }else{
        getOrderDetails();
    }
  }, []);

  const [pageLoader, setPageLoader] = useState(true);
  const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
  useEffect(() => {
    if(pageLoader)setLoadingScreen(<Spinner/>)
    else setLoadingScreen(<></>)
  },[pageLoader]);
  

  const getOrderDetails = async () => {
    setPageLoader(true)
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: OrderDetailQuery,
        variables: {
          id,
        },
      }),
    });
    const finalRes = await response.json();
    //console.log(finalRes)
    setData(finalRes.data.order_by_pk);
    //console.log(data)
    setPageLoader(false);
  };

  return (
    <Container>
      {loadingScreen}
      <Sidebar permission="admin" />
      <AdminDetailMain data={data} orderId={id} />
    </Container>
  );
};

export default AdminOrderDetail;

const Container = styled.div`
  width: auto;
  left:16rem;
  top:0px;
  position: fixed;
  padding: 0 4rem 4rem;
  background: #f4eaff;
  height: 100vh;
  z-index:10;
  overflow-y: auto;
`;
