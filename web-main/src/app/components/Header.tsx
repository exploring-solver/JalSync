"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    JalSync
                </Typography>
                <a href="/">
                    <Button color="inherit" >Dashboard</Button>
                </a>
                <a href="/assetmgmt">
                    <Button color="inherit" >Assets</Button>
                </a>
                <a href="/inventory">
                    <Button color="inherit" >Inventory</Button>
                </a>
                <a href="/finance">
                    <Button color="inherit" >Finance</Button>
                </a>
                <a href="/billing">
                    <Button color="inherit" >Bill Generation</Button>
                </a>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
