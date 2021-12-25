import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import AllUsersList from '../../components/main/users/Users'

const AllUsers = () => {
    return (
        <Container>
        <Sidebar permission="admin"/>
        <Nav/>
        <AllUsersList title="All Users" count={2} />
    </Container>
    )
}

export default AllUsers
const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`
