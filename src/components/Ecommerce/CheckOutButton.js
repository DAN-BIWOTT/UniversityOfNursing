import React, { useState, useRef, useEffect } from "react";
import { loadScript } from "@paypal/paypal-js";
import {
  getPurchase_query,
  SavePurchase_query,
} from "../../graphQl/uonQueries.js";
import { Button } from "theme-ui";
import { navigate } from "gatsby";
import toast, { Toaster } from "react-hot-toast";

const CheckOutButton = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let paypalRef = useRef();

  useEffect(() => {
    // spa
    loadScript({
      "client-id":
        "AQP_VPBm-4CZt3KdeLwPgLteVwNtYC_LU2kZqyJ0LGL8VVukWUoxGV1ms0BVLSvl2PiDHnIar5CmWG2r",
    })
      .then((paypal) => {
        // start to use the PayPal JS SDK script
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.title,
                    amount: {
                      currency_code: "USD",
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaidFor(true);
              saveTransaction(order);
              //console.log("saving transaction");
            },
            onError: (err) => {
              setError(err);
              console.error(err);
            },
          })
          .render(paypalRef.current);
      })
      .catch((err) => {
        console.error("failed to load the PayPal JS SDK script", err);
      });
    // end spa
  }, []);
  const SavePurchaseQuery = SavePurchase_query;

  let userId = 1;
  let orderId = parseInt(product.id);
  let clientId = parseInt(product.client_id);
  let transaction_status = "";
  let amount = "";
  let currency_code = "";
  let email_address = "";
  let merchant_id = "";
  let description = "";
  let created_at = "";

  const saveTransaction = async (data) => {
    transaction_status = data.status;
    amount = data.purchase_units[0].amount.value;
    currency_code = data.purchase_units[0].amount.currency_code;
    email_address = data.payer.email_address;
    merchant_id = data.id;
    description = data.purchase_units[0].description;
    created_at = data.create_time;
    //console.log(data);
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: SavePurchaseQuery,
        variables: {
          userId,
          orderId,
          clientId,
          transaction_status,
          amount,
          currency_code,
          email_address,
          merchant_id,
          description,
          created_at,
        },
      }),
    });
    const finalRes = await response.json();
    //console.log(finalRes);
  };

  const downloadFile = async (event) => {
    event.preventDefault();
    //console.log("starting download...");
    const id = product.id
    const getPurchaseQuery = getPurchase_query;
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: getPurchaseQuery,
        variables: {
          id
        },
      }),
    });
    const finalRes = await response.json();
    //console.log(finalRes)
    if (finalRes.data.product_by_pk !== null) {
      //console.log(finalRes.data.product_by_pk.files)
      toast("Download will begin shortly")
      navigate(finalRes.data.product_by_pk.files);
    }
  };
  if (paidFor) {
    return (
      <div>
        <h1 style={{color:"green"}}>🎉Your download is ready.🎉</h1>
        <Button onClick={(event) => downloadFile(event)}>Download</Button>
        <Toaster />
      </div>
    );
  } else
    return (
      <div>
        {error && (
          <div>Uh oh, an error occurred, Contact Admin! {error.message}</div>
        )}
        <div ref={paypalRef} />
      </div>
    );
};

export default CheckOutButton;
