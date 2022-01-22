import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { GetTotalBalance_query } from '../../graphQl/uonQueries'

const AccountBalance = () => {
    const GetTotalBalanceQuery = GetTotalBalance_query;
    let [totalAmount,setTotalAmount] = useState(0);
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
          let tempAmount = []
          for(var amount in finalRes.data.transaction){
            tempAmount.push(amount.amount)
          }
          setTotalAmount(tempAmount.reduce((a, b) => a + b, 0))
          console.log(tempAmount.reduce((a, b) => a + b, 0));
    }
    useEffect(() => {
      GetTotalBalance();
    }, []);
    

    return (

        <Text>
            Amount Received: {totalAmount}$
        </Text>
    )
}

export default AccountBalance

const Text = styled.h1`
font-size: clamp(1rem, 1vw, 1rem);
width: 90%;
`