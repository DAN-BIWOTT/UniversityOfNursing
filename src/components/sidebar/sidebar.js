import React from 'react'
import styled from 'styled-components'
import Menu from './menu/menu'
import Profile from './profile'
import ToggleSwitch from './ToggleSwitch'

const Sidebar = () => {
    return (
        <Container>
            <Profile />
            <Menu />
            <ToggleSwitch />
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background-color: ${({theme})=>theme.secondary};
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`