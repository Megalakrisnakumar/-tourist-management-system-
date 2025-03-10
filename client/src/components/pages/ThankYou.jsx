import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

const ThankYou = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#fff'
            }}
        >
            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '40px',
                            borderRadius: '20px',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 100, color: '#76ff03' }} />
                        <Typography variant="h2" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                            Thank You!
                        </Typography>
                        <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 3 }}>
                            Your tour is successfully booked!
                        </Typography>
                        <Button
                            component={Link}
                            to="/home"
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: '#76ff03',
                                color: '#000',
                                width: '60%',
                                '&:hover': {
                                    backgroundColor: '#64dd17'
                                }
                            }}
                        >
                            Back to Home
                        </Button>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ThankYou;