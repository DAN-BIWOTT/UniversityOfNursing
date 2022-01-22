import React,{useEffect} from 'react'
import styled from 'styled-components'
import { GetTotalBalance_query } from '../../graphQl/uonQueries'

const AccountBalance = () => {
    const GetTotalBalanceQuery = GetTotalBalance_query;
    const GetTotalBalance = async() => {
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
            method: "POST",
            headers: {
              "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
              "Content-Type": "Application/Json",
            },
            body: JSON.stringify({
              query: GetTotalBalanceQuery
            }),
          });
          const finalRes = await response.json();
          console.log(finalRes.data.transaction);
    }
    useEffect(() => {
      GetTotalBalance();
    }, []);
    

    return (

        <Text>
            Account Balance: 30$
        </Text>
    )
}

export default AccountBalance

const Text = styled.h1`
font-size: clamp(1rem, 1vw, 1rem);
width: 90%;
`