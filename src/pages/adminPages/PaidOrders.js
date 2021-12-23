import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import PaidOrdersList from '../../components/main/users/Users'

const PaidOrders = () => {
    return (
        <Container>
        <Sidebar/>
        <Nav/>
        <PaidOrdersList title="Paid Orders" count={2}/>
    </Container>
    )
}

export default PaidOrders

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`