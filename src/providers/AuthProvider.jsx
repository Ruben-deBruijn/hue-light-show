import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const storage = AsyncStorage;
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async() => {
        try {
            const value = await storage.getItem('@user_token');
            if (value !== null) setCurrentUser(value);
        } catch(e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;