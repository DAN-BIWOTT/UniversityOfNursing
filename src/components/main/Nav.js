import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profile.jpg'
import { Icon } from "@iconify/react";

const Nav = () => {
    return (
        <Container>
            <MessageIcon icon={`mdi-light:email`} inline={false} ></MessageIcon>
            <ProfileImg src={Image}/>
        </Container>
    )
}

export default Nav

const Container = styled.div`
    display: flex;
    padding: 1rem;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 3rem;
`
const ProfileImg = styled.img`
    border-radius: 50%;
    height: 2rem;
    margin: 0 1rem;
    cursor: pointer;
`
const MessageIcon = styled(Icon)`
    color: ${({theme})=> theme.colorGrey};
    font-size: 27px;
    cursor: pointer;
`
