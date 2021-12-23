import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import AllOrdersList from '../../components/main/users/Users'

const AllOrders = () => {
    return (
        <Container>
        <Sidebar/>
        <Nav/>
        <AllOrdersList title="All Orders" count={2}  />
    </Container>
    )
}

export default AllOrders

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`
