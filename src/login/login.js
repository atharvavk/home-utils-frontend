import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted key:', key);
    localStorage.setItem('key', key)
    navigate("/")
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2, 
          p: 2, 
          border: '1px solid #ccc', 
          borderRadius: '8px' 
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Key"
            variant="outlined"
            fullWidth
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
