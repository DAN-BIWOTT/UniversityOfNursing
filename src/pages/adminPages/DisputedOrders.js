import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import DisputedOrdersList from '../../components/main/users/Users'

const DisputedOrders = () => {
    return (
        <Container>
            <Sidebar permission="admin"/>
            <Nav/>
            <DisputedOrdersList title="Disputed Orders" count={2}/>
        </Container>
    )
}

export default DisputedOrders

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`