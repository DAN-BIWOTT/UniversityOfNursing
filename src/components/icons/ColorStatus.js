import React from "react";
import styled from "styled-components";

const ColorStatus = ({ status, title }) => {
  console.log(title)
  console.log(status)
  switch (status) {
    case "red":
      return <ContainerFail>{title}</ContainerFail>;
    case "green":
      return <ContainerSuccess>{title}</ContainerSuccess>;
    default:
      return <ContainerNeutral>{title}</ContainerNeutral>;
  }
};

export default ColorStatus;

const ContainerSuccess = styled.div`
  height: auto;
  width: fit-content;
  float: right;
  margin-left: 10px;
  padding: 5px 5px 5px 5px;
  font-weight: bold;
  color: white;
  background: #00b000;
  border-radius: 5vw;
`;
const ContainerNeutral = styled.div`
  height: auto;
  width: fit-content;
  float: right;
  margin-left: 10px;
  padding: 5px 5px 5px 5px;
  font-weight: bold;
  color: white;
  background: #3c3b62bf;
  border-radius: 5vw;
`;
const ContainerFail = styled.div`
  height: auto;
  width: fit-content;
  float: right;
  margin-left: 10px;
  padding: 5px 5px 5px 5px;
  font-weight: bold;
  color: white;
  background: #ca0000;
  border-radius: 5vw;
`;

