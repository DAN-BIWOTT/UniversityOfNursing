import React from "react";
import Popup from "reactjs-popup";
import "./transaction.css";
import PaymentPaypal from "./PaymentPaypal";
import styled from "styled-components";

const TransactionModal = ({ data }) => {

  return (
    <Popup trigger={<button className="button"> Pay </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          {/* Body */}
          <TransactionBody>
            <PaymentPaypal product={data} />
          </TransactionBody>
        </div>
      )}
    </Popup>
  );
};

export default TransactionModal;

const TransactionBody = styled.div`
    padding: 0px 2rem 0px 2rem;
`
