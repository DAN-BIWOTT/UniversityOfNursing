import React from "react";
import Signup from "./Signup";
import SignIn from "./SignIn";
import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { Link } from "theme-ui";

const Sidebar = () => {
  var form;

  const [access, setAccess] = useState("signIn");
  const toggleAccess = (event) => {
    event.preventDefault();
    access === "signIn" ? setAccess("signUp") : setAccess("signIn");
  };
  switch (access) {
    case "signUp":
      form = <Signup />;
      break;

    default:
      form = <SignIn />;
      break;
  }
  return (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="" />
      </LogoWrapper>
      {form}
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          Already have an account?{" "}
          <span>
            <Link onClick={toggleAccess}>
              {access === "signUp" ? "Sign In" : "Sign Up"}
            </Link>
          </span>
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

export default Sidebar;
