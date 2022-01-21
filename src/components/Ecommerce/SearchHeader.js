import React, { useState, useEffect } from "react";
import styled from "styled-components";
import searchSvg from "../../assets/images/icons8-search.svg";
import logo1 from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo-white1.png";
import { AiOutlineShopping } from "react-icons/ai";
import { navigate } from "gatsby";

const SearchHeader = () => {
  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);
    return () => {
      window.removeEventListener("scroll", resizeHeaderOnScroll);
    };
  }, []);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    cartCountFunc();
  } ,[cartCount]);
  const cartCountFunc = () => {
    var retrievedCart = localStorage.getItem("UON_Cart") != null ?localStorage.getItem("UON_Cart"):"";
    const cart = retrievedCart.split("|")
    console.log(cart.length);
    setCartCount(cart.length);
  };
  const [imageUrl, setImageUrl] = useState(logo1);
  const resizeHeaderOnScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 0,
      navbar = document.getElementById("navbar");
    const image = document.getElementById("image");
    if (distanceY > shrinkOn) {
      //after scroll
      navbar.style.height = "14vh";
      navbar.style.marginTop = "-10vh";
      image.style.paddingTop = "2rem";
      setImageUrl(logo2);
    } else {
      //before scroll
      navbar.style.marginTop = "0vh";
      navbar.style.height = "20vh";
      setImageUrl(logo1);
    }
  };
  return (<>
  <Container id="navbar">
      <LogoContainer>
        <Img
          onClick={() => {
            navigate("/");
          }}
          src={imageUrl}
          alt=""
          id="image"
        />
      </LogoContainer>
      <SearchContainer>
        <Input placeholder="Search for..." />
      </SearchContainer>
      <CheckOutContainer>
        <Span>{cartCount}</Span>
        <AiOutlineShopping
          size={"6vh"}
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      </CheckOutContainer>
    </Container>

    <CartContainer>

    </CartContainer>
  </>
    
  );
};

export default SearchHeader;

const CartContainer = styled.div`
position: fixed;
height: 100vh;
width: 10vw;
right: 0;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: white;
  box-shadow: 2px 10px 9px 1px rgba(0, 0, 0, 0.1);
  transition: 0.4s;
  position: fixed;
  z-index: 99;
  width: 100%;
`;
const LogoContainer = styled.div``;

const SearchContainer = styled.div``;

const Img = styled.img`
  max-height: 19vh;
  padding-left: 4rem;
  max-width: 30vw;
  cursor: pointer;
`;

const CheckOutContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
const Input = styled.input`
  width: 45vw;
  height: 8vh;
  margin-top: 2rem;
  border-radius: 25px;
  border-width: 1px;
  background-image: url(${searchSvg});
  background-position: 10px 10px;
  background-size: 2rem;
  background-repeat: no-repeat;
  padding-left: 50px;
  font-size: clamp(0.5rem, 1.5vw, 2rem);
  :focus {
    border-width: 1px;
  }
`;

const Span = styled.span`
  position: absolute;
  left: 41%;
  top: 50%;
  background: grey;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 0px 0px 2px 5px;
`;
