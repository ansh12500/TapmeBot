// src/App.js
import React from 'react';
import './styles.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import ButtonTap from './components/ButtonTap';
import Navbar from './components/Navbar';
import TelegramIntegration from './components/TelegramIntegration';

const App = () => {
  const userId = '123'; // Hardcoded for now; fetch dynamically in the future

  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
        <h1 style={{ color: 'black' }}>Welcome to TapMe!</h1>
        <ButtonTap userId={userId} />
        <TelegramIntegration />
      </div>
    </ApolloProvider>
  );
};

export default App;
