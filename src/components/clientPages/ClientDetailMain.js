import React from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";

const ClientDetailMain = ({ data, orderId }) => {

  var progressStatus, colorProgressTitle, paymentStatus, colorPaymentTitle;

  const date = `${new Date(data.created_at).getDate()}/${new Date(
    data.created_at
  ).getMonth()}/${new Date(data.created_at).getFullYear()}`;

  switch (data.progress_status) {
    case 0:
      progressStatus = "red";
      colorProgressTitle = "Incomplete";
      break;

    default:
      progressStatus = "green";
      colorProgressTitle = "Complete";
      break;
  }

  switch (data.payment_status) {
    case 0:
      paymentStatus = "red";
      colorPaymentTitle = "Not Paid";
      break;

    default:
      paymentStatus = "green";
      colorPaymentTitle = "Paid";
      break;
  }
  const Ul = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  `
  
  const Li = styled.li`
  border-right: 1px solid #bbb;
    float: left;
    `

  const Link = styled.a`
  display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    cursor: pointer;
    :hover {
    background-color: #111;
  }
  `
  
  return (
    <div>
      <H1>Order Id: {orderId}</H1>
      <OrderGrid>
        <OrderContainer>
          <Ul>
            <Li><Link to="/">Pay</Link></Li>
            <Li><Link to="/">Dispute</Link></Li>
            <Li><Link to="/">Revision</Link></Li>
            <Li style={{float:"right"}}><Link to="/">About</Link></Li>
          </Ul>
          <OrderTitle>{data.subject}</OrderTitle>
          <StatusContainer>
            <ColorStatus status={progressStatus} title={colorProgressTitle} />
            <ColorStatus status={paymentStatus} title={colorPaymentTitle} />
          </StatusContainer>
          <OrderSubtitle>{data.topic}</OrderSubtitle>
          <OrderDescription>{data.doc_description}</OrderDescription>
        </OrderContainer>
        <OrderSummary>
          <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
          <hr />
          <table>
            <tbody>
              <tr>
                <td>Budget:</td>
                <td>{data.budget}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{data.price}</td>
              </tr>
              <tr>
                <td>Dispute:</td>
                <td>
                  {data.dispute_status === 0 || data.dispute_status === null
                    ? "No Dispute"
                    : "Under Dispute"}
                </td>
              </tr>
              <tr>
                <td>Date Received:</td>
                <td>{date}</td>
              </tr>
              <tr>
                <td>Format:</td>
                <td>{data.doc_format}</td>
              </tr>
              <tr>
                <td>Deadline:</td>
                <td>{data.due_time}</td>
              </tr>
              <tr>
                <td>Nature:</td>
                <td>{data.nature}</td>
              </tr>
              <tr>
                <td>Pages:</td>
                <td>{data.pages}</td>
              </tr>
              <tr>
                <td>Line-Spacing:</td>
                <td>{data.spacing}</td>
              </tr>
              <tr>
                <td>Revision Status:</td>
                <td>
                  {data.revision_status === 0 || data.revision_status === null
                    ? "Not In Revision"
                    : "In Revision"}
                </td>
              </tr>
            </tbody>
          </table>
        </OrderSummary>
      <ChatBox sender="client" orderData={orderId} />
      <FileHold >
          <H1>Project Files</H1>
      </FileHold>
      </OrderGrid>
    </div>
  );
};

export default ClientDetailMain;
const FileHold = styled.div`
  width: auto;
  margin-top: 3vh;
  background: #fff;
  border-radius: 10px;
  display: block;
  padding-left: 2rem;
  box-shadow: 0 6px 12px 0 rgba(23, 64, 225, 0.2);
`

const H1 = styled.h1`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
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
  display: block;
  justify-content: center;
  border-radius: 20px;
  hr {
    width: 40%;
    size: 1px;
  }
  table {
    padding-left: 1rem;
    margin-bottom: 10px;
    td {
      font-family: Arial, Helvetica, sans-serif;
    }
  }
`;

const OrderSummaryTitle = styled.h1`
  color: #004000;
  padding-left: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  font-size: clamp(1rem, 2.5vw, 2rem);
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
  font-size: clamp(1rem, 1vw, 1rem);
  justify-content: left;
  margin-left: 2vw;
`;