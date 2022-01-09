import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import ClientNav from '../../components/main/ClientNav'
import Sidebar from '../../components/sidebar/sidebar'
import CompleteTransactionsList from '../../components/main/users/AllOrders'
import { getUser } from '../../services/auth'
import Spinner from '../../components/Spinner'
import { ClientCompleteTransactions_query } from '../../graphQl/uonQueries'

const CompleteTransactions = () => {
    const CompleteTransactionsQuery = ClientCompleteTransactions_query;
    useEffect(() => {
        getCompleteTransactions()
    }, []);

    const [pageLoader, setPageLoader] = useState(true);
    const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
    useEffect(() => {
        pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
      },[pageLoader]);

    const id = getUser().id
    const [data, setData] = useState([])

    const getCompleteTransactions = async()=>{
        setPageLoader(true)
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: CompleteTransactionsQuery,
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
        <CompleteTransactionsList data={data} title="Complete Transactions" count={data.length}  />
    </Container>
    )
}

export default CompleteTransactions

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`