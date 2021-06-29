import React from 'react';

// Core
import { AuthProvider } from './providers';
import App from './components/App/App';

const AppRoot = () => (
    <AuthProvider>
      <App />
    </AuthProvider>
);


export default AppRoot;
