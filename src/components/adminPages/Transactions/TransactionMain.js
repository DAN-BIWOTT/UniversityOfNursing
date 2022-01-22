import React from "react";
import styled from "styled-components";

const TransactionMain = () => {
  return(
  <Container>
    <table>
      <thead>
        <th>Head</th>
      </thead>
      <tbody>
        <tr>
          <td>top</td>
        </tr>
      </tbody>
    </table>
  </Container>)

};

export default TransactionMain;

const Container = styled.div`
  background-color: #fcf9ff;
  box-shadow: 2px 14px 9px 2px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  border-radius: 5px;
`;
