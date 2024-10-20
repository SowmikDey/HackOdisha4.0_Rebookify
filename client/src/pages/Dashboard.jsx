import { useState, useEffect } from 'react'; 
import '../css/Dashboard.css';

const Dashboard = () => {
  const [openSections, setOpenSections] = useState({});
  
  // State to hold data for login/security
  const [loginData, setLoginData] = useState({
    username: 'user123',
    email: 'user@example.com',
    phoneNumber: '123-456-7890',
    password: 'password123',
  });

  // State for products sold
  const [soldProducts, setSoldProducts] = useState([]);


  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

 
  // Load data from local storage on component mount
  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');
    
    if (storedLoginData) {
      setLoginData(JSON.parse(storedLoginData));
    } else {
      // Alternatively, load each field individually from localStorage if stored separately
      const storedUsername = localStorage.getItem('name');
      const storedEmail = localStorage.getItem('email');
      const storedPhoneNumber = localStorage.getItem('phone');
      const storedPassword = localStorage.getItem('password');
      
      setLoginData({
        username: storedUsername || 'user123',
        email: storedEmail || 'user@example.com',
        phoneNumber: storedPhoneNumber || '123-456-7890',
        password: storedPassword || 'kept secret for security reasons',
      });
    }

    // Load sold products from local storage
    const storedSoldProducts = localStorage.getItem('soldProducts');
    if (storedSoldProducts) {
      setSoldProducts(JSON.parse(storedSoldProducts));
    }else {
      const productName = localStorage.getItem('productName');
      const productPrice = localStorage.getItem('productPrice');

      setSoldProducts({
        productName: productName || 'no orders',
        productPrice: productPrice || 'N/A',
      });
    }
  }, []);

  const sections = [
    {
      key: 'loginAndSecurity',
      title: 'Login and Security',
      items: [
        { label: 'Username', value: loginData.username, editable: true, key: 'username' },
        { label: 'Email', value: loginData.email, editable: true, key: 'email' },
        { label: 'Phone Number', value: loginData.phoneNumber, editable: true, key: 'phoneNumber' },
        { label: 'Change Password', value: loginData.password, editable: true, key: 'password' },
      ],
    },
    {
      key: 'orders',
      title: 'Orders',
      items: [
        { label: 'productName', value: soldProducts.productName, editable: true, key: 'productName' },
        { label: 'productPrice', value: soldProducts.productPrice, editable: true, key: 'productPrice' },
      ],
    },
    {
      key: 'supportAndHelp',
      title: 'Support and Help',
      items: [
        { label: 'FAQs', editable: false, detail: 'Frequently Asked Questions related to your account and transactions.' },
        { label: 'Contact Support', editable: false, detail: 'Get in touch with our support team for assistance.' },
        { label: 'How to Sell Guide', editable: false, detail: 'A comprehensive guide on how to sell books on our platform.' },
        { label: 'User Manual', editable: false, detail: 'Step-by-step instructions on using the dashboard.' },
        { label: 'Feedback', editable: false, detail: 'Share your feedback to help us improve our service.' },
      ],
    },
  ];

  return (
    <div className='dashboard-container' >
      <div className="welcome-message">Welcome {loginData.username}!</div>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-content">
          {sections.map((section) => (
            <div
              key={section.key}
              className={`dashboard-section ${openSections[section.key] ? 'open' : ''}`}
            >
              <div
                className="section-header"
                onClick={() => toggleSection(section.key)}
              >
                <h2>{section.title}</h2>
                <span className={`arrow ${openSections[section.key] ? 'open' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-.753.352z" />
                  </svg>
                </span>
              </div>
              {openSections[section.key] && (
                <div className="section-content">
                  <ul>
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <span>{item.label}: </span>
                        <span>{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
