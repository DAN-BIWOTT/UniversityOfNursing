import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import AllOrdersList from '../../components/main/users/Users'

const AllOrders = () => {
    const AllOrdersQuery = `query AllOrders {
        order(order_by: {created_at: desc}) {
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
        getAllOrders()
    }, []);
    const [data, setData] = useState([])
    const getAllOrders = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: AllOrdersQuery,
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: AllOrders.js ~ line 25 ~ getAllOrders ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar permission="admin"/>
        <Nav/>
        <AllOrdersList data={data} title="All Orders" count={data.length}  />
    </Container>
    )
}

export default AllOrders

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`
