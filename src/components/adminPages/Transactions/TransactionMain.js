import styled from "@emotion/styled";
import React from "react";
import "./TransactionMain.css";
const TransactionMain = ({ data, title, count }) => {
  console.log(data);
  return (
    <Container>
      <Title>
        {title} <UserCount> {count}</UserCount>
      </Title>
      <table id="transaction">
        <thead>
          <th>Amount</th>
          <th>Client Id</th>
          <th>Created at</th>
          <th>Currency Code</th>
          <th>Email address</th>
          <th>Order Id</th>
          <th>Merchant Id</th>
          <th>Status</th>
        </thead>
        <tbody>
          {data.map((info) => {
            {
              console.log(info.amount);
            }
            return (
              <tr>
                <td>{info.amount}</td>
                <td>{info.client_id}</td>
                <td>{info.created_at}</td>
                <td>{info.currency_code}</td>
                <td>{info.email_address}</td>
                <td>{info.order_id}</td>
                <td>{info.receipt}</td>
                <td>{info.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export default TransactionMain;
const Container = styled.div`
  background-color: #fcf9ff;
  box-shadow: 2px 14px 9px 2px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  border-radius: 5px;
`;
const Title = styled.h1`
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

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
`;
