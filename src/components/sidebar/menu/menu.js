import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'

const Menu = () => {
    return (
        <Container>
            <MenuItem title="Home" icon="home" />
            <MenuItem title="All orders" icon="account" active/>
            <MenuItem title="Complete Orders" icon="sitemap" />
            <MenuItem title="Paid Orders" icon="bank" />
            <MenuItem title="Disputed Orders" icon="cog" />
            <MenuItem title="Orders in Revision" icon="cog" />
            <MenuItem title="All Users" icon="cog" />
            <MenuItem title="Paper Bank" icon="cog" />
            <MenuItem title="Blog" icon="cog" />
        </Container>
    )
}

export default Menu

const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
`