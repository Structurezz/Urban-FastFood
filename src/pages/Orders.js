import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { FaTrashAlt, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { useContext } from'react';

const OrderContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 50%;
`;

const OrderCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const OrderItems = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  background-color: ${({ status }) =>
    status === 'pending' ? '#ff9800' : 
    status === 'completed' ? '#4caf50' : '#f44336'};
  transition: background-color 0.3s ease-in-out;
`;

const Button = styled.button`
  margin: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: ${({ color }) => color || '#007bff'};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addItemToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);

 

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [loggedIn, navigate]);

  const BASE_URL = 'http://localhost:5000/api'; 

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/orders/?userId=${id}`);
      setOrders(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${BASE_URL}/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      alert('Error deleting order');
    }
  };

  // Proceed to payment function

  const handleProceedToPayment = (orderId, amount) => {
    navigate('/payment', { state: { orderId, amount } });
  };
  

  const handleAddToCart = (order) => {
    order.items.forEach((item) => {
      addItemToCart({
        id: item.menuItem._id,
        name: item.menuItem.name,
        price: item.menuItem.price,
        quantity: item.quantity,
      });
    });
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchQuery) || 
    order.status.toLowerCase().includes(searchQuery) ||
    order.items.some(item => item.menuItem.name.toLowerCase().includes(searchQuery))
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  

  return (
    <OrderContainer>
      <Header>
        <h2>All Orders</h2>
        <SearchInput
          type="text"
          placeholder="Search orders by ID, status, or item..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </Header>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && filteredOrders.length === 0 && <p>No orders match your search.</p>}
      
      {filteredOrders.map((order) => (
        <OrderCard key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <StatusBadge status={order.status}>{order.status}</StatusBadge>
          <OrderItems>
            {order.items.map((item) => (
              <OrderItem key={item.menuItem._id}>
                <span>{item.menuItem.name} (x{item.quantity})</span>
                <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
              </OrderItem>
            ))}
          </OrderItems>
          <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
          <small>Ordered on: {new Date(order.createdAt).toLocaleString()}</small>
          <div>
            <Button color="#4caf50" onClick={() => handleAddToCart(order)}>
              <FaShoppingCart /> Add to Cart
            </Button>
            <Button color="#007bff" onClick={() => handleProceedToPayment(order._id)}>
              <FaCreditCard /> Proceed to Payment
            </Button>
            <Button color="#f44336" onClick={() => handleDelete(order._id)}>
              <FaTrashAlt /> Delete
            </Button>
          </div>
        </OrderCard>
      ))}
    </OrderContainer>
  );
};

export default OrderPage;
