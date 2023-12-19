import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Basic form validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }
  
    try {
      const response = await fetch('https://back-dvsv.onrender.com/auth/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle specific error messages
        if (response.status === 401) {
          setError('Invalid email or password');
        } else if (response.status === 404) {
          setError('User not found');
        } else {
          setError(data.message || 'Login failed');
        }
        return;
      }
  
      // Store user information and token in the state or global state management
      // For simplicity, let's store them in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
  
      setError('');
      // Redirect to the home page or any other page
      navigate('/');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };
  

  const handleSignUp = (e) => {
    e.preventDefault();
    // Navigate to the signup page
    navigate('/signup');
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100 m-4">
        {/* Left Section with Text and Image */}
        <div className="col-md-6 col-lg-6 d-none d-md-block text-center">
          <div className="mb-4">
            {/* Replace the image path with the actual path */}
            <img src="data:image/jpeg;base64,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" alt="E-commerce" className="img-fluid" />
          </div>
          <div>
            <h2 className="mb-3">Welcome to Our E-commerce Website</h2>
            <p>Developed by Shreya Mishra</p>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="card mt-5">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <p>Don't have an account?</p>
                <Button variant="outline-primary" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
