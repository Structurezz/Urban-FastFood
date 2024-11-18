import React, { useEffect, useState } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaStar } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

// Keyframes should be defined first
const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContactContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledHeading = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f24e1e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 20px;
`;

const RestaurantInfo = styled.div`
  margin-bottom: 40px;
`;

const InfoText = styled.p`
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const RatingStars = styled.div`
  margin-right: 10px;
  font-size: 30px;
  color: #ffcc00;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
`;

const ContactItem = styled.div`
  text-align: center;
  font-size: 18px;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  color: #f24e1e;
  font-size: 22px;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SocialIcon = styled.a`
  margin: 0 15px;
  font-size: 30px;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const Footer = styled.footer`
  display: ${({ show }) => (show ? 'block' : 'none')};
  background-color: #f24e1e;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
  animation: ${slideUpAnimation} 0.8s ease forwards;
`;

const FAQSection = styled.div`
  margin: 20px 0;
`;

const FAQItem = styled.div`
  margin-bottom: 10px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${fadeInAnimation} 0.5s ease forwards;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333;

  &:hover {
    background-color: #ffefea;
  }

  strong {
    color: #f24e1e;
  }
`;

const Answer = styled.p`
  max-height: ${({ expanded }) => (expanded ? '200px' : '0')};
  opacity: ${({ expanded }) => (expanded ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  padding-left: 20px;
  color: #333;
`;

const AdditionalInfo = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ContactPage = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Handle footer visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;
      setShowFooter(scrollPosition >= pageHeight - 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ContactContainer>
      <SectionTitle>Contact Us</SectionTitle>

      {/* Restaurant Info Section */}
      <RestaurantInfo>
        <StyledHeading>URBAN FOOD</StyledHeading>
        <InfoText>
          Welcome to our fast-food restaurant, where we serve hot, fresh, and delicious meals at lightning speed! From crispy fries to juicy burgers and mouth-watering milkshakes, we’ve got everything to satisfy your cravings. Stop by and enjoy a quick, tasty meal with us today!
        </InfoText>
      </RestaurantInfo>

      {/* Ratings Section */}
      <RatingSection>
        <RatingStars>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </RatingStars>
        <span style={{ fontSize: '20px', color: '#f24e1e' }}>5/5 - Excellent</span>
      </RatingSection>

      {/* Contact Info Section with FontAwesome Icons */}
      <ContactInfo>
        <ContactItem>
          <IconWrapper><FaMapMarkerAlt /></IconWrapper>
          <h4>Address</h4>
          <p>123 Fast Food Blvd, Cityville</p>
        </ContactItem>
        <ContactItem>
          <IconWrapper><FaEnvelope /></IconWrapper>
          <h4>Email</h4>
          <p>contact@fastfood.com</p>
        </ContactItem>
        <ContactItem>
          <IconWrapper><FaPhoneAlt /></IconWrapper>
          <h4>Phone</h4>
          <p>(123) 456-7890</p>
        </ContactItem>
      </ContactInfo>

      {/* Social Media Links */}
      <SocialMedia>
        <SocialIcon href="https://www.facebook.com/fastfood" target="_blank" rel="noreferrer">
          <FaFacebook />
        </SocialIcon>
        <SocialIcon href="https://www.instagram.com/fastfood" target="_blank" rel="noreferrer">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://www.twitter.com/fastfood" target="_blank" rel="noreferrer">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://www.whatsapp.com/fastfood" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </SocialIcon>
      </SocialMedia>

      {/* Additional Info */}
      <AdditionalInfo>
        <h4>Delivery Hours:</h4>
        <p>Monday - Sunday: 10 AM - 10 PM</p>
        <h4>Special Discounts:</h4>
        <p>Enjoy 10% off your first online order!</p>
      </AdditionalInfo>

      {/* Footer with Animation */}
      <Footer show={showFooter}>
        <p>Thank you for visiting our website. We hope to serve you soon!</p>
      </Footer>

      {/* FAQ Section */}
      {/* FAQ Section */}
<FAQSection>
  <FAQItem onClick={() => toggleFAQ(0)} className="faq-item">
    <strong>What are your opening hours?</strong>
    <span>{expandedIndex === 0 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 0}>
    We are open Monday through Sunday from 10 AM to 10 PM.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(1)} className="faq-item">
    <strong>Do you offer vegetarian options?</strong>
    <span>{expandedIndex === 1 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 1}>
    Yes, we have a variety of vegetarian burgers, fries, and milkshakes.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(2)} className="faq-item">
    <strong>Can I place an order online?</strong>
    <span>{expandedIndex === 2 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 2}>
    Yes, you can place an order online through our website or mobile app.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(3)} className="faq-item">
    <strong>Do you offer delivery?</strong>
    <span>{expandedIndex === 3 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 3}>
    Yes, we offer delivery through third-party services like Uber Eats and DoorDash.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(4)} className="faq-item">
    <strong>Do you accept credit card payments?</strong>
    <span>{expandedIndex === 4 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 4}>
    Yes, we accept all major credit cards, including Visa, MasterCard, and American Express.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(5)} className="faq-item">
    <strong>Are your products gluten-free?</strong>
    <span>{expandedIndex === 5 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 5}>
    We offer some gluten-free options, such as salads and fries, but our kitchen is not gluten-free.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(6)} className="faq-item">
    <strong>What should I do if I have a food allergy?</strong>
    <span>{expandedIndex === 6 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 6}>
    Please inform our staff of any food allergies, and we will do our best to accommodate your needs.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(7)} className="faq-item">
    <strong>Can I customize my order?</strong>
    <span>{expandedIndex === 7 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 7}>
    Yes, you can customize your order, such as removing ingredients or adding extras.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(8)} className="faq-item">
    <strong>Do you offer any special promotions?</strong>
    <span>{expandedIndex === 8 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 8}>
    Yes, we offer discounts and promotions regularly. Be sure to sign up for our newsletter for updates.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(9)} className="faq-item">
    <strong>What is your return policy?</strong>
    <span>{expandedIndex === 9 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 9}>
    We do not offer returns on food items, but if there is an issue with your order, please contact us.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(10)} className="faq-item">
    <strong>How do I contact customer service?</strong>
    <span>{expandedIndex === 10 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 10}>
    You can contact customer service by calling (123) 456-7890 or emailing support@fastfood.com.
  </Answer>

  <FAQItem onClick={() => toggleFAQ(11)} className="faq-item">
    <strong>Do you offer catering services?</strong>
    <span>{expandedIndex === 11 ? '-' : '+'}</span>
  </FAQItem>
  <Answer expanded={expandedIndex === 11}>
    Yes, we offer catering services for events and parties. Please contact us for more details.
  </Answer>
</FAQSection>

    </ContactContainer>
  );
};

export default ContactPage;
