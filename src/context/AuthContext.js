import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(() => localStorage.getItem('role'));

    const login = (token, role) => {
        setAuthToken(token);
        setUserRole(role);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
    };

    const logout = () => {
        setAuthToken(null);
        setUserRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ authToken, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to access authentication context
 * @returns { authToken: string, userRole: string, login: (token: string, role: string) => void, logout: () => void }
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}