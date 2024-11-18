import React from 'react';
import styled from 'styled-components';
import { FaHome, FaRegCommentDots , FaUtensils, FaListAlt, FaEnvelope, FaCog, FaCreditCard } from 'react-icons/fa';  // Added FaCreditCard icon
import { Link } from 'react-router-dom';

const SideBarContainer = styled.div`
  width: 250px;
  height: 100vh; /* Make sure the sidebar takes the full height of the screen */
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed; /* Fix the sidebar on the left */
  top: 60px; /* Make sure it's below the top bar */
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.3s;

  &:hover {
    background-color: #444;
  }
`;

const NavLabel = styled.span`
  font-size: 1rem;
`;

const SideBar = () => {
  return (
    <SideBarContainer>
      <NavItem to="/">
        <FaHome size={20} />
        <NavLabel>Home</NavLabel>
      </NavItem>
      <NavItem to="/menu">
        <FaUtensils size={20} />
        <NavLabel>Menu</NavLabel>
      </NavItem>
      <NavItem to="/orders">
        <FaListAlt size={20} />
        <NavLabel>Orders</NavLabel>
      </NavItem>
      <NavItem to="/contact">
        <FaEnvelope size={20} />
        <NavLabel>Contact</NavLabel>
      </NavItem>
      <NavItem to="/settings">
        <FaCog size={20} />
        <NavLabel>Settings</NavLabel>
      </NavItem>
      {/* Added Payment link */}
      <NavItem to="/payment">
        <FaCreditCard size={20} /> {/* Icon for Payment */}
        <NavLabel>Payments</NavLabel>
      </NavItem>
      <NavItem to="/feedback">
        <FaRegCommentDots  size={20} /> {/* Icon for Payment */}
        <NavLabel>Feedback</NavLabel>
      </NavItem>
      
    </SideBarContainer>
  );
};

export default SideBar;
