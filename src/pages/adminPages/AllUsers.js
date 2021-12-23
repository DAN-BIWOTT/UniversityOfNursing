import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'

const AllUsers = () => {
    return (
        <Container>
        <Sidebar/>
        <Nav/>
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