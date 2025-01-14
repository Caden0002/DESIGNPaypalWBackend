const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5002;

// Temporary in-memory payment status store
const paymentStatuses = {};

// PayPal webhook endpoint
app.post("/webhook/paypal", (req, res) => {
    const { event_type, resource } = req.body;
  
    if (event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const paymentId = resource.id; // Unique PayPal payment ID
      console.log(`Webhook received: Payment Captured Successfully. ID: ${paymentId}`);
  
      // Store payment status in memory (replace with database in production)
      paymentStatuses[paymentId] = { status: "COMPLETED", details: resource };
  
      res.status(200).send("Payment recorded.");
    } else {
      console.log(`Unhandled event type: ${event_type}`);
      res.status(200).send("Event ignored.");
    }
  });
  
  // Endpoint for frontend to check payment status
  app.get("/payment-status/:paymentId", (req, res) => {
    const paymentId = req.params.paymentId;
  
    if (paymentStatuses[paymentId]) {
      const paymentStatus = paymentStatuses[paymentId];
      res.status(200).json(paymentStatus);
    } else {
      res.status(404).json({ status: "NOT_FOUND", message: "Payment not found." });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});