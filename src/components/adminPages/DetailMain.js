import React from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";

const DetailMain = ({ orderId }) => {
  var CompleteStatus = "green";
  return (
    <div>
      <H1>Item Id: {orderId}</H1>
      <OrderGrid>
        <OrderContainer>
          <OrderTitle>title</OrderTitle>
          <StatusContainer>
            <ColorStatus status={CompleteStatus} title={"Complete"} />
            <ColorStatus status={CompleteStatus} title={"Paid"} />
          </StatusContainer>
          <OrderSubtitle>Subtitle</OrderSubtitle>
          <OrderDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestia
          </OrderDescription>
        </OrderContainer>
        <OrderSummary>Order summary</OrderSummary>
        <ChatBox />
      </OrderGrid>
    </div>
  );
};

export default DetailMain;

const H1 = styled.h1`
  color: black;
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 2rem;
`;

const OrderContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: auto;
  background: white;
  display: block;
  justify-content: left;
  align-items: center;
  border-radius: 20px;
`;
const OrderSummary = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: auto;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const OrderTitle = styled.h2`
  margin-left: 3vw;
`;

const StatusContainer = styled.div`
  display: inline-block;
`;

const OrderSubtitle = styled.h3`
  color: grey;
  font-size: clamp(1rem, 2.5vw, 2rem);
  justify-content: left;
  margin-left: 2vw;
`;

const OrderDescription = styled.p`
  color: grey;
  font-size: clamp(1rem,1vw, 1rem);
  justify-content: left;
  margin-left: 2vw;
`;
