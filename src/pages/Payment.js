import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaCreditCard, FaPaypal, FaPiggyBank } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { useContext } from'react';

// Styled Components

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: auto;

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
    margin: 10px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
  }
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 25px;
  font-weight: bold;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #f57c00;
    background-color: #fff;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 25px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #f57c00;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e65100;
  }

  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 15px;
`;

const PaymentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
`;

const TableHeader = styled.th`
  background-color: #f57c00;
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 1.1rem;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const OptionList = styled.ul`
  position: absolute;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
`;

const Option = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// Custom Select Component
const CustomSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div>
      <DropdownButton onClick={toggleDropdown}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
        <span>{isOpen ? '▲' : '▼'}</span>
      </DropdownButton>
      {isOpen && (
        <OptionList>
          <Option onClick={() => handleOptionSelect('credit card')}>
            <FaCreditCard /> Credit Card
          </Option>
          <Option onClick={() => handleOptionSelect('paypal')}>
            <FaPaypal /> PayPal
          </Option>
          <Option onClick={() => handleOptionSelect('bank transfer')}>
            <FaPiggyBank /> Bank Transfer
          </Option>
        </OptionList>
      )}
    </div>
  );
};

// Main Component
const PaymentPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('credit card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState(() => {
    const storedPayments = localStorage.getItem(`payments_${id}`);
    return storedPayments ? JSON.parse(storedPayments) : [];
  });
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    
    console.log('Checking login status:');
    console.log('Token:', token);
    console.log('UserId:', userId);
    console.log('LoggedIn:', loggedIn);

    if (!token || !userId || !loggedIn) {
      console.warn('User not logged in, redirecting to login page.');
      navigate('/login');
    } else {
      console.log('User is logged in:', { token, userId });
    }
  }, [loggedIn, navigate]);

  

  
    
  
   
  

  useEffect(() => {
    const fetchPayments = async () => {
      if (!id) return; // Ensure we have the user ID
  
      setLoading(true);
      try {

       
        
       // Fetch payments by userId
const response = await axios.get(`http://localhost:5000/api/payments/?userId=${id}`);

        setPayments(response.data); // Set payments from the server response
  
        // Store payments in localStorage by userId
        localStorage.setItem(`payments_${id}`, JSON.stringify(response.data));
  
        // Check for orderId from location state and set it
        const orderIdFromState = location.state?.orderId;
        if (orderIdFromState) {
          setOrderId(orderIdFromState);
        }
  
      } catch (error) {
        setError('Error fetching payments');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch payments when component mounts or userId or location state changes
    fetchPayments();
    // Set orderId from location state if available
    const orderIdFromState = location.state?.orderId;
    if (orderIdFromState) {
      setOrderId(orderIdFromState);
    }
  }, [id, location.state]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('jwtToken');
    const userId = id; // Use the URL parameter id
  
    if (!token || !userId) {
      toast.error('User not logged in. Please log in to make a payment.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
  
    const newPayment = {
      user: userId, // Pass the userId to the backend
      order: orderId,
      amount,
      method,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/payments',
        newPayment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the payments state with the new payment
      setPayments((prevPayments) => {
        const updatedPayments = [response.data, ...prevPayments];
        localStorage.setItem(`payments_${userId}`, JSON.stringify(updatedPayments));
        return updatedPayments;
      });
  
      // Clear form fields
      setOrderId('');
      setAmount('');
      setMethod('credit card');
  
      toast.success('Payment successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Payment error:', error.message);
      setError('Error creating payment');
      toast.error('Payment failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <PageContainer>
      <ToastContainer />
      <FormContainer>
        <FormTitle>Create a New Payment</FormTitle>
        <form onSubmit={handlePaymentSubmit}>
          <InputGroup>
            <Label>Order ID</Label>
            <Input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Payment Method</Label>
            <CustomSelect value={method} onChange={setMethod} />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit Payment'}
          </SubmitButton>
        </form>
      </FormContainer>

      {loading && <p>Loading payments...</p>}

      <PaymentsTable>
        <thead>
          <tr>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Method</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <TableCell>{payment.order}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>{payment.status}</TableCell>
            </tr>
          ))}
        </tbody>
      </PaymentsTable>
    </PageContainer>
  );
};

export default PaymentPage;
