import React from "react";
import styled from "styled-components";
import { BsQuestionLg } from "react-icons/bs";
import BackButton from "./BackButton";
const ViewRevision = ({data}) => {
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
          <form>
            <ColumnGrid>
              <Label>*Revision Instructions: </Label>
              <TextAreaInput
                type="text"
                maxLength="700"
                // onChange={(event) => {
                //   setRevisionDescription(event.target.value);
                // }}
                value={data}
              />
            </ColumnGrid>
          </form>
        </Container>
      </EditContainer>
    </EditGrid>
  </div>
  )
}

export default ViewRevision;
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