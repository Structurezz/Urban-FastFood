import React from 'react';
import { FaCheckCircle, FaShoppingCart, FaSmileBeam, FaConciergeBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Redirect user back to homepage after a short delay
  setTimeout(() => {
    navigate('/orders');
  }, 5000);

  return (
    <div style={styles.container}>
      <div style={styles.animatedIcon}>
        <FaCheckCircle style={styles.successIcon} />
      </div>

      <h1 style={styles.successMessage}>Order Successful!</h1>
      <p style={styles.subMessage}>Your order has been placed successfully.</p>

      <div style={styles.iconContainer}>
        <FaShoppingCart style={styles.animatedCartIcon} />
        <FaConciergeBell style={styles.animatedBellIcon} />
        <FaSmileBeam style={styles.animatedSmileIcon} />
      </div>
    </div>
  );
};

// Inline Styles for the Components
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff',
    padding: '20px',
  },
  animatedIcon: {
    animation: 'bounce 1s ease-in-out infinite',
  },
  successIcon: {
    fontSize: '5rem',
    color: '#28a745',
    marginBottom: '20px',
  },
  successMessage: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '10px',
    animation: 'fadeIn 1s ease-in-out',
  },
  subMessage: {
    fontSize: '1.2rem',
    color: '#34495e',
    marginBottom: '30px',
    animation: 'fadeIn 2s ease-in-out',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  animatedCartIcon: {
    fontSize: '2rem',
    color: '#007bff',
    animation: 'shake 1.5s infinite',
  },
  animatedBellIcon: {
    fontSize: '2rem',
    color: '#f39c12',
    animation: 'jello 2s infinite',
  },
  animatedSmileIcon: {
    fontSize: '2rem',
    color: '#e67e22',
    animation: 'pulse 1.2s infinite',
  },
};

export default OrderConfirmation;
