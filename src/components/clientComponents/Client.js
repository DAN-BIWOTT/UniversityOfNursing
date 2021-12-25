import React from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import Popup from "../notifications/popup";

const Client = ({ data }) => {
  const { email, full_name, id, created_at } = data;
  const date = `${new Date(created_at).getDate()}/${new Date(
    created_at
  ).getMonth()}/${new Date(created_at).getFullYear()}`;

  const deleteUserQuery = `mutation DeleteClient($id: Int!) {
        delete_client(where: {id: {_eq: $id}}) {
          affected_rows
        }
      }`;

  const deleteUserFunc = async (id) => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: deleteUserQuery,
        variables: { id },
      }),
    });
    const finalResponse = await response.json();
    finalResponse.data !== undefined
      ? toast("User Deleted Successfully!")
      : toast("User Doesn't Exist!");

    console.log(
      "🚀 ~ file: Client.js ~ line 29 ~ deleteUserFunc ~ finalResponse",
      finalResponse
    );
  };

  const deleteUser = (event) => {
    event.preventDefault();
    let confirmAction = window.confirm("Are you sure you want to delete user?");
    if (confirmAction) {
      deleteUserFunc(id);
    } else {
      toast("Action Cancelled");
    }
  };

  return (
    <Container>
      <Property>
        <Id>{id}</Id>
        <Email>
          <Text>{email}</Text>
        </Email>
      </Property>
      <FullName>{full_name}</FullName>
      <UserWrapper>
        <Text>{date}</Text>
      </UserWrapper>
      <UserWrapper>
        {/* /////////// */}
        <Popup data={data} />
        {/* /////////////// */}
        <Button onClick={deleteUser}>Delete</Button>
      </UserWrapper>
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
            background: "#DD0004",
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

export default Client;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(190, 190, 190, 0.22);
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  transition: all ease-in-out 300ms;
  &:hover {
    box-shadow: 0px 10px 8px -8px rgba(138, 153, 192, 0.6);
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const Button = styled.button`
  margin-left: 1rem;
  background-color: #ff4646; /* red */
  border: none;
  color: white;
  padding: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: auto;
  width: auto;
  border-radius: 5px;
`;

const Text = styled.h1`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  margin: 0;
`;

const Property = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`;

const Id = styled(Text)`
  width: 15%;
`;
const FullName = styled(Text)`
  width: 15%;
`;
const UserWrapper = styled.div`
  width: 15%;
`;

const Email = styled.div`
  width: 15%;
`;
