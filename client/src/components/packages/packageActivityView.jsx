import React from 'react';
import { Card, CardContent, Typography, Stack, Divider, Box } from '@mui/material';
import { EmojiEvents, LocationOn, CalendarToday, AccessTime, MonetizationOn, Person, Phone, Assignment } from '@mui/icons-material';

const icons = [
  <Assignment color="primary" />,
  <EmojiEvents color="secondary" />,
  <LocationOn sx={{ color: '#4caf50' }} />,
  <CalendarToday sx={{ color: '#03a9f4' }} />,
  <AccessTime sx={{ color: '#ff9800' }} />,
  <MonetizationOn sx={{ color: '#9c27b0' }} />,
  <Person sx={{ color: '#009688' }} />,
  <Phone sx={{ color: '#f44336' }} />,
];

const PackageActivitiesView = ({ packageData }) => {
  const activityItems = packageData.packageActivities?.split(',') || [];

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 3, borderRadius: 5, boxShadow: 6, background: 'linear-gradient(135deg, #e3f2fd, #fce4ec)' }}>
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', color: '#2e7d32' }}>
          Package Activities Overview
        </Typography>

        <Stack spacing={2}>
          {activityItems.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f8e9',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    backgroundColor: '#e0f7fa',
                  },
                }}
              >
                <Box sx={{ mr: 2 }}>{icons[index] || <Assignment />}</Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#37474f' }}>
                    Step {index + 1}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item}
                  </Typography>
                </Box>
              </Box>
              {index !== activityItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PackageActivitiesView;
