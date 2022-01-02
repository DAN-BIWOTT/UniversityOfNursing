import { navigate } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import {IoIosArrowBack} from "react-icons/io"

const BackButton = () => {
    return (
        <Button onClick={()=>{navigate(0)}}>
            <IoIosArrowBack style={style} />
        </Button>
    )
}

export default BackButton
const Button = styled.button`
margin-top: 4rem;
width: 5rem;
min-height: 2rem;
height: fit-content;
border: none;
background-color: transparent;
box-shadow: 1px 10px 8px 1px rgba(0, 0, 0, 0.25);
:hover{
    box-shadow: 2px 14px 9px 2px rgba(0, 0, 0, 0.25);
}
`
const style = {size:'5rem',fontWeight:'bold',fontSize:'3em'}
