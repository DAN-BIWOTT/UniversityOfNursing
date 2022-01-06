import React from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";
import fileFolder from "../../assets/images/fileFolder.png";
import BackButton from "../BackButton";
import { BsQuestionLg } from "react-icons/bs";

const AdminDetailMain = ({ data, orderId }) => {
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
  const orderStatus = (status) =>{
    alert(status);
  }
  const progress_status = (status) =>{
    alert(status);
  }
  return (
    <div>
      <BackButton />
      <ToolTip>
        <FaqButton>
          <BsQuestionLg color="black" size="clamp(1rem,1vw,1rem)" />
          <ToolTipText className="tooltiptext">
            HELP
            <br />
            Wait For The admin to accept the assignment.
            <br />
            To start chats about the assignment with the admin, press the start
            chat button below.
          </ToolTipText>
        </FaqButton>
      </ToolTip>
      <H1>Order Id: {orderId}</H1>
      <OrderGrid>
        <OrderContainer>
        <Ul>
            <Li>
            <NavButton onClick={() => orderStatus(101)}>
                Reject Order
              </NavButton>
            </Li>
            <Li>
              <NavButton onClick={() => orderStatus(303)}>
                Approve Order
              </NavButton>
            </Li>
            <Li>
            <NavButton onClick={() => orderStatus(202)}>
                Order Inprogress
              </NavButton>
            </Li>
            <Li style={{ float: "right" }}>
            <NavButton onClick={() => progress_status(505)}>
                Order Complete
              </NavButton>
            </Li>
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
      <ChatBox sender="admin" orderData={orderId} />
      <FileHold>
          <H1>Project Files</H1>
            {(data.files!=="")?
          <FileRow>
            <FolderImage
              src={fileFolder}
              alt="Folder representing downloadable files."
            />
            <FileTitle href={data.files}>Data File</FileTitle>
          </FileRow>
            :<></>
            }
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

export default AdminDetailMain;
const FaqButton = styled.button`
  margin-left: 100%;
  float: left;
  align-content: center;
  border: none;
`;
const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  :hover .tooltiptext {
    visibility: visible;
  }
`;
const ToolTipText = styled.span`
  visibility: hidden;
  width: 30vw;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* text */
  font-size: medium;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  top: -5px;
  left: 220%;
  z-index: 2;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background-color: #8e6fe1;
`;

const Li = styled.li`
  border-right: 1px solid #bbb;
  float: left;
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
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size: clamp(1rem,1vw,1rem);
margin-top: 1rem;
margin-bottom: 1rem;
width: 100%;
background-color: #8e6fe1;
border-radius: 10px;
border: none;
color: #fff;
height: 6vh;
cursor: pointer;
`

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
`

const Form = styled.form`
bottom: 0px;
margin-top: 1rem;
`
const Label = styled.label`
padding-left: 2rem;
font-size: medium;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const FolderImage = styled.img`
  min-height: 5vh;
  min-width: 5vh;
  max-width: 10vw;
  max-height: 10vh;
  align-content: flex-start;
  padding-left: 2rem;
`;
const FileTitle = styled.a`
font-weight: 700;
padding-top: 2rem;
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
`

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
