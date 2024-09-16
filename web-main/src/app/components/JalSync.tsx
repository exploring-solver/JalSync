"use client";

import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Card, CardContent, 
  Grid, Paper, List, ListItem, ListItemText, Box 
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

// Simulated data for the chart
const waterUsageData = [
  { name: 'Jan', usage: 4000 },
  { name: 'Feb', usage: 3000 },
  { name: 'Mar', usage: 2000 },
  { name: 'Apr', usage: 2780 },
  { name: 'May', usage: 1890 },
  { name: 'Jun', usage: 2390 },
];

const JalSync = () => {
  const [currentStep, setCurrentStep] = useState('dashboard');

  const renderContent = () => {
    switch(currentStep) {
      case 'dashboard':
        return <Dashboard onChooseTask={setCurrentStep} />;
      case 'checkAssets':
        return <CheckAssets />;
      case 'manageFinances':
        return <ManageFinances />;
      case 'planMaintenance':
        return <PlanMaintenance />;
      default:
        return <Dashboard onChooseTask={setCurrentStep} />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JalSync
          </Typography>
          <Button color="inherit" onClick={() => setCurrentStep('dashboard')}>Home</Button>
        </Toolbar>
      </AppBar>
      {renderContent()}
    </Box>
  );
};

const Dashboard = ({ onChooseTask }) => (
  <Grid container spacing={2} sx={{ p: 2 }}>
    <Grid item xs={12}>
      <Typography variant="h4">Welcome to JalSync Dashboard</Typography>
    </Grid>
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h5">Choose a Task</Typography>
          <List>
            <ListItem button onClick={() => onChooseTask('checkAssets')}>
              <ListItemText primary="Check Water Assets" />
            </ListItem>
            <ListItem button onClick={() => onChooseTask('manageFinances')}>
              <ListItemText primary="Manage Finances" />
            </ListItem>
            <ListItem button onClick={() => onChooseTask('planMaintenance')}>
              <ListItemText primary="Plan Maintenance" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={8}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Water Usage Analytics</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={waterUsageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="usage" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  </Grid>
);

const CheckAssets = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4">Check Water Assets</Typography>
    <Typography>Here you can view and manage your water assets.</Typography>
  </Box>
);

const ManageFinances = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4">Manage Finances</Typography>
    <Typography>Here you can manage bills and payments.</Typography>
  </Box>
);

const PlanMaintenance = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4">Plan Maintenance</Typography>
    <Typography>Here you can schedule and plan maintenance activities.</Typography>
  </Box>
);

export default JalSync;