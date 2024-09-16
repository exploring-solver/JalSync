import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ textAlign: 'center', py: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} Team Ramanujan for SIH 2024 - Solution Name: <strong>JalSync</strong>
            </Typography>
        </Box>
    );
};

export default Footer;
