import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // No navigation here because we want to use navigate inside components that are rendered *inside* Router
    // We can't use useNavigate here directly if AuthProvider is outside <Router>
    // But usually AuthProvider is inside <Router>. Let's check App.jsx.
    // Actually, to be safe, let's just return a state and a login function that returns a promise, 
    // keeping navigation in the component layer (Login page).

    const login = async (username, password) => {
        return new Promise((resolve, reject) => {
            // Small Delay
            setTimeout(() => {
                if (username === 'admin' && password === 'admin123') {
                    const userData = { name: 'Admin User', role: 'admin' };
                    setUser(userData);
                    resolve(userData);
                } else if (username === 'chef' && password === 'chef123') {
                    const userData = { name: 'Chef Gordon', role: 'chef' };
                    setUser(userData);
                    resolve(userData);
                } else if (username === 'waiter' && password === 'waiter123') {
                    const userData = { name: 'Waiter John', role: 'waiter' };
                    setUser(userData);
                    resolve(userData);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
