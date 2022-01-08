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
                    <MenuLink to="/adminPages/IncompleteOrders"><MenuItem title="Incomplete Orders" icon="sitemap" /></MenuLink>
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
                    <MenuLink to="/clientPages/CompleteSubmissions"><MenuItem title="Completed Orders" icon="sitemap" /></MenuLink>
                    <MenuLink to="/clientPages/IncompleteSubmissions"><MenuItem title="Orders in progress" icon="sitemap" /></MenuLink>
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

    overflow-y: scroll;
overflow-x: hidden;
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 6px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: grey; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
`
const MenuLink = styled(Link)`
text-decoration: none;
`