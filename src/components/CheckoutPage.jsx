import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPage = () => {
  const [cartItems] = useState([
    { id: 1, name: "Item 1", price: 20.0, quantity: 1 },
    { id: 2, name: "Item 2", price: 30.0, quantity: 1 },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful:", details);
    alert(`Payment completed by ${details.payer.name.given_name}`);
    // Add backend API call to store payment details if needed
  };

  const handlePaymentError = (error) => {
    console.error("Payment Error:", error);
    alert("An error occurred during the payment process. Please try again.");
  };

  return (
    <div className="relative min-h-screen flex bg-stone-200">
      <div className="container max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        {/* Cart Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="mb-6">
          <h2 className="text-xl font-bold flex justify-between">
            Total: <span>${totalAmount.toFixed(2)}</span>
          </h2>
        </div>

        {/* PayPal Payment */}
        <div className="text-center mt-6">
          <PayPalScriptProvider
            options={{
              "client-id": "AUE2vtEccSegclTDqEyaU_3Snbnq4l2P-Ce37t4UN3zqulg3p2XFb9r7-LytAhR9Q0stTPHdqznPZGPF", // Replace with your actual PayPal Client ID
              currency: "USD", // Adjust the currency code as needed
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(handlePaymentSuccess);
              }}
              onError={handlePaymentError}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;