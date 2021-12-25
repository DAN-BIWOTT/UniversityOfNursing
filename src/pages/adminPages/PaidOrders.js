import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import PaidOrdersList from '../../components/main/users/Users'

const PaidOrders = () => {
    const PaidOrdersQuery = `query PaidOrders {
        order(order_by: {created_at: desc}, where: {payment_status: {_eq: 404}}) {
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
        getPaidOrders()
    }, []);
    const [data, setData] = useState([])
    const getPaidOrders = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: PaidOrdersQuery,
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: PaidOrders.js ~ line 25 ~ getPaidOrders ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar permission="admin"/>
        <Nav/>
        <PaidOrdersList data={data} title="Paid Orders" count={data.length}  />
    </Container>
    )
}

export default PaidOrders

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`