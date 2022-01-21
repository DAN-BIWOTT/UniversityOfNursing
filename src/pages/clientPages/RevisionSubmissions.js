import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import ClientNav from '../../components/main/ClientNav'
import Sidebar from '../../components/sidebar/sidebar'
import RevisionSubmissionsList from '../../components/main/users/AllOrders'
import { getUser } from '../../services/auth'
import Spinner from '../../components/Spinner'
import { ClientRevisionSubmissions_query } from '../../graphQl/uonQueries'

const RevisionSubmissions = () => {
    const RevisionSubmissionsQuery = ClientRevisionSubmissions_query;
    const getRevisionSubmissions = async()=>{
        setPageLoader(true)
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: RevisionSubmissionsQuery,
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
    useEffect(()=>
        getRevisionSubmissions()
    , []);// eslint-disable-line react-hooks/exhaustive-deps
    const [data, setData] = useState([])
    const [pageLoader, setPageLoader] = useState(true);
    const [loadingScreen,setLoadingScreen] = useState(<Spinner/>)
    useEffect(() => {
        pageLoader?setLoadingScreen(<Spinner/>):setLoadingScreen(<></>)
      },[pageLoader]);
    const id = getUser().id
    return (
        <Container>
            {loadingScreen}
        <Sidebar/>
        <ClientNav/>
        <RevisionSubmissionsList data={data} title="Orders In Revision" count={data.length}  />
    </Container>
    )
}

export default RevisionSubmissions

const Container = styled.div`
background-color: #f4eaff;
min-height: 100vh;
height: fit-content;
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`