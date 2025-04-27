import React, { createContext, useState } from 'react';

export const AuthContext = createContext(); // Context shared across all components

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user object, including token
    const [loading, setLoading] = useState(true);

    const register = async (email, password) => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setUser({ ...data.user, token: data.token }); // Store token with user in context
        } else {
            throw new Error(data.message || "Registration Failed");
        }
    };

    const login = async (email, password) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setUser({ ...data.user, token: data.token }); // Store token with user in context
            return data; // Return user and token (for use in components)
        } else {
            throw new Error(data.message || "Login failed");
        }
    };

    const logout = () => {
        setUser(null); // Remove user and token from context
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
