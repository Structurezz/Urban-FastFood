import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';

const SettingsPage = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // Load saved settings from localStorage when component mounts
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    const savedLanguage = localStorage.getItem('language');
    const savedNotifications = JSON.parse(localStorage.getItem('notifications'));

    if (savedDarkMode !== null) setIsDarkMode(savedDarkMode);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedNotifications) setNotifications(savedNotifications);
  }, [setIsDarkMode]);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleNotificationChange = (e) => {
    setNotifications((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSave = () => {
    // Persist settings in localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('language', language);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    alert('Settings saved successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Settings</h1>

      {/* Dark Mode Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          Dark Mode
        </label>
      </div>

      {/* Language Preference */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="language">Language: </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Notification Settings</h3>
        <div>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={notifications.email}
              onChange={handleNotificationChange}
            />
            Email Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sms"
              checked={notifications.sms}
              onChange={handleNotificationChange}
            />
            SMS Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="push"
              checked={notifications.push}
              onChange={handleNotificationChange}
            />
            Push Notifications
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Privacy Settings</h3>
        <div>
          <label>
            <input type="checkbox" />
            Make Profile Private
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" />
            Hide Email Address
          </label>
        </div>
      </div>

      {/* Save Settings */}
      <div>
        <button
          onClick={handleSave}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
