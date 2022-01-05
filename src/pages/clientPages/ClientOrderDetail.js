import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import ClientDetailMain from '../../components/clientPages/ClientDetailMain'
import Sidebar from '../../components/sidebar/sidebar'
import Spinner from '../../components/Spinner'
import { ClientOrderDetail_Query } from '../../graphQl/uonQueries'

const ClientOrderDetail = ({orderId}) => {
    console.log(orderId);
    const [id, setId] = useState(orderId);
    
    const ClientOrderDetailQuery = ClientOrderDetail_Query;

    const [data, setData] = useState({});
    useEffect(() => {
        if(id===""){
            window.location.href = "/client"
        }else{
            getClientOrderDetails()
        }
    }, []);

    useEffect(() => {
        loadingFunc();
      });
      const [pageLoader, setPageLoader] = useState(false);
      const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
      const loadingFunc = ()=>{
        pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
      }

    const getClientOrderDetails = async() =>{
        setPageLoader(true);
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
        setData(finalRes.data.order_by_pk);
        setPageLoader(false);
    }

    return (
        <Container>
            {loadingScreen}
            <Sidebar />
            <ClientDetailMain data={data} orderId={id}/>
        </Container>
    )
}

export default ClientOrderDetail

const Container = styled.div`
  width: auto;
  left:16rem;
  top:0px;
  position: fixed;
  padding: 0 4rem 4rem;
  background: #f4eaff;
  height: 100vh;
  z-index:10;
  overflow-y: auto;
`
