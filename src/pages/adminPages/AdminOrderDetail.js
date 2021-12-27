import { navigate } from "gatsby";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminDetailMain from "../../components/adminPages/AdminDetailMain";
import Nav from "../../components/main/Nav";
import Sidebar from "../../components/sidebar/sidebar";

const AdminOrderDetail = ({ location }) => {
   const [id, setId] = useState( location.state === null?"":location.state.orderId);

  const OrderDetailQuery = `query MyQuery($id: Int!) {
        order_by_pk(id: $id) {
          budget
          client_id
          created_at
          dispute_status
          doc_description
          doc_format
          due_time
          id
          nature
          pages
          payment_status
          price
          progress_status
          revision_status
          spacing
          subject
          topic
        }
      }`;

  const [data, setData] = useState({});
  useEffect(() => {
    if(id===""){
        window.location.replace("/admin")
    }else{
        getOrderDetails();
    }
  }, []);

  const getOrderDetails = async () => {
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
    setData(finalRes.data.order_by_pk);
  };

  return (
    <Container>
      <Sidebar permission="admin" />
      <Nav />
      <AdminDetailMain data={data} orderId={id} />
    </Container>
  );
};

export default AdminOrderDetail;

const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
