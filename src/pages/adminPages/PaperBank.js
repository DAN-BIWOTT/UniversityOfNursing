import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'

const PaperBank = () => {
    return (
        <Container>
            <Sidebar permission="admin"/>
            <Nav/>
        </Container>
    )
}

export default PaperBank

const Container = styled.div`
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`