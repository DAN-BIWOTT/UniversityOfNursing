import React from 'react'
import styled from 'styled-components';

const UserDetailTable = ({tableData}) => {
    console.log(tableData)
  return (
    <div>
        <Title>{tableData.client[0]?.full_name}</Title>
      <Title>{tableData.client[0]?.email}</Title>
      <table id="clients">
        <tr>
          <th>Order Id</th>
          <th>price</th>
          <th>topic</th>
          <th>doc_description</th>
        </tr>
        {tableData.client[0].orders.map((orders) => {
          return (
            <tr>
              <td>{orders.id}</td>
              <td>{orders.price}</td>
              <td>{orders.topic}</td>
              <td>{orders.doc_description}</td>
            </tr>
          );
        })}
      </table>
    </div>
  )
}
export default UserDetailTable;

const Title = styled.h1`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;