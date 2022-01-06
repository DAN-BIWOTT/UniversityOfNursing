import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../../components/main/Nav";
import Sidebar from "../../components/sidebar/sidebar";
import AllSubmissionsList from "../../components/main/users/Users";
import { getUser } from "../../services/auth";
import { ClientAllSubmissions_query } from "../../graphQl/uonQueries";

const AllSubmissions = () => {
  const AllSubmissionsQuery = ClientAllSubmissions_query;
  useEffect(() => {
    getAllSubmissions();
  }, []);
  const [data, setData] = useState([]);
  const id = getUser().id;
  const getAllSubmissions = async () => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: AllSubmissionsQuery,
        variables: {
          id,
        },
      }),
    });
    const finalResp = await response.json();
    setData(finalResp.data.order);
  };
  return (
    <Container>
      <Sidebar />
      <Nav />
      <AllSubmissionsList
        data={data}
        title="All Submissions"
        count={data.length}
      />
    </Container>
  );
};

export default AllSubmissions;

const Container = styled.div`
  background-color: #f4eaff;
  min-height: 100vh;
  height: fit-content;
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem 4rem;
`;
