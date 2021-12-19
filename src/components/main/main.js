import React from 'react'
import styled from 'styled-components'
import NewUserBtn from '../sidebar/menu/NewUserBtn'
import Nav from './Nav'
import Users from '../main/users/Users'

const Main = () => {

    return (
        <Container>
            <Nav/>
            <NewUserBtn />
            <Users title="Active URLs Summary" count={2}  />
            <Users title="Inactive URLs Summary" count={3}  />
        </Container>
    )
}

export default Main

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`