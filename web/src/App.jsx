import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Error404 from './components/Error404';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;