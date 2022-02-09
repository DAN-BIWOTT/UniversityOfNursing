import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "../../assets/images/profile.jpg";
import { Icon } from "@iconify/react";
import { logout } from "../../services/auth";
import {
  onValue,
  ref,
  remove
} from "firebase/database";
import AdminOrderDetail from "../../../pages/adminPages/AdminOrderDetail";
import { database } from "../../utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import AccountBalance from "./AccountBalance";

const Nav = () => {
  useEffect(() => {
    getNotifications();
  }, []);
  const [notifications, setNotifications] = useState([
    {
      created_at: 0,
      sender: "",
      msg: "",
    },
  ]);
  const getNotifications = async () => {
    let now = Date.now();
    const chatRef = ref(database, "GeneralNotifications/");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      let notificationArray = [];
      for (let notificationList in data) {
        notificationArray.push(data[notificationList]);
      }
      setNotifications(notificationArray);
    });
  };

  const [isActive, setIsActive] = useState(false);
  const [notificationIsActive, setNotificationIsActive] = useState(false);
  const toggleDrop = () => {
    setIsActive(!isActive);
  };
  const toggleNotifications = () => {
    setNotificationIsActive(!notificationIsActive);
  };
  const getDate = (created_at) => {
    return `${new Date(created_at).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })} | ${new Date(created_at).getDate()}/${
      new Date(created_at).getMonth() + 1
    }/${new Date(created_at).getFullYear()}`;
  };

  const deleteFromDatabase = async()=>{
    const chatRef = ref(database, "GeneralNotifications/");
    remove(chatRef);
  }
  const eraseNotifications = (event) =>{
    event.preventDefault();
    let confirmAction = window.confirm("This will delete all notifications");
    if (confirmAction) {
      deleteFromDatabase();
    } else {
      toast("Action Cancelled");
    }
  }
  const[showOrder,setShowOrder] = useState(false)
  const[order_id,setOrder_id]= useState(0);
  const goToOrder = (event) =>{
    event.preventDefault();
    if(event.target.value === null || event.target.value ===0 || event.target.value ===""){
      console.log("No id passed ",event.target.value);
    }else{
      console.log("id passed ",event.target.value);
      setOrder_id(event.target.value)
      if(order_id==""||order_id===0){
        console.log("id not set ",event.target.value);
      }else{
        setShowOrder(true);
      }
    }
  }
  if(showOrder==false ){
  return (
    <Container>
      <AccountBalance />
      <Toaster />
      <DropDown>
        <Count>{notifications.length}</Count>
        <MessageIcon
          icon={`mdi-light:bell`}
          inline={false}
          onClick={toggleNotifications}
        />
        {notificationIsActive ? (
          <NotificationDropDownContainer>
            <NotificationDropDownList>
            <MarkButton onClick={event=>eraseNotifications(event)}>Mark All As Read</MarkButton>
              <ListItem>
                {notifications.map((data) => {
                  {
                    console.log(data);
                  }
                  return (
                    <NotificationCard key={data.created_at} onClick={event=>goToOrder(event)} value={28}>
                      <NotificationRow>
                        <NotificationTitle>
                          <p>{data.sender}</p>
                        </NotificationTitle>
                        <NotificationTime>
                          <p>{getDate(data.created_at)}</p>
                        </NotificationTime>
                      </NotificationRow>
                      <hr />
                      <NotificationBody>
                        <p>{data.msg}</p>
                      </NotificationBody>
                      <Button onClick={event=>goToOrder(event)} value={data.orderId}>view</Button>
                    </NotificationCard>
                  );
                })}
              </ListItem>
            </NotificationDropDownList>
          </NotificationDropDownContainer>
        ) : (
          <></>
        )}
      </DropDown>
      <DropDown>
        <ImageButton onClick={toggleDrop}>
          <ProfileImg src={Image} />
        </ImageButton>
        {isActive ? (
          <DropDownContainer>
            <DropDownList>
              <ListItem>
                <Button
                  onClick={() => {
                    logout();
                  }}
                >
                  Log Out
                </Button>
              </ListItem>
            </DropDownList>
          </DropDownContainer>
        ) : (
          <></>
        )}
      </DropDown>
    </Container>
  );
}else{
  return(<AdminOrderDetail orderId={order_id}/>)
}
};

export default Nav;

const MarkButton = styled.button`
height:5vh;
border:none;
background-color: #2061ca;
color:white;
border-radius:5px;
width: 100%;
cursor: pointer;
`

const NotificationCard = styled.div`
  box-shadow: -2px -4px 6px 0px rgba(103, 46, 191, 0.75);
  -webkit-box-shadow: -2px -4px 6px 0px rgba(103, 46, 191, 0.75);
  -moz-box-shadow: -2px -4px 6px 0px rgba(103, 46, 191, 0.75);
  border-radius: 4px;
  width: 95%;
  margin-left: 0.4rem;
  margin-bottom: 1rem;
  background: rgb(193, 38, 219);
  background: linear-gradient(
    0deg,
    rgba(193, 38, 219, 0.10407913165266103) 0%,
    rgba(202, 38, 219, 0.09567577030812324) 100%
  );
  hr {
    color: grey;
    height: 1px;
    width: 50%;
  }
`;

const ImageButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    box-shadow: 0px, 4px, 4px, 0px rgba(0, 0, 0, 0.2);
  }
`;

const NotificationRow = styled.div`
  margin-top: 0.5rem;
  margin-left: -10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0fr;
`;

const NotificationTitle = styled.div`
  margin-bottom: -10%;
  p {
    padding-left: 1.5rem;
    font-size: clamp(1rem, 1rem, 1rem);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 700;
    color: black;
  }
`;

const NotificationTime = styled.div`
  margin-bottom: -10%;
  margin-left: -20px;
  p {
    font-size: clamp(0.8rem, 0.8rem, 0.8rem);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    color: grey;
  }
`;

const NotificationBody = styled.div`
  margin-top: -5%;
  text-align: center;
  p {
    display: inline-block;
    padding-left: 0.5rem;
    font-size: clamp(0.8rem, 0.8rem, 0.8rem);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    color: black;
    text-transform: capitalize;
  }
`;

const NotificationDropDownContainer = styled.div`
  width: 16em;
  right: 0;
  padding-right: 17.5rem;
    margin-right: 10rem;
  position: absolute;
  animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
  z-index: 1;
  max-height: 50vh;

  overflow-y: scroll;
  overflow-x: hidden;
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`;

const NotificationDropDownList = styled.ul`
  width: 20vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 5px;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3rem;
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  height: 2rem;
  margin: 0 1rem;
  cursor: pointer;
`;
const MessageIcon = styled(Icon)`
  color: ${({ theme }) => theme.colorGrey};
  font-size: 27px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  height: fit-content;
  padding: 1vh;
  border: none;
  background-color: #0000ff;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: large;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
  }
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  right: 0;
  padding-left: 1rem;
  position: absolute;
  animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
  z-index: 1;
`;

const DropDownList = styled("ul")`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  font-size: clamp(1rem, 1vw, 1rem);
  cursor: pointer;
`;

const DropDown = styled.div``;

const Count = styled.div`
  background-color: grey;
  color: white;
  position: block;
  display: inline-block;
  top: 0px;
  left: 0px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  padding-left: 0.2em;
`;
