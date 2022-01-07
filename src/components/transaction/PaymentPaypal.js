import React, { useState, useRef, useEffect } from "react";
import { loadScript } from "@paypal/paypal-js";

const PaymentPaypal = ({ product }) => {
  
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let paypalRef = useRef();
  
  useEffect(() => {
    // spa
    loadScript({ "client-id": "AQP_VPBm-4CZt3KdeLwPgLteVwNtYC_LU2kZqyJ0LGL8VVukWUoxGV1ms0BVLSvl2PiDHnIar5CmWG2r" })
      .then((paypal) => {
        // start to use the PayPal JS SDK script
        paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.topic,
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
            console.log(order);
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
    },[])

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just paid for order: {product.name}!</h1>
        <p>{product.description}</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.subject} for ${product.price}
      </h1>
      <p>
        {" "}
        {product.topic}
      </p>
      <div ref={paypalRef} />
    </div>
  );
};

export default PaymentPaypal;
