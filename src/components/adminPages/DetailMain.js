import React from 'react'
import styled from 'styled-components';

const DetailMain = ({orderId}) => {
    return (
        <div>
           <H1>Item Id: {orderId}</H1> 
        </div>
    )
}

export default DetailMain;

const H1 = styled.h1`
color: black;
`