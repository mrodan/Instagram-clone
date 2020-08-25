// hocs = higher order components
// Protect the components you need to be logged on or have prvileges
import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// Destructure the props. ...rest collects all properties not pulled out before and store them in ...rest
const PrivateRoute = ({component : Component, privileges, ...rest})=>{
    const { isAuthenticated, user} = useContext(AuthContext);
    return(
        // Pass props to route. (spread operator) Use Route component to pass the props (within ...rest variable)
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Redirect to={{ pathname: '/auth/login', 
                                       state : {from : props.location}}}/>

            // ADD if /efcsfvs/ (username) does not exists, then go to user no user 

            // Here the user is authenticated and has correct privileges 
            return <Component {...props}/> // Spread operator to copy over the props into the component we want to render
        }}/>
    )
}

export default PrivateRoute;