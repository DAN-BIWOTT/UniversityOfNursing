import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import CompleteOrdersList from '../../components/main/users/Users'

const CompleteOrder = () => {
    const CompleteOrdersQuery = `query CompleteOrders {
        order(order_by: {created_at: desc}, where: {progress_status: {_eq: 404}}) {
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
        getCompleteOrders()
    }, []);
    const [data, setData] = useState([])
    const getCompleteOrders = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: CompleteOrdersQuery,
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: CompleteOrders.js ~ line 25 ~ getCompleteOrders ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar permission="admin"/>
        <Nav/>
        <CompleteOrdersList data={data} title="Complete Orders" count={data.length}  />
    </Container>
    )
}

export default CompleteOrder

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`