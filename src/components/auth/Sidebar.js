import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { Button } from "theme-ui";
import { useState } from "react";

const Sidebar = () => {
  const mutation = `mutation AddUser ($email: String, $pass: String){
    insert_users_one(object: {email: $email, pass: $pass}){
      email
      pass
    }
  }`;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault(event);
    const response = await fetch("https://elegant-phoenix-17.hasura.app/v1/graphql",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          email,pass
        }
      })
    }
    );

    const finalRes = await response.json();
    console.log("🚀 ~ file: Sidebar.js ~ line 35 ~ submitHandler ~ finalRes", finalRes)
  };

  return (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="" />
      </LogoWrapper>
      <Form onSubmit={submitHandler}>
        <h3>Sign Up</h3>
        <ButtonContainer>
          <Input placeholder="Full Name" />
          <Status />
        </ButtonContainer>
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
        <ButtonContainer>
          <Input type="password" placeholder="Confrim Password" />
          <Status />
        </ButtonContainer>
        <button type="submit">Sign Up</button>
      </Form>
      <Button as={Link} to="/admin">
        By-pass Admin Auth
      </Button>
      <Button as={Link} to="/client">
        By-pass Client Auth
      </Button>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          Already have an account? <span>Sign In</span>
        </h4>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;

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

const LogoWrapper = styled.div`
  img {
    height: 6rem;
  }
  h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 22px;
  }
  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
  }
`;

const Container = styled.div`
  min-width: 400px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;
  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }
  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;
    span {
      color: #ff8d8d;
      cursor: pointer;
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

export default Sidebar;
