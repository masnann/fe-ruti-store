import React, { useState } from 'react';
import { BASE_URL } from '../../utils/ApiConfig';
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const userData = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('User registered successfully:', data);
          setSuccessMessage('Registration successful!');
          // Redirect to login page after successful registration
          setTimeout(() => {
            navigate('/login');
          }, 3000); // Redirect after 3 seconds
        } else {
          // Handle the case where the response is not JSON
          setError('Invalid response format');
          console.error('Invalid response format:', response);
        }
      } else {
        // Handle non-OK responses
        const errorData = await response.json().catch(() => ({})); // Catch JSON parsing error
        setError(errorData.message || 'Failed to register user');
        console.error('Failed to register user:', errorData);
      }
    } catch (error) {
      // Handle network or other errors
      setError('Error registering user');
      console.error('Error registering user:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    successMessage,
  };
};

export default useRegister;
