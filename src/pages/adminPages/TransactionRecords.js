import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TransactionMain from "../../components/adminPages/Transactions/TransactionMain";
import Nav from "../../components/main/Nav";
import Sidebar from "../../components/sidebar/sidebar";
import { AllTransactions_query } from "../../graphQl/uonQueries";

const TransactionRecords = () => {
  useEffect(() => {
    AllTransactions();
  }, []);
  const [data, setData] = useState([]);
  const AllTransactionsQuery = AllTransactions_query;

  const AllTransactions = async () => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: AllTransactionsQuery,
      }),
    });

    const finalResp = await response.json();
    setData(finalResp.data.client);
  };

  return (
    <Container>
      <Sidebar permission="admin" />
      <Nav />
      <TransactionMain
        data={data}
        title="Transaction Records"
        count={data.length}
      />
    </Container>
  );
};

export default TransactionRecords;

const Container = styled.div`
  background-color: #f4eaff;
  min-height: 100vh;
  height: fit-content;
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
