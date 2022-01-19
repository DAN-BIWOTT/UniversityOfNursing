import React from "react";
import styled from "styled-components";
import cardBg from "../../assets/images/card.jpg";
import { FaCartPlus } from 'react-icons/fa';

const EcommerceBody = () => {
  return (
    <Container>
      <HeaderSpan>All Papers</HeaderSpan>
      <PapersContainer>
        <PaperCard>
          <PaperBody>
            <PaperTitle>Paper Title</PaperTitle>
            <PaperDescription>
              This is some dummy text meant to serve as a simple placeholder
            </PaperDescription>
          </PaperBody>
          <PaperFooter>
            <PaperPrice>$15</PaperPrice>
            <Button>
              <FaCartPlus size={"5vh"} style={{float:"right",marginRight:"2rem",marginTop:"0.4rem",cursor:"pointer"}}/>
            </Button>
          </PaperFooter>
        </PaperCard>
        <PaperCard>
          <PaperBody>
            <PaperTitle>Paper Title</PaperTitle>
            <PaperDescription>
              This is some dummy text meant to serve as a simple placeholder
            </PaperDescription>
          </PaperBody>
          <PaperFooter>
            <PaperPrice>$15</PaperPrice>
            <Button>
              <FaCartPlus size={"5vh"} style={{float:"right",marginRight:"2rem",marginTop:"0.4rem",cursor:"pointer"}}/>
            </Button>
          </PaperFooter>
        </PaperCard>
        <PaperCard>
          <PaperBody>
            <PaperTitle>Paper Title</PaperTitle>
            <PaperDescription>
              This is some dummy text meant to serve as a simple placeholder
            </PaperDescription>
          </PaperBody>
          <PaperFooter>
            <PaperPrice>$15</PaperPrice>
            <Button>
              <FaCartPlus size={"5vh"} style={{float:"right",marginRight:"2rem",marginTop:"0.4rem",cursor:"pointer"}}/>
            </Button>
          </PaperFooter>
        </PaperCard>
        <PaperCard>
          <PaperBody>
            <PaperTitle>Paper Title</PaperTitle>
            <PaperDescription>
              This is some dummy text meant to serve as a simple placeholder
            </PaperDescription>
          </PaperBody>
          <PaperFooter>
            <PaperPrice>$15</PaperPrice>
            <Button>
              <FaCartPlus size={"5vh"} style={{float:"right",marginRight:"2rem",marginTop:"0.4rem",cursor:"pointer"}}/>
            </Button>
          </PaperFooter>
        </PaperCard>
        <PaperCard>
          <PaperBody>
            <PaperTitle>Paper Title</PaperTitle>
            <PaperDescription>
              This is some dummy text meant to serve as a simple placeholder
            </PaperDescription>
          </PaperBody>
          <PaperFooter>
            <PaperPrice>$15</PaperPrice>
            <Button>
              <FaCartPlus size={"5vh"} style={{float:"right",marginRight:"2rem",marginTop:"0.4rem",cursor:"pointer"}}/>
            </Button>
          </PaperFooter>
        </PaperCard>
        <PaperCard>
          <PaperBody>
            <PaperTitle>Paper Title</PaperTitle>
            <PaperDescription>
              This is some dummy text meant to serve as a simple placeholder
            </PaperDescription>
          </PaperBody>
          <PaperFooter>
            <PaperPrice>$15</PaperPrice>
            <Button>
              <FaCartPlus size={"5vh"} style={{float:"right",marginRight:"2rem",marginTop:"0.4rem",cursor:"pointer"}}/>
            </Button>
          </PaperFooter>
        </PaperCard>
      </PapersContainer>
    </Container>
  );
};

export default EcommerceBody;

const Container = styled.div`
  margin-top: 22vh;
  margin-bottom: 3rem;
  margin-left: 3rem;
`;

const HeaderSpan = styled.h1``;
const PapersContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const PaperCard = styled.div`
  width: 395px;
  height: 45vh;
  border-radius: 5px;
  position: relative;
`;
const PaperBody = styled.div`
  width: 100%;
  height: 90%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${cardBg});
  background-position: center;
  background-size: 100%;
  border-radius: 5px;
`;

const PaperFooter = styled.div`
  position: absolute;
  bottom: 0px;
  height: 8vh;
  background-color: white;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
`;

const PaperTitle = styled.h1`
color: #fff;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serify;
padding-left:2rem;
`;
const PaperDescription = styled.p`
color: #fff;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
padding-left:2rem;
`;
const PaperPrice = styled.span`
color: #000;
padding-left:2rem;
margin-right:2rem;
margin-top:2.2rem;
font-size: clamp(1rem, 2.2vw, 2rem);
font-weight: bold;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serify;
`;

const Button = styled.button`
width: auto;
height: fit-content;
background-color: transparent;
border: none;
float:right;
cursor: pointer;
`