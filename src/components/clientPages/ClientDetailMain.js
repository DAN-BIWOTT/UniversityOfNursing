import React, { useState } from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";
import fileFolder from "../../assets/images/fileFolder.png";
import BackButton from "../BackButton";
import { dispute_query } from "../../graphQl/uonQueries";
import toast from "react-hot-toast";
import { BsQuestionLg } from "react-icons/bs";
import TransactionModal from "../transaction/TransactionModal";
import ClientUploadForm from "./ClientUploadForm";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";
import Loader from "react-loader-spinner";

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
    if (finalResp.data.update_order_by_pk.dispute_status === 1) {
      toast("dispute filed", { style: { background: "#a92d2d" } });
    }
  };

  const disputeButton = (event) => {
    event.preventDefault();
    setDisputeValue(1);
    changeDisputeStatus();
  };
  // payment processing
  console.log(data);
  const [waitingButton, setWaitingButton] = useState(false);
  const deleteFromFireBase = async () => {
    const fileRef = ref(storage, "files/".concat(data.client_file_name));
    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        toast("File Deleted From storage Successfully!", {
          style: {
            background: "#3b8334",
          },
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
        toast("File Not Deleted From storage!", {
          style: {
            background: "#914747",
          },
        });
      });
    return true;
  };
  const deleteFromHasura = async () => {
    let ClientDeleteFileQuery = `mutation clientFile_query($orderId:Int!,$files:String) {
      update_order_by_pk(pk_columns: {id: $orderId}, _set: {files: $files}) {
        admin_files
      }
    }`;
    let files = null;
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: ClientDeleteFileQuery,
        variables: {
          orderId,
          files,
        },
      }),
    });
    const finalRes = await response.json();
    console.log(finalRes);
    setWaitingButton(false);
    toast("File Deleted From database Successfully!", {
      style: {
        background: "#3b8334",
      },
    });
    return true;
  };
  const deleteFile = (event) => {
    event.preventDefault();
    if (deleteFromFireBase() && deleteFromHasura())
      toast("File deleted successfully!");
    else toast("System failed to delete file!");
  };
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
              <Link>
                <TransactionModal data={data} />
              </Link>
            </Li>
            <Li>
              <NavButton onClick={(event) => disputeButton(event)}>
                Dispute
              </NavButton>
            </Li>
            <Li>
              <Link to="/">Revision</Link>
            </Li>
            <Li style={{ float: "right" }}></Li>
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

                {data.dispute_status === 0 || data.dispute_status === null ? (
                  <td> No Dispute</td>
                ) : (
                  <td style={{ color: "#b90000" }}>Under Dispute</td>
                )}
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
          <h2 style={{ paddingLeft: "1rem" }}>From Client</h2>
          {data.files !== "" ? (
            <FileRow>
              <FolderImage
                src={fileFolder}
                alt="Folder representing downloadable files."
              />
              <FileTitle href={data.files}>Data File</FileTitle>
              <br />

              {waitingButton ? (
                <Loader
                  type="Bars"
                  color="#00BFFF"
                  height={40}
                  width={40}
                  style={{ marginLeft: "40%" }}
                />
              ) : (
                <Button
                  onClick={(event) => {
                    deleteFile(event);
                  }}
                >
                  delete
                </Button>
              )}
            </FileRow>
          ) : (
            <p style={{ paddingLeft: "1rem" }}>No File Uploaded</p>
          )}
          <h2 style={{ paddingLeft: "1rem" }}>From Admin</h2>
          {data.admin_files !== null ? (
            <FileRow>
              <FolderImage
                src={fileFolder}
                alt="Folder representing downloadable files."
              />
              <FileTitle href={data.admin_files}>Download files</FileTitle>
            </FileRow>
          ) : (
            <p style={{ paddingLeft: "1rem" }}>No File Uploaded</p>
          )}
          {data.files === null ? <ClientUploadForm /> : <></>}
        </FileHold>
      </OrderGrid>
    </div>
  );
};

export default ClientDetailMain;
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
  width: fit-content;
  background-color: #8e6fe1;
  border-radius: 10px;
  border: none;
  color: #fff;
  height: 6vh;
  cursor: pointer;
  margin-left: 1rem;
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


const FolderImage = styled.img`
  min-height: 5vh;
  min-width: 5vh;
  max-width: 10vw;
  max-height: 10vh;
  align-content: flex-start;
  padding-left: 2rem;
`;
const FileTitle = styled.a`
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
  padding-bottom: 2rem;
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
