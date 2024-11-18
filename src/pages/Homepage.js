import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import BurgerImage from '../assets/burger.png';

// Container for the HomePage
const HomePageContainer = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  color: #333;
  min-height: 100vh;
`;

// Locator Section (User location search for placing orders)
const LocatorSection = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const LocatorButton = styled.button`
  background-color: #ff5722;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #e64a19;
  }
`;

const LocatorText = styled.p`
  font-size: 18px;
  color: #555;
  margin-top: 10px;
`;

const LocationSearchForm = styled.form`
  margin-top: 20px;
  text-align: center;
`;

const LocationInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 80%;
  max-width: 400px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 30px;
  outline: none;

  &:focus {
    border-color: #ff5722;
  }
`;

const LocationList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
`;

const LocationItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5722;
    color: white;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
`;

// Featured Section (Special offers or promotions)
const FeaturedSection = styled.div`
  margin-top: 40px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #ff5722;
  margin-bottom: 20px;
`;

const FeaturedItem = styled.div`
  background-color: #ff5722;
  padding: 20px;
  color: white;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    font-size: 16px;
  }
`;

// Footer Section
const Footer = styled.footer`
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateY(${(props) => (props.visible ? '0' : '100%')});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const FooterLinks = styled.div`
  margin-bottom: 20px;

  a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s ease;

    &:hover {
      color: #ff5722;
    }
  }
`;

const SocialIcons = styled.div`
  font-size: 24px;
  margin-top: 10px;

  a {
    color: white;
    margin: 0 15px;
    transition: color 0.3s ease;

    &:hover {
      color: #ff5722;
    }
  }
`;

const HomePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [footerVisible, setFooterVisible] = useState(false);

  // Handle Order Now Button Click
  const handleOrderNowClick = () => {
    alert('Redirecting to the order page!');
  };

  // Fetch User's Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.error('Error fetching location: ', error)
    );
  }, []);

  // Handle input change in location search
  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
  
    if (event.target.value) {
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${event.target.value}&key=5d791b16b25847e8a20510899be94fa4`);
        const data = await response.json();
        setLocationSuggestions(data.results || []);
      } catch (error) {
        console.error("Error fetching location suggestions: ", error);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  // Handle scroll event to show footer
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if (bottom) {
      setFooterVisible(true);
    } else {
      setFooterVisible(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert(`You searched for: ${searchQuery}`);
    setSearchQuery('');
  };

  // Handle 'Find My Location' button click
  const handleFindMyLocationClick = () => {
    setIsFormVisible(true); // Show the location search form
  };

  return (
    <HomePageContainer>
      {/* Locator Section */}
      <LocatorSection>
        <LocatorButton onClick={handleFindMyLocationClick}>
          <FaMapMarkerAlt /> Find My Location
        </LocatorButton>
        <LocatorText>
          {userLocation
            ? `Location: Latitude: ${userLocation.lat.toFixed(2)}, Longitude: ${userLocation.lon.toFixed(2)}`
            : 'Locating your position...'}
        </LocatorText>

        {/* Location Search Form */}
        {isFormVisible && (
          <LocationSearchForm onSubmit={handleSearchSubmit}>
            <LocationInput
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <LocationList>
              {locationSuggestions.length > 0 ? (
                locationSuggestions.map((location, index) => (
                  <LocationItem key={index} onClick={() => alert(`You selected: ${location.formatted}`)}>
                    {location.formatted}
                  </LocationItem>
                ))
              ) : (
                <p>No suggestions found</p>
              )}
            </LocationList>
          </LocationSearchForm>
        )}
      </LocatorSection>

      {/* Featured Items Section */}
      <FeaturedSection>
        <Title>Special Offers</Title>
        <FeaturedItem>
          <h3>Buy 1 Get 1 Free!</h3>
          <p>On selected items today only. Don't miss out!</p>
        </FeaturedItem>
        <FeaturedItem>
          <h3>Discounted Meals</h3>
          <p>Up to 50% off on select meals this weekend!</p>
        </FeaturedItem>
      </FeaturedSection>

      {/* Order Now Image */}
      <div>
        <ImageContainer onClick={handleOrderNowClick}>
          <img src={BurgerImage} alt="Order Now" style={{ width: '100%', height: 'auto' }} />
        </ImageContainer>
      </div>

      {/* Footer Section */}
      <Footer visible={footerVisible}>
        <FooterLinks>
          <a href="/terms">Terms & Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </FooterLinks>
        <SocialIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </SocialIcons>
      </Footer>
    </HomePageContainer>
  );
};

export default HomePage;
