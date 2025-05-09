import React, { useState, useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import { motion } from 'framer-motion';
import loginImg from '../../assets/images/login.png';
import userIcon from '../../assets/images/user.png';

const Login = () => {

  const [credentials, setCredentials] = useState({
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
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...result.data, role: result.role } });
      navigate('/');

    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
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
            <img src={loginImg} alt="Login" style={{ width: '100%', borderRadius: '15px' }} />
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
                  <Typography variant="h4" gutterBottom>Login</Typography>
                </Box>
                <form onSubmit={handleClick}>
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
                    Login
                  </Button>
                </form>
                <Typography mt={2} textAlign="center">
                  Don't have an account? <Link to='/register'>Register Here!</Link>
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;