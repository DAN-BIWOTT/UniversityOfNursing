import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import ClientNav from '../../components/main/ClientNav'
import Sidebar from '../../components/sidebar/sidebar'
import PendingTransactionsList from '../../components/main/users/AllOrders'
import { getUser } from '../../services/auth'
import Spinner from '../../components/Spinner'
import { ClientPendingTransactions_query } from '../../graphQl/uonQueries'

const PendingTransactions = () => {
    const PendingTransactionsQuery = ClientPendingTransactions_query;

    useEffect(() => {
        getPendingTransactions()
    }, []);
    const id = getUser().id

    const [pageLoader, setPageLoader] = useState(true);
    const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
    useEffect(() => {
        pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
      },[pageLoader]);

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
        setData(finalResp.data.order)
        setPageLoader(false)
    }
    return (
        <Container>
            {loadingScreen}
        <Sidebar/>
        <ClientNav/>
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