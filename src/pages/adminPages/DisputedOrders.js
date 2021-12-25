import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import DisputedOrdersList from '../../components/main/users/Users'

const DisputedOrder = () => {
    const DisputedOrdersQuery = `query DisputedOrders {
        order(order_by: {created_at: desc}, where: {dispute_status: {_eq: 1}}) {
            id
            subject
            pages
            budget
            due_time
            price
            topic
            created_at
          }
      }`
    useEffect(() => {
        getDisputedOrders()
    }, []);
    const [data, setData] = useState([])
    const getDisputedOrders = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: DisputedOrdersQuery,
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: DisputedOrders.js ~ line 25 ~ getDisputedOrders ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar permission="admin"/>
        <Nav/>
        <DisputedOrdersList data={data} title="Disputed Orders" count={data.length}  />
    </Container>
    )
}

export default DisputedOrder

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`