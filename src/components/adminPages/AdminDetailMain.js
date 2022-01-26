import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";
import fileFolder from "../../assets/images/fileFolder.png";
import BackButton from "../BackButton";
import { BsQuestionLg } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import {
  AdminStatusChange_query,
  CompleteOrderButton_query,
  MarkOrderAsPaid_query,
} from "../../graphQl/uonQueries";
import Spinner from "../Spinner";
import AdminUploadForm from "./AdminUploadForm";
import Loader from "react-loader-spinner";
import { storage } from "../../utils/firebase";
import { deleteObject, ref } from "firebase/storage";
import { sendNotification } from "../../utils/chats";

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

  const [pageLoader, setPageLoader] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(<Spinner />);
  useEffect(() => {
    pageLoader ? setLoadingScreen(<Spinner />) : setLoadingScreen(<></>);
  }, [pageLoader]);

  let statusChangeQuery = AdminStatusChange_query;
  let clientId = data.client_id;
  let notification = {
    clientId: 0,
    orderId: 0,
    created_at: 0,
    sender: "",
    msg: "",
  };
  const callToDb = async (status) => {
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: statusChangeQuery,
        variables: {
          orderId,
          status,
        },
      }),
    });
    const finalRes = await response.json();
    setPageLoader(false);
    if (
      typeof finalRes.data.update_order_by_pk.acceptance_status !== "undefined"
    ) {
      let returnStatus = finalRes.data.update_order_by_pk.acceptance_status;
      switch (returnStatus) {
        case 101:
          toast("Order Rejected.", { style: { backgroundColor: "#ff1216" } });
          notification.clientId = clientId;
          notification.orderId = orderId;
          notification.created_at = Date.now();
          notification.sender = `From Admin`;
          notification.msg = `Order: ${orderId} Rejected by Admin`;
          sendNotification(notification);
          break;
        case 202:
          notification.clientId = clientId;
          notification.orderId = orderId;
          notification.created_at = Date.now();
          notification.sender = `From Admin`;
          notification.msg = `Order: ${orderId} Is in progress`;
          sendNotification(notification);
          toast("Order in progress");
          break;
        case 303:
          notification.clientId = clientId;
          notification.orderId = orderId;
          notification.created_at = Date.now();
          notification.sender = `From Admin`;
          notification.msg = `Order: ${orderId} Accepted by Admin`;
          sendNotification(notification);
          toast("Order Approved.", { style: { backgroundColor: "#22c382" } });
          break;

        default:
          toast("Selection Still neutral.", {
            style: { backgroundColor: "#ff1216" },
          });
          break;
      }
    }
  };

  const orderStatus = (event) => {
    event.preventDefault();
    setPageLoader(true);
    switch (event.target.value) {
      case "101":
        callToDb(101);
        break;
      case "202":
        callToDb(202);
        break;
      case "303":
        callToDb(303);
        break;

      default:
        toast("Selection out of bound.", {
          style: { backgroundColor: "#ff1216" },
        });
        break;
    }
  };

  const orderPaid = async (event) => {
    event.preventDefault();
    setPageLoader(true);
    // let paymentStatusChange = event.target.value;
    const MarkOrderAsPaidQuery = MarkOrderAsPaid_query;
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: MarkOrderAsPaidQuery,
        variables: {
          orderId,
        },
      }),
    });
    const finalRes = await response.json();
    setPageLoader(false);
    if (finalRes.data.update_order_by_pk.payment_status === 404) {
      notification.clientId = clientId;
      notification.orderId = orderId;
      notification.created_at = Date.now();
      notification.sender = `From Admin`;
      notification.msg = `Order: ${orderId} Is Paid`;
      sendNotification(notification);
      toast("Order Marked as Paid Successfully!", {
        style: {
          background: "#1f891f",
          color: "#fff",
        },
      });
    } else {
      toast("Order Not Marked as Paid!", {
        style: {
          background: "#992b2b",
          color: "#fff",
        },
      });
    }
  };
  const isMarkedAccepted = () => {
    console.log(data.acceptance_status);
    data.acceptance_status === 303 ? true : false;
  };
  const progress_status = (event) => {
    event.preventDefault();
    setPageLoader(true);
    if (!isMarkedAccepted) {
      setPageLoader(false);
      toast("Order must be approved before marked as complete.", {
        style: { backgroundColor: "#000", color: "fff" },
      });
    } else {
      statusChangeQuery = CompleteOrderButton_query;
      callToDb(404);
      notification.clientId = clientId;
      notification.orderId = orderId;
      notification.created_at = Date.now();
      notification.sender = `From Admin`;
      notification.msg = `Order: ${orderId} has been completed`;
      sendNotification(notification);
      toast("Order Marked as complete.", {
        style: { backgroundColor: "#22c382" },
      });
    }
  };
  const [waitingButton, setWaitingButton] = useState(false);
  const deleteFromFireBase = async () => {
    const fileRef = ref(storage, "files/".concat(data.admin_file_name));
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
    let AdminDeleteFileQuery = `mutation adminFile_query($orderId:Int!,$files:String) {
      update_order_by_pk(pk_columns: {id: $orderId}, _set: {admin_files: $files}) {
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
        query: AdminDeleteFileQuery,
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
      {loadingScreen}
      <BackButton />
      <ToolTip>
        <FaqButton>
          <BsQuestionLg color="black" size="clamp(1rem,1vw,1rem)" />
          <ToolTipText className="tooltiptext">
            HELP
            <br />
            Approve an Order before marking it Complete
            <br />
            To start chats about the assignment with the client, press the start
            chat button below.
          </ToolTipText>
        </FaqButton>
      </ToolTip>
      <H1>Order Id: {orderId}</H1>
      <OrderGrid>
        <OrderContainer>
          <Ul>
            <Li>
              <NavButton onClick={(event) => orderStatus(event)} value={101}>
                Reject Order
              </NavButton>
            </Li>
            <Li>
              <NavButton onClick={(event) => orderStatus(event)} value={303}>
                Approve Order
              </NavButton>
            </Li>
            <Li>
              <NavButton onClick={(event) => orderStatus(event)} value={202}>
                Order Inprogress
              </NavButton>
            </Li>
            <Li>
              <NavButton onClick={(event) => orderPaid(event)} value={404}>
                Mark Paid
              </NavButton>
            </Li>
            <Li style={{ float: "right" }}>
              <NavButton
                onClick={(event) => progress_status(event)}
                value={404}
              >
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
          <h2 style={{ paddingLeft: "1rem" }}>From Client</h2>
          {data.files !== "" ? (
            <FileRow>
              <FolderImage
                src={fileFolder}
                alt="Folder representing downloadable files."
              />
              <FileTitle href={data.files}>Data File</FileTitle>
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
          {data.admin_files === null || data.admin_files === "" ? (
            <AdminUploadForm orderId={orderId} />
          ) : (
            <></>
          )}
        </FileHold>
      </OrderGrid>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
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
