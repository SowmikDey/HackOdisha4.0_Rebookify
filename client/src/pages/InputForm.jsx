import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/InputForm.css";

function InputForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    category: '',
    yearsUsed: '',
    email: '',
    exampleCheck: false,
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authorization failed. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-post`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Save product name and price to local storage
      localStorage.setItem('productName', formData.name);
      localStorage.setItem('productPrice', formData.price);

      console.log('Response:', response.data);
      alert('Product posted successfully');
      navigate('/Userhomepage');
    } catch (err) {
      console.error('Error posting data:', err);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='post-div'>
      <div className="post-form-container">
        <form onSubmit={handleSubmit} className="responsive-form">
          <h1>Enter Book Details</h1>
          
          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="post-form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              className="form-control" 
              id="description" 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price (in ₹)</label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input 
                type="number" 
                className="form-control" 
                id="price" 
                name="price" 
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          {/* Location */}
          <div className="post-form-group">
            <label htmlFor="location" className="form-label">Location</label>
            <input 
              type="text" 
              className="form-control" 
              id="location" 
              name="location" 
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="post-form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select 
              className="form-select" 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="textbook">Textbook</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* No. of Years Used */}
          <div className="post-form-group">
            <label htmlFor="yearsUsed" className="form-label">No. of Years Used</label>
            <input 
              type="number" 
              className="form-control" 
              id="yearsUsed" 
              name="yearsUsed" 
              value={formData.yearsUsed}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="post-form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className='light-mode-button' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default InputForm;
