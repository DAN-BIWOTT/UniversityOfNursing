import React,{useState} from "react";
import styled from "styled-components";
import placeholderImage from "../../assets/images/placeholderImage.jpg";
import {BiArrowBack} from "react-icons/bi";

const ProductDetail = ({ data }) => {
  const [isOpen,setIsOpen] = useState(true)
  const toggle = (event) =>{
    event.preventDefault();
    setIsOpen(!isOpen)
  }
  if(isOpen){
    return (
      <Container>
        <ColumnOne>
          <Image src={placeholderImage} />
        </ColumnOne>
        <ColumnTwo>
          <Cross onClick={(event)=>toggle(event)}><BiArrowBack size={"2.5rem"}/></Cross>
          <H2>{data.title}</H2>
          <H1>Paper Bank Limited Edition</H1>
          <P>
            {data.description}
          </P>
          <Price>${data.price}</Price>
          <CheckOut>CheckOut</CheckOut>
        </ColumnTwo>
      </Container>
    );
  }else{
    return(<></>);
  }
};

export default ProductDetail;
const Cross = styled.div`
cursor: pointer;
width: 40px;
height: 40px;
transition: 100ms;
:hover{
  border-radius: 50%;
  background: #f2f2f2;
}
:active{
  border-radius: 50%;
  background: #7d858f;
  width: 38px;
height: 38px;
}
`
const Container = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  margin-top: -83.6vh;
  margin-left: -36vw;
  z-index: 900;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  padding: 90px 50px;
  background: #fff;

`;
const ColumnOne = styled.div``;
const ColumnTwo = styled.div`
  padding: 40px;
`;
const Image = styled.img`
margin-top: 22vh;
margin-left: 30vh;
  height: 50vh;
  width: 50vh;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 7px;
`;
const H2 = styled.h2`
  text-transform: uppercase;
  color: rgb(255, 125, 26);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
`;
const H1 = styled.h1`
  font-size: 45px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 40px;
`;
const P = styled.p`
  color: rgb(104, 112, 125);
  margin-bottom: 30px;
  line-height: 1.6;
`;
const Price = styled.span`
  font-size: 25px;
`;
const CheckOut = styled.div`
  height: 55px;
  width: 250px;
  background-color: rgb(255, 125, 26);
  border: none;
  border-radius: 10px;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 100ms ease 0s;
`;
