// src/components/Layout/Layout.js
import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import SideBar from './SideBar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  margin-left: 250px; /* Give space for the sidebar */
  margin-top: 60px; /* Make space for the fixed top bar */
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <SideBar />
      <div style={{ flex: 1 }}>
        <TopBar />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
