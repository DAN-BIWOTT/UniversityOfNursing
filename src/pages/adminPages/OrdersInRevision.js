import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import OrdersInRevisionList from '../../components/main/users/Users'

const OrdersInRevision = () => {
    const OrdersInRevisionQuery = `query OrdersInRevision {
        order(order_by: {created_at: desc}, where: {revision_status: {_eq: 101}}) {
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
        getOrdersInRevision()
    }, []);
    const [data, setData] = useState([])
    const getOrdersInRevision = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: OrdersInRevisionQuery,
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: OrdersInRevision.js ~ line 25 ~ getOrdersInRevision ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar permission="admin"/>
        <Nav/>
        <OrdersInRevisionList data={data} title="Orders In Revision" count={data.length}  />
    </Container>
    )
}

export default OrdersInRevision

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`