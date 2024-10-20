import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/PaymentStatus.css';  // Import the stylesheet

const PaymentVerifiedCheckmark = () => {
  const [showPage, setShowPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { transactionId } = location.state || {};

  const callDelivery = () => {
    navigate('/Delivery-confirmation');
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/payment-status?transactionId=${transactionId}`);
        
        if (response.data.status === 'accepted') {
          setShowPage(true);
        } else {
          setShowPage(false);
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setShowPage(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [transactionId]);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="payment-status-container">
      {showPage ? (
        <div className="payment-verified">
          <h1 className='success-heading'>Payment Verified!</h1>
          <p className='success-paragaph'>Your payment has been confirmed.</p>
          <button className="success-delivery-button" onClick={callDelivery}>
            Call Delivery Boy
          </button>
        </div>
      ) : (
        <div className="payment-pending">
          <p className='failure-paragaph'>Your payment will be confirmed within 2 to 3 working days.</p>
          <a className="failure-home-link" href="/Userhomepage">Go to Home Page</a>
        </div>
      )}
    </div>
  );
};

export default PaymentVerifiedCheckmark;
