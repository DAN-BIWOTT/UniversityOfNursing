import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import OrdersInRevisionList from '../../components/main/users/Users'

const OrdersInRevision = () => {
    return (
        <Container>
            <Sidebar permission="admin"/>
            <Nav/>
            <OrdersInRevisionList title="Orders In Revision" count={2}/>
        </Container>
    )
}

export default OrdersInRevision

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`