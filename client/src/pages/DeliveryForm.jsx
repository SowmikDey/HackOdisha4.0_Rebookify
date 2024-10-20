import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/DeliveryForm.css';

export default function DeliveryForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email:'',
    contactNumber: '',
    password: '',
    aadharNumber: '',
    panCard: '',
    photo: null,
    permanentAddress: '',
    currentAddress: '',
    vehicleType: '',
    vehicleRegNumber: '',
    drivingLicense: '',
    vehicleInsurance: '',
    bankAccountNumber: '',
    ifscCode: '',
    bankNameBranch: '',
    policeClearance: null,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    
    // Assuming formData is an object that includes file inputs and other fields
    // Append files explicitly for fields expected by multer
    const passportPhoto = document.querySelector('input[name="passportPhoto"]');
    const policeClearanceCertificate = document.querySelector('input[name="policeClearanceCertificate"]');

    // Append file inputs
    if (passportPhoto.files[0]) {
        data.append('passportPhoto', passportPhoto.files[0]);
    }
    
    if (policeClearanceCertificate.files[0]) {
        data.append('policeClearanceCertificate', policeClearanceCertificate.files[0]);
    }

    // Append other form fields if necessary
    for (const key in formData) {
        if (key !== 'passportPhoto' && key !== 'policeClearanceCertificate') { // Exclude files
            data.append(key, formData[key]);
        }
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/regDel`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Response:', response.data);
        alert("Success");

        if (response.status === 201) {
            navigate('/login');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert("fail");
        setError(error.response ? error.response.data : 'An error occurred');
    } finally {
        setLoading(false);
    }
};


  return (
    <div className='formdiv'>
 <div className={`delivery-form-container`}>
      <form onSubmit={handleSubmit} className="responsive-form">
        <h2 className='del-heading' >Personal Information</h2>
        <div className="del-form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <h2 className='del-heading'>Identity Verification</h2>
        <div className="del-form-group">
          <label htmlFor="aadharNumber">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="panCard">PAN Card:</label>
          <input
            type="text"
            id="panCard"
            name="panCard"
            value={formData.panCard}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="photo">Passport-sized Photo:</label>
          <input
            type="file"
            id="photo"
            name="passportPhoto"  // corrected from passportPhoto to photo
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <h2 className='del-heading' >Address Information</h2>
        <div className="del-form-group">
          <label htmlFor="permanentAddress">Permanent Address:</label>
          <textarea
            id="permanentAddress"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="currentAddress">Current Address:</label>
          <textarea
            id="currentAddress"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
          />
        </div>

        <h2 className='del-heading' >Vehicle Details</h2>
        <div className="del-form-group">
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <input
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="vehicleRegNumber">Vehicle Registration Number:</label>
          <input
            type="text"
            id="vehicleRegNumber"
            name="vehicleRegNumber"
            value={formData.vehicleRegNumber}
            onChange={handleChange}
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="drivingLicense">Driving License Number:</label>
          <input
            type="text"
            id="drivingLicense"
            name="drivingLicense"
            value={formData.drivingLicense}
            onChange={handleChange}
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="vehicleInsurance">Vehicle Insurance Details:</label>
          <textarea
            id="vehicleInsurance"
            name="vehicleInsurance"
            value={formData.vehicleInsurance}
            onChange={handleChange}
          />
        </div>

        <h2 className='del-heading' >Bank Details</h2>
        <div className="del-form-group">
          <label htmlFor="bankAccountNumber">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccountNumber"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="ifscCode">IFSC Code:</label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="del-form-group">
          <label htmlFor="bankNameBranch">Bank Name and Branch:</label>
          <input
            type="text"
            id="bankNameBranch"
            name="bankNameBranch"
            value={formData.bankNameBranch}
            onChange={handleChange}
            required
          />
        </div>

        <h2 className='del-heading' >Background Verification</h2>
        <div className="del-form-group">
          <label htmlFor="policeClearance">Police Clearance Certificate:</label>
          <input
            type="file"
            id="policeClearance"
            name="policeClearanceCertificate" // corrected name to match state
            onChange={handleChange}
            accept=".pdf,.jpg,.png"
          />
        </div>
        <div className="del-form-group checkbox-group">
          <label htmlFor="consent">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            Consent for Background Checks
          </label>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
   

    </div>
    </div>
   
  );
}
