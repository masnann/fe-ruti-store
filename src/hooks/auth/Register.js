import React, { useState } from 'react';
import { BASE_URL } from '../../utils/ApiConfig';
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
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
        const data = await response.json();
        console.log('User registered successfully:', data);
        setSuccessMessage('Registration successful!');
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register user');
        console.error('Failed to register user:', errorData);
      }
    } catch (error) {
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
