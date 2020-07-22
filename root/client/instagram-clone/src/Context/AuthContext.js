import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';


// The context gives a provider and a consumer
export const AuthContext = createContext();

// Children are the components that the provider will wrap around
export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); // If app is loaded

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []); // Empty array to be exectued once

    //value=What we want available as a global state
    return (
        
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>

        /*
        <div>
            {!isLoaded ? <h1>Loading..</h1> : 
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                    { children }    
                </AuthContext.Provider>}
        </div>
        */
    )
}