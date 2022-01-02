import React, { useState } from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";
import fileFolder from "../../assets/images/fileFolder.png";
import BackButton from "../BackButton";
import { dispute_query } from "../../graphQl/uonQueries";

const ClientDetailMain = ({ data, orderId }) => {
  var progressStatus,
    colorProgressTitle,
    paymentStatus,
    colorPaymentTitle,
    acceptanceStatus,
    colorAcceptanceTitle;

  const date = `${new Date(data.created_at).getDate()}/${new Date(
    data.created_at
  ).getMonth()}/${new Date(data.created_at).getFullYear()}`;

  console.log(data.payment_status);

  switch (data.progress_status) {
    case 0:
      progressStatus = "red";
      colorProgressTitle = "Incomplete";
      break;
    case 1:
      progressStatus = "green";
      colorProgressTitle = "Complete";
      break;

    default:
      progressStatus = "neutral";
      colorProgressTitle = "Incomplete";
      break;
  }

  switch (data.payment_status) {
    case 0:
      paymentStatus = "red";
      colorPaymentTitle = "Not Paid";
      break;
    case 1:
      paymentStatus = "green";
      colorPaymentTitle = "Paid";
      break;

    default:
      paymentStatus = "neutral";
      colorPaymentTitle = "Not Paid";
      break;
  }

  switch (data.acceptance_status) {
    case 0:
      acceptanceStatus = "red";
      colorAcceptanceTitle = "Declined";
      break;
    case 1:
      acceptanceStatus = "green";
      colorAcceptanceTitle = "Accepted";
      break;

    default:
      acceptanceStatus = "neutral";
      colorAcceptanceTitle = "Waiting Acceptance";
      break;
  }

  const [disputeValue, setDisputeValue] = useState(0);
  const disputeQuery = dispute_query;
  const changeDisputeStatus = async () => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: disputeQuery,
        variables: {
          orderId,
          disputeValue,
        },
      }),
    });
    const finalResp = await response.json();
    console.log(finalResp);
  };

  const disputeButton = (event) => {
    event.preventDefault();
    setDisputeValue(1);
    changeDisputeStatus();
  };
  return (
    <div>
      <BackButton />
      <H1>Order Id: {orderId}</H1>
      <OrderGrid>
        <OrderContainer>
          <Ul>
            <Li>
              <Link to="/">Pay</Link>
            </Li>
            <Li>
              <NavButton onClick={(event) => disputeButton(event)}>
                Dispute
              </NavButton>
            </Li>
            <Li>
              <Link to="/">Revision</Link>
            </Li>
            <Li style={{ float: "right" }}>
              <Link to="/">About</Link>
            </Li>
          </Ul>
          <OrderTitle>{data.subject}</OrderTitle>
          <StatusContainerUl>
            <StatusContainerLi>
              <ColorStatus
                status={acceptanceStatus}
                title={colorAcceptanceTitle}
              />
            </StatusContainerLi>
            <StatusContainerLi>
              <ColorStatus status={paymentStatus} title={colorPaymentTitle} />
            </StatusContainerLi>
            <StatusContainerLi>
              <ColorStatus status={progressStatus} title={colorProgressTitle} />
            </StatusContainerLi>
          </StatusContainerUl>
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
        <FileHold>
          <H1>Project Files</H1>
          <FileRow>
            <FolderImage
              src={fileFolder}
              alt="Folder representing downloadable files."
            />
            <FileTitle>File 1</FileTitle>
          </FileRow>
          <Form>
            <Label>Upload size no more than 80mb</Label>
            <Input type="file" />
            <Button disabled>Upload</Button>
          </Form>
        </FileHold>
      </OrderGrid>
    </div>
  );
};

export default ClientDetailMain;
const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

const Li = styled.li`
  border-right: 1px solid #bbb;
  float: left;
`;

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
`;

const Button = styled.button`
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: clamp(1rem, 1vw, 1rem);
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  background-color: #8e6fe1;
  border-radius: 10px;
  border: none;
  color: #fff;
  height: 6vh;
  cursor: pointer;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  align-content: center;
  margin-top: 1rem;
  font-size: clamp(1rem, 1vw, 1rem);
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  height: 7vh;
  margin-left: 0px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  padding: 1rem;
  border-radius: 5px;
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;

const Form = styled.form`
  bottom: 0px;
  margin-top: 1rem;
`;
const Label = styled.label`
  padding-left: 2rem;
  font-size: medium;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const FolderImage = styled.img`
  min-height: 5vh;
  min-width: 5vh;
  max-width: 10vw;
  max-height: 10vh;
  align-content: flex-start;
  padding-left: 2rem;
`;
const FileTitle = styled.h1`
  padding-left: 3rem;
  float: right;
  font-size: clamp(1rem, 2vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const FileHold = styled.div`
  display: block;
  width: auto;
  height: fit-content;
  margin-top: 3vh;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 12px 0 rgba(23, 64, 225, 0.2);
`;
const FileRow = styled.div`
  display: flex;
`;
const H1 = styled.h1`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 2rem;
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

const StatusContainerUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
`;

const StatusContainerLi = styled.li`
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
