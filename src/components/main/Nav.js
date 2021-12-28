import React, { useState } from "react";
import styled from "styled-components";
import Image from "../../assets/images/profile.jpg";
import { Icon } from "@iconify/react";
import { logout } from "../../services/auth";

const ImageButton = styled.button`
background-color: transparent;
border: none;
&:hover{
    box-shadow: 0px,4px,4px,0px rgba(0, 0, 0, 0.2);
}
`;

const Nav = () => {
  const [isActive, setIsActive] = useState(true);

  const toggleDrop = () => {
    setIsActive(!isActive);
  };
  return (
    <Container>
      <MessageIcon icon={`mdi-light:bell`} inline={false}></MessageIcon>
      <DropDown>
        <ImageButton onClick={toggleDrop}>
          <ProfileImg src={Image} />
        </ImageButton>
        {!isActive ? (
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
position: relative;
display: inline-block;
`