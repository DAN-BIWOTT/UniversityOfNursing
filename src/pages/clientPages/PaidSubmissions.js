import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import ClientNav from '../../components/main/ClientNav'
import Sidebar from '../../components/sidebar/sidebar'
import PaidSubmissionsList from '../../components/main/users/AllOrders'
import { getUser } from '../../services/auth'
import Spinner from '../../components/Spinner'
import { ClientPaidSubmissions_query } from '../../graphQl/uonQueries'

const PaidSubmissions = () => {
    const PaidSubmissionsQuery = ClientPaidSubmissions_query;
    useEffect(() => {
        getPaidSubmissions()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const [pageLoader, setPageLoader] = useState(true);
    const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
    useEffect(() => {
        pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
      },[pageLoader]);

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
        setData(finalResp.data.order)
        setPageLoader(false);
    }
    return (
        <Container>
            {loadingScreen}
        <Sidebar/>
        <ClientNav/>
        <PaidSubmissionsList data={data} title="Paid Submissions" count={data.length}  />
    </Container>
    )
}

export default PaidSubmissions

const Container = styled.div`
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`