import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Input, Button, HStack, VStack, Center } from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate('/home'); // Redirect to "/home"

        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging in. Please try again.');
      });
  };
  const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  return (

    <div >
            <form onSubmit={onSubmit}>
            <h1>SignIn Below!</h1>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <input type="submit" value="Submit" />
          </form>

          </div>
  );
};


export default SignIn;