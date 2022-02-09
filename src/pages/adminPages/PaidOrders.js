import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import PaidOrdersList from '../../components/main/users/Users'
import { AdminPaidOrders_query } from '../../graphQl/uonQueries'

const PaidOrders = () => {
    const PaidOrdersQuery = AdminPaidOrders_query;
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
        //console.log("🚀 ~ file: PaidOrders.js ~ line 25 ~ getPaidOrders ~ finalResp", finalResp);
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
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`