import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1e1e2f',
                color: '#ffffff',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center' }}
            >
                <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '6rem', color: '#FF5252' }}>
                    403
                </Typography>
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Unauthorized Access
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
                    You don't have permission to view this page.
                </Typography>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    style={{ marginTop: '20px' }}
                >
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#FF5252', color: '#ffffff', px: 4, py: 1.5 }}
                        onClick={handleBackHome}
                    >
                        Go Back Home
                    </Button>
                </motion.div>
            </motion.div>
        </Box>
    );
};

export default UnauthorizedPage;