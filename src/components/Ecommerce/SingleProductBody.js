import React,{useState} from "react";
import ProductDetail from "./ProductDetail";
import styled from "styled-components";
import cardBg from "../../assets/images/card.jpg";

const SingleProductBody = ({ data }) => {
  const [isOpen,setIsOpen] = useState(false);
  const openProductDetails = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };
  return (<>
    <PaperBody onClick={(event)=>openProductDetails(event)}>
      <PaperTitle>{data.title}</PaperTitle>
      <PaperDescription>{data.description}</PaperDescription>
    </PaperBody>
    {isOpen?<ProductDetail data={data}/>:<></>}
  </>
  );
};

export default SingleProductBody;

const PaperBody = styled.div`
  width: 100%;
  height: 90%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${cardBg});
  background-position: center;
  background-size: 100%;
  border-radius: 5px;
`;
const PaperTitle = styled.h1`
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serify;
  padding-left: 2rem;
`;
const PaperDescription = styled.p`
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-left: 2rem;
`;
