import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import ClientDetailMain from '../../components/clientPages/ClientDetailMain'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'

const ClientOrderDetail = ({location}) => {
    const [id, setId] = useState( location.state === null || location.state === undefined?"":location.state.orderId);
    
    const ClientOrderDetailQuery = `query MyQuery($id: Int!) {
        order_by_pk(id: $id) {
          budget
          client_id
          created_at
          dispute_status
          doc_description
          doc_format
          due_time
          id
          nature
          pages
          payment_status
          price
          progress_status
          revision_status
          spacing
          subject
          topic
        }
      }`

    const [data, setData] = useState({});
    useEffect(() => {
        if(id===""){
            window.location.href = "/admin"
        }else{
            getClientOrderDetails()
        }
    }, [])

    const getClientOrderDetails = async() =>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method: "POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: ClientOrderDetailQuery,
                variables:{
                    id
                }
            })
        }
        );
        const finalRes = await response.json();
        setData(finalRes.data.order_by_pk)
    }

    return (
        <Container>
            <Sidebar />
            <Nav/>
            <ClientDetailMain data={data} orderId={id}/>
        </Container>
    )
}

export default ClientOrderDetail

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`