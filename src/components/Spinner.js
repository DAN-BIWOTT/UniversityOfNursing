import React from "react";
import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import BallTriangle from "react-loader-spinner";
const Spinner = () => {
  return (
    <Container>
      <SpinnerItem>
        <BallTriangle
        type="BallTriangle"
          heigth="100"
          width="100"
          color="#ff7df6"
          arialLabel="loading-indicator"
        />
      </SpinnerItem>
    </Container>
  );
};

export default Spinner;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed; /* Stay in place */
  z-index: 200; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0,0,0); /* Black fallback color */
  background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
`;

const SpinnerItem = styled.div`
  position: relative;
  top: 30%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; 
`;
