import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import MyBookings from './pages/MyBooking';
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import HomePage from './pages/ḤomePage'
import MechanicDashboard from './pages/gairage/MechanicDashboard';
import UserDashboard from './pages/user/UserDashboard';
import ShopParts from './pages/shops/ShopParts';
import SellDetail from './components/gairage/SellDetail';
import EmergencyServices from './pages/emergency/EmergencyServices';
import ShowBookinCard from './pages/ShowBookinCard';
import BookingDetail from './components/gairage/BookingDetail';
import BooKingForm from "./components/gairage/BookingForm"
import MyBooking from './components/user/MyBooking';


function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard/:userId" element={<PrivateRoute><UserDashboard/></PrivateRoute>} />
          <Route path="/dashboard/my-booking/:id" element={<MyBooking/>} />

           
          {/* // book services */}
          <Route path="/all-booking-services" element={<PrivateRoute><ShowBookinCard/></PrivateRoute>} />
          <Route path="/gairage-details/:id" element={<BookingDetail/>} />
          <Route path="/booking-form/:id" element={<BooKingForm/>}  />


          <Route path="/emergency-booking" element={<EmergencyServices/>}/>

         
          <Route path="/admin" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />

          <Route path={`/mechanic-dashboard/:garageId`} element={<PrivateRoute><MechanicDashboard/></PrivateRoute>}/>
          <Route path="/my-bookings/:mechanicId" element={<PrivateRoute><MyBookings /></PrivateRoute>} />


          {/* // shop parts */}
          <Route path="/shop-parts" element={<PrivateRoute><ShopParts/></PrivateRoute>} />
          <Route path="/parts/:id" element={<SellDetail />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
