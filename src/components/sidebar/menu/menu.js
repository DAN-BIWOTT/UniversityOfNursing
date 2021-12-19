import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'

const Menu = () => {
    return (
        <Container>
            <MenuItem title="Home" icon="home" />
            <MenuItem title="Users" icon="account" active/>
            <MenuItem title="Sites" icon="sitemap" />
            <MenuItem title="Payments" icon="bank" />
            <MenuItem title="Settings" icon="cog" />
        </Container>
    )
}

export default Menu

const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
`