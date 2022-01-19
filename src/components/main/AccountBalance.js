import React from 'react'
import styled from 'styled-components'

const AccountBalance = () => {
    return (

        <Text>
            Account Balance: 30$
        </Text>
    )
}

export default AccountBalance

const Text = styled.h1`
font-size: clamp(1rem, 1vw, 1rem);
width: 90%;
`