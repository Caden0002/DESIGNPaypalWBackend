import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './components/CheckoutPage';
import PaymentConfirmationPage from "./components/PaymentConfirmationPage";
import PaymentErrorPage from './components/PaymentErrorPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<PaymentConfirmationPage />} />
        <Route path="/error" element={<PaymentErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;