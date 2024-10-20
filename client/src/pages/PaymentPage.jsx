import { useLocation } from 'react-router-dom';
import { PaymentButton } from './PaymentButton';
import '../css/PaymentPage.css'

export const PaymentPage = () => {
  const location = useLocation();
  const { sellerId, amount,  productID } = location.state || {};

  if (!sellerId || !amount) {
    return <p>Invalid payment details. Please try again.</p>;
  }

  return (
    <div className='pay-button-container'>
      <h1 className=''>Proceed to Payment</h1>
      <PaymentButton sellerId={sellerId} amount={amount} productID={productID} />
    </div>
  );
};
