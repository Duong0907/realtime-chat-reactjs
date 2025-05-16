import { createContext, useEffect, useState } from 'react';
import { getCurrentUserFromDB } from '../apiCalls/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUserFromDB().then((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('access-token');
    };

    return loading ? (
        'Loading...'
    ) : (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
