import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useContext } from 'react';

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #000;
  color: #ff5722;
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  max-height: 90px;
  object-fit: contain;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 5px 10px;
  width: 300px;
  position: relative; 
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 5px;
  font-size: 1rem;
  border-radius: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #ff5722;
`;

const Modal = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 250px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #ff5722;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #e64a19;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%; 
  padding: 10px;
  list-style: none;
  margin: 0;
  z-index: 25;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  transition: background 0.3s ease;
  width: 80%; 
  text-align: center; 
  border-radius: 5px;
`;

const TopBar = () => {
  // User Authentication & Profile State
  const { loggedIn, profile, login, logout, setProfile } = useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  
  // Menu & Search State
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const extractFirstName = (email) => {
    if (!email) return 'Guest';

    // Split email to get the part before the '@'
    const [localPart] = email.split('@');
  
    // Further split by common delimiters like '.' or '_' and return the first part
    const firstName = localPart.split(/[._]/)[0];
  
    // Capitalize the first letter
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  const fetchUserProfile = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const email = response.data.email || "";
      const username = response.data.username || "";
      const firstName = extractFirstName(email);
      // Assuming `setProfile` is passed from context
      setProfile({ firstName, email, username });
    } catch (error) {
      console.error("Failed to fetch user profile:", error.message);
    }
  }, [setProfile]);

  const fetchMenuItems = useCallback(async (query = "") => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu-items', {
        params: { query },
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error.message);
    }
  }, []);

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
            email,
            password,
        });

        if (response.status !== 200) {
            throw new Error('Invalid login credentials');
        }

        const { token, userId } = response.data;

        // Store token and userId in localStorage
        login(token, userId);
        setShowLoginModal(false);
    } catch (error) {
        console.error("Login error:", error.message);
    }
};


  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });

      if (response.status !== 201) {
        throw new Error('Failed to sign up');
      }

      const data = response.data;
      localStorage.setItem('token', data.token);
      setShowSignUpModal(false);
      await fetchUserProfile(data.token);
    } catch (error) {
      setError(error.response && error.response.status === 409 ? 'Email or username already exists. Please try another.' : error.message);
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileModal(false);
    localStorage.removeItem('token');
    // Reset profile here if needed
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token); 
    }
  }, [fetchUserProfile]);

  const handleProfileClick = () => {
    if (loggedIn) {
      setShowProfileModal(!showProfileModal);
      setShowDropdown(false);
    } else {
      setShowLoginModal(true); // Show login modal if not logged in
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim()) {
      fetchMenuItems(query);
      setShowDropdown(true);
    } else {
      setMenuItems([]);
      setShowDropdown(false);
    }
  };

  return (
    <TopBarContainer>
      <Logo src="/Urban-food-logo.png" alt="Urban FastFood Logo" />
      <SearchBar>
        <FaSearch color="#ff5722" />
        <SearchInput 
          placeholder="Search for food..." 
          value={searchTerm}
          onChange={handleSearchChange} 
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
      </SearchBar>
      <IconContainer>
        <FaShoppingCart size={20} />
        <FaUserCircle size={20} onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
      </IconContainer>

      {/* Profile modal */}
      {showProfileModal && loggedIn && (
        <Modal>
          <h3>Welcome  Back!! {extractFirstName(profile.email)}</h3>
          <p>Email: {profile.email}</p>
          <p>Username: {profile.username}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </Modal>
      )}

      {/* Login modal */}
      {showLoginModal && (
        <Modal>
          <h3>Login</h3>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
          />
          {error && <p>{error}</p>}
          <Button onClick={handleLogin}>Login</Button>
          <p>Don't have an account? <span onClick={() => setShowSignUpModal(true)} style={{ cursor: 'pointer' }}>Sign Up</span></p>
        </Modal>
      )}

      {/* SignUp modal */}
      {showSignUpModal && (
        <Modal>
          <h3>Sign Up</h3>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username"
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
          />
          {error && <p>{error}</p>}
          <Button onClick={handleSignUp}>Sign Up</Button>
        </Modal>
      )}

      {/* Dropdown */}
      {showDropdown && searchTerm.trim() && (
        <Dropdown>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <DropdownItem key={item.id}>{item.name}</DropdownItem>
            ))
          ) : (
            <DropdownItem>No items found</DropdownItem>
          )}
        </Dropdown>
      )}
    </TopBarContainer>
  );
};

export default TopBar;
