import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // ADD ROUTE FOR HOME PATH
import './App.css';
import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from './hocs/PublicRoute';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home-view/HomeView';
import Explore from './components/explore-view/ExploreView';
import Profile from './components/profile-view/Profile';
import NewPost from './components/newPost/NewPost';
import UploadTest from './components/Tests/UploadTest';
import UserSearch from './components/navbar/Searchbar/UserSearch';

//import param from './components/Tests/param';
//<PrivateRoute path="/:username/:par" component={param}/>

const App = () => {
  //Route takes in a path, based on path is going to render different components
  return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/explore" component={Explore} />
        <PublicRoute path="/auth/register" component={Register} />
        <PublicRoute path="/auth/login" component={Login} />
        <PrivateRoute path="/newpost" component={NewPost}/>
        <PrivateRoute path="/profile/:username" component={Profile}/>




        
        <Route exact path='usersearch' component={UserSearch} />
        <Route exact path="/cloudinarytest" component={UploadTest} />
      </Router>
  );
}

export default App;