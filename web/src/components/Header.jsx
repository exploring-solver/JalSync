import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    JalSync
                </Typography>
                <Button color="inherit" component={Link} to="/">Dashboard</Button>
                <Button color="inherit" component={Link} to="/assets">Assets</Button>
                <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
                <Button color="inherit" component={Link} to="/finance">Finance</Button>
                <Button color="inherit" component={Link} to="/billing">Bill Generation</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
