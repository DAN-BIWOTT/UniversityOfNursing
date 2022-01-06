import React from 'react'
import styled from 'styled-components'

const SortingBar = () => {
    return (
        <Container>
            <Property>Order Id</Property>
            <Topic>Topic</Topic>
            <Pages>Pages/words</Pages>
            <Budget>Amount Paid</Budget>
            <Duration>Duration</Duration>
            <Subject>Order Status</Subject>
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
`

const Property = styled(Text)`
    width: 30%;
`

const Subject = styled(Text)`
    width: 15%;
`

const Topic = styled(Text)`
    width: 10%;
`

const Pages = styled(Text)`
    width: 15%;
`

const Budget = styled(Text)`
     width: 15%;
`
const Duration = styled(Text)`
    width: 15%;
`