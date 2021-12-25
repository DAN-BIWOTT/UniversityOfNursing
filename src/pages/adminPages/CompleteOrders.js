import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import CompleteOrdersList from '../../components/main/users/Users'

const CompleteOrders = () => {
    return (
        <Container>
            <Sidebar permission="admin"/>
            <Nav/>
            <CompleteOrdersList title="Complete Orders" count={2} />
        </Container>
    )
}

export default CompleteOrders
const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`
