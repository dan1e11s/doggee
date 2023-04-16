import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { RegistrationPage, NotFoundPage, LoginPage, HomePage } from '@pages';
import { IntlProvider } from '@features';
import { getLocale, getMessages } from './utils/helpers';

const AuthRoutes = () => (
  <Routes>
    <Route path="/auth" element={<LoginPage />} />
    <Route path="/registration" element={<RegistrationPage />} />
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [messages, setMessages] = useState({});
  const locale = getLocale();

  useEffect(() => {
    getMessages(locale).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
    });
  }, []);

  console.log(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
    </IntlProvider>
  );
}

export default App;
