import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import MenuPage from './pages/Menu';
import OrderPage from './pages/Orders';
import PaymentPage from './pages/Payment';
import CheckoutPage from './pages/CheckOut';
import OrderConfirmation from './pages/OrderConfirmation';
import { CartProvider } from './context/CartContext';
import FeedbackPage from './pages/Feedback';
import SettingsPage from './pages/Settings';
import { ThemeProvider } from './components/ThemeContext';
import ContactPage from './pages/Contact';
import  UserProvider  from './components/UserContext'; 

function App() {
  return (
    <UserProvider> 
      <ThemeProvider> 
        <Router>
          <GlobalStyles />
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Layout>
          </CartProvider>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
