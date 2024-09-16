import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import JalSync from './components/JalSync';
import AssetsManagement from './components/AssetsManagement';
import InventoryManagement from './components/InventoryManagement';
import FinanceManagement from './components/FinanceManagement';
import BillGeneration from './components/BillGeneration';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/" element={<JalSync />} /> */}
            {/* <Route path="/" element={<Home
            Page />} /> */}
            <Route path="/assets" element={<AssetsManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/finance" element={<FinanceManagement />} />
            <Route path="/billing" element={<BillGeneration />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;