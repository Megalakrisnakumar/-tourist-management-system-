import React, { useState, useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config.js';
import { motion } from 'framer-motion';
import registerImg from '../../assets/images/register.png';
import userIcon from '../../assets/images/user.png';

const AdminRegister = () => {

  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...credentials, role: 'admin' })
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={registerImg} alt="Register" style={{ width: '100%', borderRadius: '15px' }} />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card elevation={6} sx={{ borderRadius: '15px', padding: 4 }}>
              <CardContent>
                <Box textAlign="center">
                  <img src={userIcon} alt="User Icon" style={{ width: '70px', marginBottom: '10px' }} />
                  <Typography variant="h4" gutterBottom>Register</Typography>
                </Box>
                <form onSubmit={handleClick}>
                  <TextField
                    label="Username"
                    fullWidth
                    required
                    id="userName"
                    margin="normal"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    required
                    id="email"
                    margin="normal"
                    type="email"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Password"
                    fullWidth
                    required
                    id="password"
                    margin="normal"
                    type="password"
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    sx={{ marginTop: 2 }}
                  >
                    Register
                  </Button>
                </form>
                <Typography mt={2} textAlign="center">
                  Already have an account? <Link to='/login'>Login Here!</Link>
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminRegister;