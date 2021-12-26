import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import PaidSubmissionsList from '../../components/main/users/Users'
import { getUser } from '../../services/auth'

const PaidSubmissions = () => {
    const PaidSubmissionsQuery = `query MyOrders($id: Int!) {
        order(where: {client_id: {_eq: $id}, payment_status: {_eq: 404}}, order_by: {created_at: desc}) {
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
        getPaidSubmissions()
    }, []);
    const id = getUser().id
    const [data, setData] = useState([])
    const getPaidSubmissions = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: PaidSubmissionsQuery,
                variables:{
                    id
                }
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: PaidSubmissions.js ~ line 25 ~ getPaidSubmissions ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar/>
        <Nav/>
        <PaidSubmissionsList data={data} title="Paid Submissions" count={data.length}  />
    </Container>
    )
}

export default PaidSubmissions

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`