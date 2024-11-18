import React, { useEffect, useState, useCallback , useMemo} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlusCircle,FaHamburger, FaCoffee, FaIceCream, FaAppleAlt } from 'react-icons/fa';
import { UserContext } from '../components/UserContext';
import { useContext } from 'react';
// Inline Styled Components
const MenuPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  font-family: 'Poppins', sans-serif;
  margin-left: 0;
  margin-right: 0;
  position: relative;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #343a40;
  color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  div {
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease;
    &:hover {
      background-color: #495057;
    }
    span {
      margin-left: 10px;
      font-size: 18px;
    }
  }
 
  @media (max-width: 300px) {
    display: none;
  }
`;

const MainContent = styled.div`
 
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: linear-gradient(to bottom right, #f8b400, #2f2f2f);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 100%;
  min-width: 30px;
  min-height: 13px;
  align-content: center;

  h2 {
    color: #ffffff;
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;


const MenuSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  max-width: 100%;
  min-width: 50px;
  min-height:9px;
 
`;

const MenuItemContainer = styled.div`
  flex: 0 1 calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const MenuItemCard = styled.div`
  padding: 20px;
  text-align: center;
  color: #343a40;
  h4 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
    color: #388e3c;
    margin-bottom: 8px;
  }
  small {
    font-size: 14px;
    color: #757575;
  }
  button {
    padding: 10px 20px;
    background-color: #f8b400;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 15px;
    &:hover {
      background-color: #f0a500;
    }
  }
`;





const CartContainer = styled.div`
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  h4 {
    font-size: 24px;
    color: #f8b400;
    margin-bottom: 20px;
    font-weight: 700;
  }
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    small {
      color: #757575;
    }
  }
  button {
    padding: 12px 25px;
    background-color: #388e3c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #2c6e2f;
    }
  }
`;

const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #f8b400;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const ComboDealsContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  height: auto;
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: #333;
`;

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff7a00;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const ComboPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
`;

const ComboItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ComboName = styled.h4`
  font-size: 1.5rem;
  color: #ff7a00;
  margin-bottom: 10px;
`;

const ComboDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const AddButton = styled.button`
  background-color: #ff0084;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #d4006f;
    transform: scale(1.05);
  }
`;

const Icon = styled(FaPlusCircle)`
  margin-right: 10px;
  font-size: 1.6rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const NavButton = styled.button`
  padding: 12px 20px;
  background-color: #ff7a00;
  color: #fff;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #e15a00;
  }
`;
const MenuPage = () => {
    const [menuData, setMenuData] = useState([]);
    const [comboDeals, setComboDeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Breakfast');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentComboPage, setCurrentComboPage] = useState(0);
    const navigate = useNavigate();
    const { loggedIn } = useContext(UserContext);


    

    useEffect(() => {
      if (!loggedIn) {
        navigate('/login'); // Redirect if not logged in
      }
    }, [loggedIn, navigate]);
  
    // Memoize categories to avoid unnecessary re-renders
    const categories = useMemo(() => [
      { name: 'Breakfast', icon: <FaCoffee /> },
      { name: 'Lunch', icon: <FaHamburger /> },
      { name: 'Dinner', icon: <FaHome /> },
      { name: 'Snack', icon: <FaIceCream /> },
      { name: 'Dessert', icon: <FaAppleAlt /> }
    ], []);
  
    // Fetch menu items
    const fetchMenuItems = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/menu-items');
        const items = response.data;
        const shuffledItems = items.sort(() => Math.random() - 0.5);
    
        const categorizedItems = categories.reduce((acc, category, index) => {
          const categoryItems = shuffledItems.slice(
            index * Math.ceil(shuffledItems.length / categories.length),
            (index + 1) * Math.ceil(shuffledItems.length / categories.length)
          );
          acc[category.name] = categoryItems;
          return acc;
        }, {});
    
        setMenuData(categorizedItems);
        generateRandomComboDeals(shuffledItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, [categories]);
  
    // Effect to fetch menu items on initial load
    useEffect(() => {
      fetchMenuItems();
    }, [fetchMenuItems]);
    
    // Generate random combo deals
    const generateRandomComboDeals = (menuItems) => {
        if (!Array.isArray(menuItems) || menuItems.length < 3) {
          // Fallback to an empty array if menuItems is not valid
          setComboDeals([]);
          return;
        }
      
        const comboDeals = [];
        const totalCombos = 12;
        const comboNames = [
          "Chef's Special", "Fiesta Trio", "Flavor Blast", "Meal Magic",
          "The Ultimate Treat", "Sizzling Delight", "Taste Adventure",
          "Gourmet Trio", "Epic Bite", "Yum Combo", "Feast Fusion", "Savory Surprise"
        ];
      
        for (let i = 0; i < totalCombos; i++) {
          // Shuffle and pick 3 random items
          const shuffledItems = [...menuItems].sort(() => 0.5 - Math.random());
          const comboItems = shuffledItems.slice(0, 3);
      
          // Create a formatted string of the meal combo
          const comboDescription = comboItems.map(item => item.name).join(", ");
      
          // Create the combo deal with a catchy name and description
          const combo = {
            id: i, // or a unique ID if available
            name: comboNames[i],
            description: comboDescription,
            items: comboItems,
          };
      
          comboDeals.push(combo);
        }
      
        setComboDeals(comboDeals);
      };
      
      
      
    
    // Handle category change
    const handleCategoryChange = useCallback((category) => {
      setSelectedCategory(category);
    }, []);
    
    // Handle adding item to cart
    const handleAddToCart = (item) => {
      const newCart = [...cart, item];
      setCart(newCart);
      setTotalPrice(newCart.reduce((acc, cur) => acc + cur.price, 0));
    };
    
    // Handle adding combo to cart
    const handleComboAddToCart = (combo) => {
      const newCart = [...cart, ...combo];
      setCart(newCart);
      setTotalPrice(newCart.reduce((acc, cur) => acc + cur.price, 0));
    };
    
    // Handle checkout
    const handleCheckout = async () => {
      try {
        // Check for JWT token in localStorage
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          alert('User not logged in!');
          return;
        }
    
        // Fetch the user's profile using the token
        const profileResponse = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const userId = profileResponse.data?._id; // Check if _id exists in response
        if (!userId) {
          alert('Failed to retrieve user profile. Please login again.');
          return;
        }
    
        // Check if cart is empty
        if (!cart || cart.length === 0) {
          alert('Your cart is empty.');
          return;
        }
    
        // Prepare order payload
        const orderPayload = {
          items: cart.map((item) => ({
            menuItemId: item._id,
            quantity: item.quantity || 1, // Use item quantity if available
          })),
          userId,
        };
    
        // Send order request
        const orderResponse = await axios.post(
          'http://localhost:5000/api/orders',
          orderPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        // Handle success
        if (orderResponse.status === 201) {
          alert('Order placed successfully!');
          setCart([]); // Clear cart after successful order
          setTotalPrice(0);
          navigate('/order-confirmation'); // Redirect to order confirmation page
        } else {
          alert('Failed to place order. Please try again.');
        }
      } catch (error) {
        console.error('Checkout Error:', error);
        
        // Check for detailed error response
        if (error.response) {
          console.error('Error Response:', error.response.data);
          alert(`Checkout Error: ${error.response.data.message || 'Please try again later.'}`);
        } else {
          alert('Error during checkout. Please check your connection and try again.');
        }
      }
    };
    
      
      
      
      
      
      
  
    return (
     
      
      
      <MenuPageContainer>
        <Sidebar>
          {categories.map((category) => (
            <div key={category.name} onClick={() => handleCategoryChange(category.name)}>
              {category.icon}
              <span>{category.name}</span>
            </div>
          ))}
        </Sidebar>
  
        <MainContent>
          {loading && <LoadingSpinner />}
          {error && <div>{error}</div>}
          <h2>{selectedCategory} Menu</h2>
          <MenuSectionContainer>
            {menuData[selectedCategory]?.map((item) => (
              <MenuItemContainer key={item.id}>
                <MenuItemCard>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <small>{item.description}</small>
                  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </MenuItemCard>
              </MenuItemContainer>
            ))}
          </MenuSectionContainer>
  
          <ComboDealsContainer>
      <Title>{comboDeals[currentComboPage]?.name || "Combo Deals"}</Title>

      <ComboPage>
        {comboDeals[currentComboPage]?.items?.map((comboItem, index) => (
          <ComboItem key={comboItem.id || index}>
            <ComboName>{comboItem.name}</ComboName>
            <ComboDescription>{comboItem.description}</ComboDescription>
            <AddButton onClick={() => handleComboAddToCart(comboItem)}>
              <Icon />
              Add Combo
            </AddButton>
          </ComboItem>
        ))}
      </ComboPage>

      <Pagination>
        <NavButton
          disabled={currentComboPage === 0}
          onClick={() => setCurrentComboPage(currentComboPage - 1)}
        >
          Previous
        </NavButton>
        <NavButton
          disabled={currentComboPage === comboDeals.length - 1}
          onClick={() => setCurrentComboPage(currentComboPage + 1)}
        >
          Next
        </NavButton>
      </Pagination>
    </ComboDealsContainer>
  
          <CartContainer>
            <h4>Cart</h4>
            {cart.map((item, index) => (
              <div key={index}>
                <span>{item.name}</span>
                <small>${item.price}</small>
              </div>
            ))}
            <div>
              <span>Total: ${totalPrice}</span>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
          </CartContainer>
        </MainContent>
      </MenuPageContainer>
    );
  };
  
  export default MenuPage;