import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'
import PendingTransactionsList from '../../components/main/users/Users'
import { getUser } from '../../services/auth'

const PendingTransactions = () => {
    const PendingTransactionsQuery = `query MyOrders($id: Int!) {
        order(where: {client_id: {_eq: $id}, payment_status: {_neq: 404}}, order_by: {created_at: desc}) {
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
        getPendingTransactions()
    }, []);
    const id = getUser().id
    const [data, setData] = useState([])
    const getPendingTransactions = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: PendingTransactionsQuery,
                variables:{
                    id
                }
            })
        }
        );
        const finalResp = await response.json();
        console.log("🚀 ~ file: PendingTransactions.js ~ line 25 ~ getPendingTransactions ~ finalResp", finalResp);
        setData(finalResp.data.order)
    }
    return (
        <Container>
        <Sidebar/>
        <Nav/>
        <PendingTransactionsList data={data} title="Pending Transactions" count={data.length}  />
    </Container>
    )
}

export default PendingTransactions

const Container = styled.div`
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`