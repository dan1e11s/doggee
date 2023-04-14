import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationPage, NotFoundPage, LoginPage } from '@pages';

const AuthRoutes = () => (
  <Routes>
    <Route path="/auth" element={<LoginPage />} />
    <Route path="/registration" element={<RegistrationPage />} />
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
}

export default App;
