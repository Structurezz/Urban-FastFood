import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../components/UserContext';
import { useContext } from 'react';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [userId, setUserId] = useState('');
  const [order, setOrder] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editFeedback, setEditFeedback] = useState(null);
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);
  

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const loggedInUserId = localStorage.getItem('userId');
        if (loggedInUserId) {
          setUserId(loggedInUserId);
        }
        await fetchFeedbacks(loggedInUserId);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };
  
    fetchData();
  }, []);
  

  const fetchFeedbacks = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/feedback?userId=${userId}`);
      setFeedbacks(response.data);
    } catch (err) {
      setError('Error fetching feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !order || !comments || rating === 0) {
      setError('All fields are required');
      return;
    }

    const feedbackData = { userId, order, comments, rating };

    try {
      if (editFeedback) {
        const response = await axios.put(`http://localhost:5000/api/feedback/${editFeedback._id}`, feedbackData);
        const updatedFeedbacks = feedbacks.map((fb) =>
          fb._id === response.data._id ? response.data : fb
        );
        setFeedbacks(updatedFeedbacks);
        setEditFeedback(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/feedback', feedbackData);
        setFeedbacks([...feedbacks, response.data.feedback]);
      }
      setOrder('');
      setComments('');
      setRating(0);
    } catch (err) {
      setError('Error saving feedback');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
    } catch (err) {
      setError('Error deleting feedback');
    }
  };

  const handleEdit = (feedback) => {
    setOrder(feedback.order);
    setComments(feedback.comments);
    setRating(feedback.rating);
    setEditFeedback(feedback);
  };

  const handleStarClick = (index) => setRating(index);

  // Styling
  const styles = {
    page: {
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#10182B',
      padding: '40px',
      borderRadius: '10px',
      color: '#FFFFFF',
      maxWidth: '800px',
      margin: 'auto',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    },
    form: {
      backgroundColor: '#2B2F47',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      color: '#FFFFFF',
      backgroundColor: '#3C425C',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: '#FFFFFF',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      width: '100%',
      cursor: 'pointer',
      marginTop: '10px',
    },
    feedbackList: {
      borderTop: '2px solid #4CAF50',
      paddingTop: '20px',
    },
    feedbackItem: {
      backgroundColor: '#2B2F47',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    star: (selected) => ({
      color: selected ? '#FFD700' : '#555555',
      cursor: 'pointer',
      fontSize: '24px',
      margin: '0 2px',
    }),
    actions: {
      display: 'flex',
      gap: '10px',
    },
    editIcon: {
      color: '#4CAF50',
      cursor: 'pointer',
    },
    deleteIcon: {
      color: '#E74C3C',
      cursor: 'pointer',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    error: {
      color: '#E74C3C',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Customer Feedback</h1>
  
      {/* Display loading indicator */}
      {loading && <p style={styles.loading}>Loading, please wait...</p>}
  
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        <input
          type="text"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Order ID"
          required
          style={styles.input}
        />
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comments"
          required
          style={styles.input}
        />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              onClick={() => handleStarClick(index)}
              style={styles.star(index <= rating)}
            />
          ))}
        </div>
        <button type="submit" style={styles.button}>
          {editFeedback ? 'Update Feedback' : 'Submit Feedback'}
        </button>
      </form>
  
      <div style={styles.feedbackList}>
        <h2>Your Feedback</h2>
        
        {/* Display loading indicator before rendering feedback list */}
        {loading ? (
          <p>Loading feedbacks...</p>
        ) : (
          feedbacks.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback._id} style={styles.feedbackItem}>
                <div>
                  <p><strong>Order ID:</strong> {feedback.order}</p>
                  <div style={{ display: 'flex' }}>
                    {[...Array(feedback.rating)].map((_, i) => (
                      <FaStar key={i} style={styles.star(true)} />
                    ))}
                  </div>
                  <p>{feedback.comments}</p>
                </div>
                <div style={styles.actions}>
                  <FaEdit onClick={() => handleEdit(feedback)} style={styles.editIcon} />
                  <FaTrash onClick={() => handleDelete(feedback._id)} style={styles.deleteIcon} />
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
  
};

export default FeedbackPage;
