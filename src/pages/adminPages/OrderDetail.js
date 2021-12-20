import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'

const OrderDetail = ({id}) => {

    return (
        <Container>
            <Nav/>
        </Container>
    )
}

export default OrderDetail

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`