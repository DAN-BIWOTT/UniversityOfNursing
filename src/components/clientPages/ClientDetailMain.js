import React, { useState,useEffect } from "react";
import styled from "styled-components";
import ColorStatus from "../icons/ColorStatus";
import ChatBox from "../ChatBox";
import fileFolder from "../../assets/images/fileFolder.png";
import BackButton from "../BackButton";
import { dispute_query, EditOrderForm_query, revision_query } from "../../graphQl/uonQueries";
import toast from "react-hot-toast";
import { BsQuestionLg } from "react-icons/bs";
import TransactionModal from "../transaction/TransactionModal";
import ClientUploadForm from "./ClientUploadForm";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";
import Loader from "react-loader-spinner";
import { sendGeneralNotification } from "../../utils/chats";
import Spinner from "../Spinner";
import { LineSpacing, NatureDropDown, PaperFormat, Subjects } from "../clientComponents/newOrderForm.data";
import { navigate } from "gatsby";

const ClientDetailMain = ({ data, orderId }) => {
//console.log("🚀 ~ file: ClientDetailMain.js ~ line 19 ~ ClientDetailMain ~ data", data)
const [price, setPrice] = useState(data.price);
const [paperFormat, setPaperFormat] = useState(data.doc_format);
const [nature, setNature] = useState(data.nature);
const [pages, setPages] = useState(data.pages);
const [deadline, setDeadline] = useState(data.due_time);
const [spacing, setSpacing] = useState(data.spacing);
const [subject, setSubject] = useState(data.subject);
const [topic, setTopic] = useState(data.topic);
const [description, setDescription] = useState(data.doc_description);
const [revisionDescription, setRevisionDescription] = useState("");
const [waitingButton, setWaitingButton] = useState(false);
let clientId = data.client_id;
  const emptyFields = () => {
    if (
      price === "" ||
      paperFormat === "" ||
      nature === "" ||
      pages === "" ||
      deadline === "" ||
      subject === "" ||
      topic === "" ||
      description === ""
    )
      return true;
    return false;
  };
  let [check,setCheck] = useState(true)
  useEffect(() => {
    if(typeof price=="undefined" && check===true){
      setPrice(data.price);
      setPaperFormat(data.doc_format);
      setNature(data.nature);
      setPages(data.pages);
      setDeadline(data.due_time);
      setSpacing(data.spacing);
      setSubject(data.subject);
      setTopic(data.topic);
      setDescription(data.doc_description);
      emptyFields()===false?"":setCheck(false);
      //console.log("Price test ~ data", price);
    }
  });
  let GeneralNotification = {
    created_at: 0,
    sender: "",
    msg: "",
    order_id: orderId
  };
  const EditOrderFormQuery = EditOrderForm_query
  const submitOrder = async () => {
    if (emptyFields()) {
      toast("Fields with stars cant be left empty!", {
        style: { background: "#DC143C" },
      });
      setWaitingButton(false);
      return false;
    }
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: EditOrderFormQuery,
        variables: {
          orderId,
          clientId,
          price,
          paperFormat,
          nature,
          pages,
          deadline,
          spacing,
          subject,
          topic,
          description
        },
      }),
    });

    try {
      const finalRes = await response.json();
      //console.log(finalRes);
      GeneralNotification.created_at = Date.now();
      GeneralNotification.sender = "Client";
      GeneralNotification.msg = "Order Edited: ".concat(orderId);
      //console.log(GeneralNotification)
      sendGeneralNotification(GeneralNotification);
      toast("Your Order Has Been Edited.", {
        style: { background: "#00FF00" },
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
      setWaitingButton(false);
    } catch (e) {
      //console.log("error at: ",e)
      toast("Problem Editing Creating.", { style: { background: "#DC143C" } });
      setWaitingButton(false);
    }
  };

  var progressStatus,
    colorProgressTitle,
    paymentStatus,
    colorPaymentTitle,
    acceptanceStatus,
    colorAcceptanceTitle;
    var fileArray;
          if (typeof data.filesByOrderId !== "undefined"){
            fileArray = data.filesByOrderId
            //console.log(fileArray);
          }else{
            fileArray = []
            //console.log(data.filesByOrderId);
          }
  const date = `${new Date(data.created_at).getDate()}/${new Date(data.created_at
  ).getMonth()}/${new Date(data.created_at).getFullYear()}`;
  const [pageLoader, setPageLoader] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(<Spinner />);
  useEffect(() => {
    pageLoader ? setLoadingScreen(<Spinner />) : setLoadingScreen(<></>);
  }, [pageLoader]);
  switch (data.progress_status) {
    case 0:
      progressStatus = "red";
      colorProgressTitle = "Incomplete";
      break;
    case 404:
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
    case 404:
      paymentStatus = "green";
      colorPaymentTitle = "Paid";
      break;

    default:
      paymentStatus = "neutral";
      colorPaymentTitle = "Not Paid";
      break;
  }

  switch (data.acceptance_status) {
    case 101:
      acceptanceStatus = "red";
      colorAcceptanceTitle = "Declined";
      break;
    case 303:
      acceptanceStatus = "green";
      colorAcceptanceTitle = "Accepted";
      break;

    default:
      acceptanceStatus = "neutral";
      colorAcceptanceTitle = "Waiting Acceptance";
      //console.log(data)
      break;
  }


  const disputeQuery = dispute_query;
  const revisionQuery = revision_query;
  const changeDisputeStatus = async () => {
    setPageLoader(true)
    let disputeValue = 1
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
    //console.log(finalResp);
    if (finalResp.data.update_order_by_pk.dispute_status === 1) {
      let notification = {
        created_at: Date.now(),
        sender: "Order: ".concat(orderId),
        msg: "Dispute filed",
        order_id: orderId
      };
      sendGeneralNotification(notification);
      setPageLoader(false);
      toast("dispute filed", { style: { background: "#a92d2d" } });
    }else{
      setPageLoader(false);
      toast("dispute unfiled", { style: { background: "#a92d2d" } });
    }
  };
  const changeRevisionStatus = async () => {
    setPageLoader(true)
    let revisionValue = 1
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: revisionQuery,
        variables: {
          orderId,
          revisionValue,
          revisionDescription
        },
      }),
    });
    const finalResp = await response.json();
    if (finalResp.data.update_order_by_pk.revision_status === 1) {
      let notification = {
        created_at: Date.now(),
        sender: "Order: ".concat(orderId),
        msg: "Request for Revision",
        order_id: orderId
      };
      sendGeneralNotification(notification);
      setPageLoader(false)
      toast("Request for Revision filed", { style: { background: "#a92d2d" } });
    }
  };

  const disputeButton = (event) => {
    event.preventDefault();
    let ConfirmWithClient = window.confirm("Are You Sure You Want To Change Dispute Status?")
    if(ConfirmWithClient)changeDisputeStatus();
  };
  const revisionButton = (event) => {
    event.preventDefault();
    let ConfirmWithClient = window.confirm("Are You Sure You Want To Change Revision Status?")
    if(ConfirmWithClient)changeRevisionStatus();
  };
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
        //console.log(error);
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
    //console.log(finalRes);
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

  const [editState, setEditState] = useState(false);
  const [revisionState, setRevisionState] = useState(false);
  const editTrigger = (event) => {
    event.preventDefault();
    setEditState(true);
  };
  const revisionTrigger = (event) => {
    event.preventDefault();
    setRevisionState(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingButton(true);
    submitOrder()
  };
  if (editState === false && revisionState === false) {
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
            <NavButton onClick={(event) => revisionTrigger(event)}>
                Revision
              </NavButton>
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
          <Button onClick={(event) => editTrigger(event)}>Edit Order</Button>
        </OrderSummary>
        <ChatBox sender="client" orderData={orderId} />
        <FileHold>
          <H1>Project Files</H1>
          <h2 style={{ paddingLeft: "1rem" }}>From Client</h2>
          {fileArray.map((filesData)=>{
              {if(filesData.sender == "client")return(<FileRow>
              <FolderImage
                src={fileFolder}
                alt="Folder representing downloadable files."
              />
              <FileTitle href={filesData.file}>{filesData.fileName}</FileTitle>
            </FileRow>)}
      })}
      <h2 style={{ paddingLeft: "1rem" }}>From Admin</h2>
      {fileArray.map((filesData)=>{
            {if(filesData.sender == "admin")return(<FileRow>
            <FolderImage
              src={fileFolder}
              alt="Folder representing downloadable files."
            />
            <FileTitle href={filesData.file}>{filesData.fileName}</FileTitle>
          </FileRow>)}
          })}
          <ClientUploadForm orderId={orderId} />
        </FileHold>
      </OrderGrid>
    </div>
  );
} else if(editState === true && revisionState === false){
  return (
    <div>
      <BackButton />
      <ToolTip>
        <FaqButton>
          <BsQuestionLg color="black" size="clamp(1rem,1vw,1rem)" />
          <ToolTipText className="tooltiptext">
            HELP
            <br />
            To start chats about the assignment with the admin, press the
            start chat button below.
          </ToolTipText>
        </FaqButton>
      </ToolTip>
      <EditGrid>
        <EditContainer>
          <Container>
            <Title>Edit Order</Title>
            <form onSubmit={handleSubmit}>
              <RowGrid>
                <ColumnGrid>
                  <Label>*Price: </Label>
                  <Input
                    placeholder="EXAMPLE: $25"
                    type="number"
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                    value={price}
                  />
                </ColumnGrid>

                <ColumnGrid>
                  <Label>*Paper Format: </Label>
                  <InputSelect
                    onChange={(event) => setPaperFormat(event.target.value)}
                    value={paperFormat}
                  >
                    {PaperFormat.map((data) => {
                      return (
                        <option
                          value={data.paper_format_id}
                          key={data.paper_format_id}
                        >
                          {data.paper_format}
                        </option>
                      );
                    })}
                  </InputSelect>
                </ColumnGrid>
                <ColumnGrid>
                  <Label>*Nature: </Label>
                  <InputSelect
                    onChange={(event) => {
                      setNature(event.target.value);
                    }}
                    value={nature}
                  >
                    {NatureDropDown.map((data) => {
                      return (
                        <option value={data.named_id} key={data.named_id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </InputSelect>
                </ColumnGrid>

                <ColumnGrid>
                  <Label>*Pages: </Label>
                  <Input
                    placeholder="EXAMPLE: 2 pages"
                    onChange={(event) => {
                      setPages(event.target.value);
                    }}
                    value={pages}
                  />
                </ColumnGrid>
                <ColumnGrid>
                  <Label>*Deadline: </Label>
                  <Input
                    type="datetime-local"
                    onChange={(event) => {
                      setDeadline(event.target.value);
                    }}
                    value={deadline}
                  />
                </ColumnGrid>

                <ColumnGrid>
                  <Label>Spacing: </Label>
                  <InputSelect
                    onChange={(event) => setSpacing(event.target.value)}
                    value={spacing}
                  >
                    {LineSpacing.map((data) => {
                      return (
                        <option
                          value={data.lineSpace}
                          key={data.lineSpace_id}
                        >
                          {data.lineSpace}
                        </option>
                      );
                    })}
                  </InputSelect>
                </ColumnGrid>
                <ColumnGrid>
                  <Label>*Subject: </Label>
                  <InputSelect
                    onChange={(event) => {
                      setSubject(event.target.value);
                    }}
                    value={subject}
                  >
                    {Subjects.map((data) => {
                      return (
                        <option
                          value={data.subject_named_id}
                          key={data.subject_named_id}
                        >
                          {data.subject_name}
                        </option>
                      );
                    })}
                  </InputSelect>
                </ColumnGrid>
              </RowGrid>

              <ColumnGrid>
                <Label>*Topic: </Label>
                <Input
                  placeholder="EXAMPLE: Introductory Physiology"
                  onChange={(event) => {
                    setTopic(event.target.value);
                  }}
                  value={topic}
                />
              </ColumnGrid>

              <ColumnGrid>
                <Label>*Description: </Label>
                <TextAreaInput
                  type="text"
                  maxLength="700"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  value={description}
                />
              </ColumnGrid>
              <ColumnGrid>
                {waitingButton ? (
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={40}
                    width={40}
                    style={{ marginLeft: "40%" }}
                  />
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </ColumnGrid>
            </form>
          </Container>
        </EditContainer>
      </EditGrid>
    </div>
  );
} else {
  return (
    <div>
    <BackButton />
    <ToolTip>
      <FaqButton>
        <BsQuestionLg color="black" size="clamp(1rem,1vw,1rem)" />
        <ToolTipText className="tooltiptext">
          HELP
          <br />
          To start chats about the assignment with the admin, press the
          start chat button below.
        </ToolTipText>
      </FaqButton>
    </ToolTip>
    <EditGrid>
      <EditContainer>
        <Container>
          <Title>Revise Order</Title>
          <form onSubmit={revisionButton}>
            <ColumnGrid>
              <Label>*Revision Instructions: </Label>
              <TextAreaInput
                type="text"
                maxLength="700"
                onChange={(event) => {
                  setRevisionDescription(event.target.value);
                }}
                value={revisionDescription}
              />
            </ColumnGrid>
            <ColumnGrid>
              {waitingButton ? (
                <Loader
                  type="Bars"
                  color="#00BFFF"
                  height={40}
                  width={40}
                  style={{ marginLeft: "40%" }}
                />
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </ColumnGrid>
          </form>
        </Container>
      </EditContainer>
    </EditGrid>
  </div>
  )
}
};

export default ClientDetailMain;
const EditGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
`;
const EditContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: auto;
  background: white;
  display: block;
  justify-content: left;
  align-items: center;
  border-radius: 20px;
`;
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

const Container = styled.div`
  display: block;
  width: 67vw;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(190, 190, 190, 0.22);
  cursor: pointer;
  background-color: #fff;
  transition: all ease-in-out 300ms;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: clamp(2rem, 1vw, 1rem);
  font-weight: bold;
  margin-left: 40%;
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
`;
const ColumnGrid = styled.div`
  margin-left: 1rem;
  display: block;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.h3`
  margin-top: 1px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
`;
const Input = styled.input`
  width: 70%;
  height: 7vh;
  margin-left: 10px;
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

const InputSelect = styled.select`
  width: 70%;
  height: 8vh;
  margin-left: 10px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 0px 0px 0px 1rem;
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  padding: 1rem;
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;

const TextAreaInput = styled.textarea`
  width: 90%;
  height: 20vh;
  margin-left: 10px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;
