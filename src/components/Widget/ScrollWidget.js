// src/components/Widgets/ScrollWidget.js
import React from 'react';
import styled from 'styled-components';

// Styled container for the scrollable widget
const ScrollWidgetContainer = styled.div`
  width: 100%;
  height: 300px; /* You can adjust the height */
  overflow-y: auto;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
`;

const ScrollItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ScrollWidget = () => {
  return (
    <ScrollWidgetContainer>
      {/* Example of some scrollable content */}
      <ScrollItem>Item 1: Latest Activity</ScrollItem>
      <ScrollItem>Item 2: News Update</ScrollItem>
      <ScrollItem>Item 3: Notification</ScrollItem>
      <ScrollItem>Item 4: Event Update</ScrollItem>
      <ScrollItem>Item 5: Transaction History</ScrollItem>
      <ScrollItem>Item 6: System Alert</ScrollItem>
      <ScrollItem>Item 7: User Comment</ScrollItem>
      <ScrollItem>Item 8: Product Update</ScrollItem>
      <ScrollItem>Item 9: New Feature</ScrollItem>
      <ScrollItem>Item 10: Service Status</ScrollItem>
      {/* Add as many items as you like to fill up the scroll area */}
    </ScrollWidgetContainer>
  );
};

export default ScrollWidget;
