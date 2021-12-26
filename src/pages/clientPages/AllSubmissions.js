import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import AllSubmissionsList from '../../components/main/users/Users'
import { getUser } from '../../services/auth'

const AllSubmissions = () => {
    const AllSubmissionsQuery = `query MyOrders($id: Int!) {
        order(where: {client_id: {_eq: $id}}, order_by: {created_at: desc}) {
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
        getAllSubmissions()
    }, []);
    const [data, setData] = useState([])
    const id = getUser().id
    const getAllSubmissions = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: AllSubmissionsQuery,
                variables:{
                    id
                }
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: AllSubmissions.js ~ line 25 ~ getAllSubmissions ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar/>
        <Nav/>
        <AllSubmissionsList data={data} title="All Submissions" count={data.length}  />
    </Container>
    )
}

export default AllSubmissions

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`