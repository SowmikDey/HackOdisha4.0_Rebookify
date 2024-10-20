import { useState } from 'react';
import axios from 'axios'; 
import '../css/SellerForm.css';
import { useNavigate } from 'react-router-dom';

export default function SellerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    address: '',       
    phone: '',            
    bankDetails: {
      accountHolderName: '', 
      bankAccountNumber: '',  
      ifscCode: '',          
      bankName: '',          
      branchName: '',        
      upiId: '',             
    },
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested bankDetails input
    if (name.startsWith('bankDetails.')) {
      const bankField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        bankDetails: {
          ...prevData.bankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); // Reset error on new submission
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/regSeller`, formData);
      console.log('Response:', response.data);
      alert("Success");
      if (response.status === 201) {
        // Reset form data after submission
        setFormData({
          name: '',
          email: '',
          address: '',       
          phone: '',            
          bankDetails: {
            accountHolderName: '', 
            bankAccountNumber: '',  
            ifscCode: '',          
            bankName: '',          
            branchName: '',        
            upiId: '',             
          },
        });
        alert("Success");
        navigate('/login');  
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response ? error.response.data : 'An error occurred'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='sellerformdiv'>
 <div className={`seller-form-container`}>
      <form onSubmit={handleSubmit} className="responsive-form">
        <h1>Register & share books that deserve a second read</h1>
        <div className="seller-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className="location-input"
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="\d{10}" // Ensuring it is a 10 digit number
            title="Phone number must be 10 digits"
          />
        </div>

        <h3>Bank Details</h3>

        <div className="seller-form-group">
          <label htmlFor="accountHolderName">Account Holder Name:</label>
          <input
            type="text"
            id="accountHolderName"
            name="bankDetails.accountHolderName"
            placeholder="Enter account holder name"
            value={formData.bankDetails.accountHolderName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="bankAccountNumber">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccountNumber"
            name="bankDetails.bankAccountNumber"
            placeholder="Enter bank account number"
            value={formData.bankDetails.bankAccountNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="ifscCode">IFSC Code:</label>
          <input
            type="text"
            id="ifscCode"
            name="bankDetails.ifscCode"
            placeholder="Enter IFSC code"
            value={formData.bankDetails.ifscCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="bankName">Bank Name:</label>
          <input
            type="text"
            id="bankName"
            name="bankDetails.bankName"
            placeholder="Enter bank name"
            value={formData.bankDetails.bankName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="branchName">Branch Name:</label>
          <input
            type="text"
            id="branchName"
            name="bankDetails.branchName"
            placeholder="Enter branch name"
            value={formData.bankDetails.branchName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="seller-form-group">
          <label htmlFor="upiId">UPI ID:</label>
          <input
            type="text"
            id="upiId"
            name="bankDetails.upiId"
            placeholder="Enter UPI ID"
            value={formData.bankDetails.upiId}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && (
  <p className="error-message">
    {typeof error === 'string' ? error : JSON.stringify(error)}
  </p>
)}

      </form>
    </div>
    </div>
  );
}
