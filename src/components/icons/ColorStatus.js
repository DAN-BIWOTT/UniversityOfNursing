import React from "react";
import styled from "styled-components";

const ColorStatus = ({ status, title }) => {
  switch (status) {
    case "red":
      return <ContainerFail>{title}</ContainerFail>;
    case "green":
      return <ContainerSuccess>{title}</ContainerSuccess>;
    default:
      return <ContainerWait>{title}</ContainerWait>;
  }
};

export default ColorStatus;

const ContainerSuccess = styled.div`
  height: auto;
  width: 10vw;
  float: right;
  margin: 10px 10vw 0 1rem;
  padding: 5px 5px 5px 5px;
  font-weight: bold;
  color: white;
  background: green;
  border-radius: 5vw;
`;
const ContainerFail = styled.div`
  height: auto;
  width: 10vw;
  float: right;
  margin: 10px 10vw 0 1rem;
  padding: 5px 5px 5px 5px;
  font-weight: bold;
  color: white;
  background: #3c3b62bf;
  border-radius: 5vw;
`;
const ContainerWait = styled.div`
  height: auto;
  width: 10vw;
  float: right;
  margin: 10px 10vw 0 1rem;
  padding: 5px 5px 5px 5px;
  font-weight: bold;
  color: white;
  background: #3c3b62bf;
  border-radius: 5vw;
`;
