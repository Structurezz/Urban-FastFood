import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { cartId } = useParams(); // Get cartId from the URL
  const [cart, setCart] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(''); // Store selected payment method
  const [amount, setAmount] = useState(0); // Store total amount

  useEffect(() => {
    // Fetch cart details based on cartId
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/${cartId}`); // Adjust endpoint if necessary
        setCart(response.data);
        setAmount(response.data.totalAmount); // Assuming the cart has a totalAmount field
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    fetchCartDetails();
  }, [cartId]);

  const handlePayment = async () => {
    try {
      const paymentData = {
        order: cartId,
        amount,
        method: paymentMethod,
      };

      const response = await axios.post('http://localhost:5000/api/payments', paymentData); // Create payment
      console.log('Payment successful:', response.data);
      // After successful payment, you can redirect the user or display confirmation
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  if (!cart) {
    return <p>Loading cart details...</p>;
  }

  return (
    <div>
      <h2>Checkout</h2>
      <p>Cart ID: {cartId}</p>
      {/* Display cart items */}
      {cart.items && cart.items.length > 0 ? (
        cart.items.map((item) => (
          <div key={item.id}>
            <p>{item.name} - ${item.price}</p>
          </div>
        ))
      ) : (
        <p>No items in cart.</p>
      )}
      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <option value="">Select Payment Method</option>
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
          {/* Add other payment options */}
        </select>
      </div>
      <p>Total Amount: ${amount}</p>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default CheckoutPage;
