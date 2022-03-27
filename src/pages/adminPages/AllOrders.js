import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import AllOrdersList from '../../components/main/users/Users'
import { AllOrders_Query } from '../../graphQl/uonQueries'

const AllOrders = () => {
    const AllOrdersQuery = AllOrders_Query;
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
        console.log(finalResp)
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
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`
