import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';


// Context is a global state for the whole app
// It gives a provider and a consumer
export const AuthContext = createContext();

// Children are the components that the provider will wrap around
export default ({ children }) => {
    /*const [username, setUsername] = useState({
        username: '',
        _id: ''
    });*/
    const [clientUsername, setClientUsername] = useState("");
    const [client_id, setClient_id] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            //console.log(data)
            /*setUser({
                username: data.user.username,
                _id: data.user._id
            });*/
            setClientUsername(data.user.username);
            setClient_id(data.user._id)
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []); // Empty array to be exectued once

    // Anything wrapped within the provider will have access to the global state
    // value = {what we want available as global state}
    return (
        <div>
            {!isLoaded ? <h1>Loading..</h1> : 
                <AuthContext.Provider value={{ client_id, clientUsername, setClientUsername, isAuthenticated, setIsAuthenticated }}>
                    { children }    
                </AuthContext.Provider>}
        </div>
    )
}