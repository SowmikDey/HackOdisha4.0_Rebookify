import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PaymentButton.css';

export const PaymentButton = ({ sellerId, amount, productID }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const qrCodeImageUrl = '../GooglePay_QR.png';

  const handlePayClick = () => {
    setError(null);
    setShowQRCode(true);
  };

  const handleNextPage = () => {
    navigate('/confirmation-payment', {
      state: { sellerId, amount, productID },
    });
  };

  return (
    <div className="pay-button-container">
      <button
        onClick={handlePayClick}
        className="pay-button"
      >
        Generate QR Code
      </button>
      {error && <p className="error-text">{error}</p>}
      {showQRCode && (
        <div className="qr-code-container">
          <p>Scan this QR code to pay:</p>
          <img
            src={qrCodeImageUrl}
            alt="UPI Payment QR Code"
            style={{ width: '200px', height: '200px' }}
          />
          <p style={{ fontWeight: 'bold' }}>
            Product ID: {productID} <br />
            Amount to be paid: {amount}
          </p>
          <button
            className="confirm-button"
            onClick={handleNextPage}
          >
            Fill the form to confirm payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
