import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const EditForm = ({ data }) => {
  const { email, full_name, id, created_at } = data;
  const [fullName, setFullName] = useState(full_name);
  const [fullEmail, setFullEmail] = useState(email);
  const [waitingButton, setWaitingButton] = useState(false);

  const EditQuery = `mutation EditClientInfo($id: Int!,$fullName: String,$fullEmail: String) {
    update_client_by_pk(pk_columns: {id: $id}, _set: {email: $fullEmail, full_name: $fullName}) {
      email
      full_name
    }
  }`;

  const makeEdit = async () => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: EditQuery,
        variables: { id, fullName, fullEmail },
      }),
    });
    const finalRes = await response.json();
    setWaitingButton(false);
    toast("User Editted successfully",{
      style:{
        background: "#32CD32"
      }
    });
    //console.log(
    //   "🚀 ~ file: EditForm.js ~ line 24 ~ makeEdit ~ finalRes",
    //   finalRes
    // );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setWaitingButton(true);
    if (fullName === "" || fullEmail === "") {
      setWaitingButton(false);
      toast("Cant have Empty name or email");
      return false;
    }
    makeEdit();
  };
  return (
    <Container>
      <ModalTitle> Edit User Name </ModalTitle>
      <Form onSubmit={submitHandler}>
        <ModalBody>
          <InputWrapper>
            <Label>Input Name</Label>
            <Input
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              value={fullName}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Input Email</Label>
            <Input
              onChange={(event) => {
                setFullEmail(event.target.value);
              }}
              value={fullEmail}
            />
          </InputWrapper>
        </ModalBody>
        <ModalFooter></ModalFooter>
        <hr />
        {waitingButton ? (
          <Loader type="Bars" color="#00BFFF" height={40} width={40} style={{marginLeft:'40%'}} />
        ) : (
          <Button type="submit">Submit</Button>
        )}
       
      </Form>
    </Container>
  );
};

export default EditForm;
const LoaderContainer = styled.div`
  margin-left: 40%;
`
const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const InputWrapper = styled.div`
  margin-left: 1rem;
`;

const Label = styled.h2`
  font-weight: 500;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Input = styled.input`
  width: 75%;
  height: 7vh;
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:hover {
    transform: translateY(-3px);
  }
  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  margin-bottom: 20px;
`;

const ModalTitle = styled.div`
  width: 70vw;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const Form = styled.form``;

const ModalFooter = styled.div``;

const Button = styled.button`
  background-color: #0000ff; /* blue */
  border: none;
  border-radius: 5px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  height: auto;
  min-height: 2rem;
  min-width: 4rem;
  justify-content: center;
  margin-left: 40%;
`;
