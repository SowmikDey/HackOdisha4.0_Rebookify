import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationType from './pages/RegistrationType';
import DeliveryForm from './pages/DeliveryForm';
import SellerForm from './pages/SellerForm';
import BuyerForm from './pages/BuyerForm';
import Dashboard from './pages/Dashboard'; 
import { UserHomePage } from './pages/User-Home-Page';
import InputForm from './pages/InputForm';
import { Login } from './pages/Login';
import ProductDetailsPage from './pages/ProductDetailsPage '
import PaymentConfirmatiom from './pages/PaymentConfirmatiom';
import { PaymentPage } from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';

//ABC

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Registration" element={<RegistrationType/>} />
      <Route path="/create-post" element={<InputForm/>} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/regDel" element={<DeliveryForm/>} />
      <Route path="/regBuyer" element={<BuyerForm/>} />
      <Route path="/regSeller" element={<SellerForm/>} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/Userhomepage" element={<UserHomePage />} />  
      <Route path='/payment' element={<PaymentPage />}/>
      <Route path='/confirmation-payment' element={<PaymentConfirmatiom />}/> 
      <Route path='/Delivery-confirmation' element={<OrderConfirmation/>}/>
    </Routes>
  );
};

export default AppRoutes;