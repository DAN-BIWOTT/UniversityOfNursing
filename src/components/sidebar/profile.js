import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profile.jpg'
import { getUser } from '../../services/auth'

const Profile = () => {
    return (
        <Container>
            <ProfileImg src={Image} />
            <ProfileName>{getUser().username}</ProfileName>
        </Container>
    )
}

export default Profile

const Container = styled.div`
    margin-top: 5rem;
`

const ProfileImg = styled.img`
    height: 5rem;
    border-radius: 50%;
`

const ProfileName = styled.h1`
    font-size: 1rem;
    font-weight: 300;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
`

