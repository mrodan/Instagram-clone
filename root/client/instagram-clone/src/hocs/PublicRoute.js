import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// Destructure the props. ...rest collects all properties not pulled out before and store them in ...rest
const PublicRoute = ({component : Component, ...rest})=>{
    const { isAuthenticated } = useContext(AuthContext);
    return(
        // Pass props to route. (spread operator) Use Route component to pass the props (within ...rest variable)
        <Route {...rest} render={props =>{
            if(isAuthenticated)
                return <Redirect to={{ pathname: '/', 
                                       state : {from : props.location}}}/>

            // Here the user is authenticated and has correct privileges 
            return <Component {...props}/> // Spread operator to copy over the props into the component we want to render
        }}/>
    )
}

export default PublicRoute;