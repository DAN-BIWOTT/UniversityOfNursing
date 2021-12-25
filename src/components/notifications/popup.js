import React from "react";
import Popup from "reactjs-popup";
import EditForm from "../clientComponents/EditForm";
import "./popup.css";

export default ({id}) => (
  <Popup
    trigger={<button className="button"> Edit </button>}
    modal
    nested
  >
    {(close) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
      <EditForm id={id} />
      </div>
    )}
  </Popup>
);