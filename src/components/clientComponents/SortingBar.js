import React from 'react'
import styled from 'styled-components'

const SortingBar = () => {
    return (
        <Container>
            <Id>Id</Id>
            <Email>Email</Email>
            <FullName>Full Name</FullName>
            <CreatedAt>Date Signed Up</CreatedAt>
        </Container>
    )
}

export default SortingBar

const Container = styled.div`
    display: flex;
    padding: 0.4rem 1rem;
    background-color: ${({ theme }) => theme.secondary};
    margin: 2rem 0;
    border-radius: 5px;
`

const Text = styled.h1`
    font-size: 0.6rem;
    text-transform: uppercase;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
    font-size: clamp(1rem,1vw, 1rem);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: bold;
`

const Email = styled(Text)`
    width: 20%;
`

const FullName = styled(Text)`
    width: 15%;
`

const Id = styled(Text)`
    width: 10%;
`

const CreatedAt = styled(Text)`
    width: 15%;
`

const Budget = styled(Text)`
     width: 15%;
`
const Duration = styled(Text)`
    
`