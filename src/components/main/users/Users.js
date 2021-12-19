import styled from '@emotion/styled'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import SortingBar from './SortingBar'
import User from './User.js'
import AllUsersBtn from './AllUsersBtn'

const Users = ({title,count}) => {
    const allUsers = useStaticQuery(graphql`
    query MyQuery {
      allMongodbJodawakiJodawakiUsers {
        edges {
          node {
            firstName
            lastName
            id
          }
        }
      }
    }
  `);
  var data = []
  data.push(allUsers.allMongodbJodawakiJodawakiUsers.edges)
  var combinedData = []
  data[0].map(sample=>{
    combinedData.push(sample.node)
  })

    return (
        <div>
            <Title>{title} <UserCount> {count}</UserCount></Title>
            <SortingBar />
            {combinedData.map(user=>{
              return(<User data={user} key={user.id} />);
            })}
            <AllUsersBtn title={title} />
        </div>
    )
}

export default Users

const Title = styled.h1`
    font-weight:500;
    color: ${({theme})=> theme.textColor};
    font-size: 1.3rem;
    display: flex;
    align-items: center;
`

const UserCount = styled.div`
    margin-left: 1rem;
    font-size: 1rem;
    background-color: grey;
    color: white;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`


