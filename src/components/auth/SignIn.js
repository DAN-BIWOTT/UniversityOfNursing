import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { handleLogin } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const SignIn = () => {
  const findUserQuery = `query findUserQuery($email: String,$pass: String) {
    client(where: {email: {_regex: $email}, pass: {_regex: $pass}}) {
      id
      email
      full_name
      isAdmin
    }
  }`;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [waitingButton, setWaitingButton] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault(event);
    setWaitingButton("wait");
    if (email !== "") {
      const response = await fetch(
        "https://elegant-phoenix-17.hasura.app/v1/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: findUserQuery,
            variables: {
              email,
              pass,
            },
          }),
        }
      );

      const finalRes = await response.json();
      if (finalRes.data.client.length !== 0) {
        setWaitingButton(false);
        handleLogin(
          finalRes.data.client[0].id,
          finalRes.data.client[0].full_name,
          finalRes.data.client[0].email,
          finalRes.data.client[0].isAdmin
        );
      } else {
        setWaitingButton(false);
        toast("Failed Login. Check Your Password or Email");
      }
    } else {
      setWaitingButton(false);
      toast("Please fill all inputs on the form");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <h3>Sign In</h3>
      <ButtonContainer>
        <Input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="Email"
        />
        <Status />
      </ButtonContainer>
      <ButtonContainer>
        <Input
          type="password"
          onChange={(event) => setPass(event.target.value)}
          value={pass}
          placeholder="Password"
        />
        <Status />
      </ButtonContainer>
      {waitingButton ? (
        <Loader type="Puff" color="#00BFFF" height={50} width={50} />
      ) : (
        <button type="submit">Sign In</button>
      )}
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
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    margin-bottom: 2rem;
  }
  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

//
const Input = styled.input`
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  &:hover {
    transform: translateY(-3px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  height: 10px;
  width: 10px;
  background: #9d9d9d;
  border-radius: 10px;
  margin-left: 1rem;
  ${Input}:focus + & {
    background: #ffa689;
  }
  ${Input}:invalid + & {
    background: #fe2f75;
  }
  ${Input}:valid + & {
    background: #70edb9;
  }
`;

export default SignIn;
