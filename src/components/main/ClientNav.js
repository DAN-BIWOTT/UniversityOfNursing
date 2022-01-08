import React, { useState } from "react";
import styled from "styled-components";
import Image from "../../assets/images/profile.jpg";
import { Icon } from "@iconify/react";
import { logout } from "../../services/auth";

const ImageButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    box-shadow: 0px, 4px, 4px, 0px rgba(0, 0, 0, 0.2);
  }
`;

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const [notificationIsActive, setNotificationIsActive] = useState(false);
  const toggleDrop = () => {
    setIsActive(!isActive);
  };
  const toggleNotifications = () => {
    setNotificationIsActive(!notificationIsActive);
  };
  return (
    <Container>
      <DropDown>
        <span>12</span>
        <MessageIcon
          icon={`mdi-light:bell`}
          inline={false}
          onClick={toggleNotifications}
        />
        {notificationIsActive ? (
          <NotificationDropDownContainer>
            <NotificationDropDownList>
              <ListItem>
                <NotificationCard>
                  <NotificationRow>
                    <NotificationTitle>
                      <p>Order ID: 34</p>
                    </NotificationTitle>
                    <NotificationTime>
                      <p>12:23 Pm | 12/Dec/2021</p>
                    </NotificationTime>
                  </NotificationRow>
                  <hr />
                  <NotificationBody>
                    <p>
                      Notification Body. Notification Body. Notification Body.
                    </p>
                  </NotificationBody>
                </NotificationCard>
                <NotificationCard>
                  <NotificationRow>
                    <NotificationTitle>
                      <p>Order ID: 34</p>
                    </NotificationTitle>
                    <NotificationTime>
                      <p>12:23 Pm | 12/Dec/2021</p>
                    </NotificationTime>
                  </NotificationRow>
                  <hr />
                  <NotificationBody>
                    <p>
                      Notification Body. Notification Body. Notification Body.
                    </p>
                  </NotificationBody>
                </NotificationCard>
                <NotificationCard>
                  <NotificationRow>
                    <NotificationTitle>
                      <p>Order ID: 34</p>
                    </NotificationTitle>
                    <NotificationTime>
                      <p>12:23 Pm | 12/Dec/2021</p>
                    </NotificationTime>
                  </NotificationRow>
                  <hr />
                  <NotificationBody>
                    <p>
                      Notification Body. Notification Body. Notification Body.
                    </p>
                  </NotificationBody>
                </NotificationCard>
                <NotificationCard>
                  <NotificationRow>
                    <NotificationTitle>
                      <p>Order ID: 34</p>
                    </NotificationTitle>
                    <NotificationTime>
                      <p>12:23 Pm | 12/Dec/2021</p>
                    </NotificationTime>
                  </NotificationRow>
                  <hr />
                  <NotificationBody>
                    <p>
                      Notification Body. Notification Body. Notification Body.
                    </p>
                  </NotificationBody>
                </NotificationCard>
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
};

export default Nav;

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

const NotificationRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0fr;
`;

const NotificationTitle = styled.div`
  p {
    padding-left: 0.5rem;
    font-size: clamp(1rem, 1rem, 1rem);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 700;
    color: black;
  }
`;

const NotificationTime = styled.div`
  p {
    font-size: clamp(0.8rem, 0.8rem, 0.8rem);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    color: grey;
  }
`;

const NotificationBody = styled.div`
  p {
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
  padding-left: 1rem;
  position: absolute;
  animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
  z-index: 1;
  max-height: 50vh;

  overflow-y: scroll;
  overflow-x: hidden;
  /* width */
  ::-webkit-scrollbar {
    width: 20px;
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

const DropDown = styled.div`
  span {
    background-color: grey;
    color: white;
    position: flex;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;