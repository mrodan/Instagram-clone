import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // ADD ROUTE FOR HOME PATH
//import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from './hocs/PublicRoute';
import Register from './components/register/Register';
import Login from './components/login/Login';


const App = () => {
  // Get data from the context (this is the consumer)
  //const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // Testing: Start server (npm start in backend), then start react (npm start in frontend/twitter-clone)
  //console.log(user);
  //console.log(isAuthenticated);

  //Route takes in a path, based on path is going to render different components
  return (
    <Router>
      <PublicRoute path="/auth/register" component={Register} />
      <PublicRoute path="/auth/login" component={Login} />
    </Router>
  );
}

export default App;

/*
<Route exact path="/" component={Home}/>
<Route path="/login" component={Login}/>
*/

  // return (
  //   <BrowserRouter>
  //      <NavBar/>
  //      <Route path='/' >
  //      </Route>
  //   </BrowserRouter>
  // );


