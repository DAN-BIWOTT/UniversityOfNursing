import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'

const Menu = ({permission}) => {
    switch (permission) {
        case "admin":
            return (
                <Container>
                    <MenuLink to="/admin"><MenuItem title="Home" icon="home" /></MenuLink>
                    <MenuLink to="/adminPages/AllOrders"><MenuItem title="All orders" icon="account" active/></MenuLink>
                    <MenuLink to="/adminPages/CompleteOrders"><MenuItem title="Complete Orders" icon="sitemap" /></MenuLink>
                    <MenuLink to="/adminPages/PaidOrders"><MenuItem title="Paid Orders" icon="bank" /></MenuLink>
                    <MenuLink to="/adminPages/DisputedOrders"><MenuItem title="Disputed Orders" icon="cog" /></MenuLink>
                    <MenuLink to="/adminPages/OrdersInRevision"><MenuItem title="Orders in Revision" icon="cog" /></MenuLink>
                    <MenuLink to="/adminPages/AllUsers"><MenuItem title="All Users" icon="cog" /></MenuLink>
                    <MenuLink to="/adminPages/PaperBank"><MenuItem title="Paper Bank" icon="cog" /></MenuLink>
                    <MenuLink to="#"><MenuItem title="Blog" icon="cog" /></MenuLink>
                </Container>
            )
    
        default:
            return (
                <Container>
                    <MenuLink to="/client"><MenuItem title="Home" icon="home" /></MenuLink>
                    <MenuLink to="/clientPages/AllSubmissions"><MenuItem title="All Submissions" icon="account" active/></MenuLink>
                    <MenuLink to="/clientPages/CompleteSubmissions"><MenuItem title="Complete Submissions" icon="sitemap" /></MenuLink>
                    <MenuLink to="/clientPages/PaidSubmissions"><MenuItem title="Paid Submissions" icon="bank" /></MenuLink>
                    <MenuLink to="/clientPages/CompleteTransactions"><MenuItem title="Complete Transactions" icon="cog" /></MenuLink>
                    <MenuLink to="/clientPages/PendingTransactions"><MenuItem title="Pending Transactions" icon="cog" /></MenuLink>
                </Container>
            )
    }
    
}

export default Menu

const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
`
const MenuLink = styled(Link)`
text-decoration: none;
`