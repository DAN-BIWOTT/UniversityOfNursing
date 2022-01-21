import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCartPlus } from 'react-icons/fa';
import styled from "styled-components";

const AddToCart = ({data}) => {
    let productInfo = data
    const setCart = (event) =>{
        event.preventDefault();
        if(localStorage.getItem("UON_Cart") != null){
            var retrievedCart=localStorage.getItem("UON_Cart");
            localStorage.setItem('UON_Cart', retrievedCart+"|"+JSON.stringify(productInfo));
        }else{
            localStorage.setItem('UON_Cart', JSON.stringify(productInfo));
        }
        toast("Item Added To Cart.")
    }
  return (
    <Button onClick={(event) => setCart(event)}>
      <FaCartPlus
        size={"5vh"}
        style={{
          float: "right",
          marginRight: "2rem",
          marginTop: "0.4rem",
          cursor: "pointer",
        }}
      />
      <Toaster />
    </Button>
  );
};

export default AddToCart;

const Button = styled.button`
width: auto;
height: fit-content;
background-color: transparent;
border: none;
float:right;
cursor: pointer;
`