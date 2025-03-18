import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
    const [data, setData] = useState({
        userCount: 0,
        bookingCount: 0,
        accBookingCount: 0,
        tourCount: 0,
        canceledBookings: 0,
        weeklyRevenue: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
            const {data}=await  axios.get("http://localhost:8000/dashboard")

            setData({
                userCount:data.userCount,
                bookingCount:data.totalTourBookings,
                accBookingCount:data.totalAccommodationBookings,
                tourCount:data.totalTourPlaces,
                canceledBookings:data.canceledBookings,
                totalRevenue:data.totalRevenue,
                weeklyRevenue:data.weeklyRevenue,
            })

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const dashboardItems = [
        { title: 'Total Users', value: data.userCount, bgColor: '#E3F2FD' },
        { title: 'Total Bookings', value: data.bookingCount, bgColor: '#FCE4EC' },
        { title: 'Accommodation Bookings', value: data.accBookingCount, bgColor: '#E8F5E9' },
        { title: 'Tour Places', value: data.tourCount, bgColor: '#FFF3E0' },
        { title: 'Canceled Bookings', value: data.canceledBookings, bgColor: '#F3E5F5' },
        { title: 'Weekly Revenue', value: `₹${data.weeklyRevenue}`, bgColor: '#E1F5FE' },
        { title: 'Total Revenue', value: `₹${data.totalRevenue}`, bgColor: '#FBE9E7' },
       
    ];

    return (
        <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976D2' }}>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                {dashboardItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{
                            backgroundColor: item.bgColor,
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            borderRadius: '15px',
                            textAlign: 'center',
                            p: 2,
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                            }
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: '#424242', fontWeight: 'bold' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#1976D2', mt: 1 }}>
                                    {item.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
