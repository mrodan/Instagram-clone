import React, { useState, useContext } from 'react';
import AuthService from '../../Services/AuthService'
import { AuthContext } from '../../Context/AuthContext'
import './LoginStyle.css'

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //console.log(user);
    }

    const onSubmitHanlder = (e) => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            //console.log(data);
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/');
            }
            else
                setMessage(message);
        });
    }

    return (
        <div id="wrapper">
            <div className="container">
                <div className="phone-app-demo"></div>
                <div className="form-data">
                    <form onSubmit={onSubmitHanlder} action="">

                        <div className="logo">
                            <img className="img-login" src="https://i.ibb.co/rtXKD8W/instagram-logo-468-E0-CC266-seeklogo-com.png" alt="" />
                        </div>

                        <label htmlFor="username" classname="sr-only" />
                        <input type="text"
                            name="username"
                            onChange={onChangeHandler}
                            placeHolder="Username" />

                        <label htmlFor="password" classname="sr-only" />
                        <input type="password"
                            name="password"
                            onChange={onChangeHandler}
                            placeHolder="Password" />

                        <button className="form-btn" type="submit">Log in</button>

                        <span className="has-separator">Or</span>
                        <a className="facebook-login" href="#">
                            <i className="fab fa-facebook"></i> Log in with Facebook
                        </a>
                        <a className="password-reset" href="#">Forgot Password?</a>
                    </form>

                    <div className="sign-up">
                        Dont't have an account? <a href="/auth/register">Sign up</a>
                    </div>

                    <div className="get-the-app">
                        <span>Get the app.</span>
                        <div className="badges">
                            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" />
                            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <footer>
                    <div className="container">
                        <nav className="footer-nav">
                            <ul>
                                <li>
                                    <a href="#">ABOUT</a>
                                </li>
                                <li>
                                    <a href="#">HELP</a>
                                </li>
                                <li>
                                    <a href="#">PRESS</a>
                                </li>
                                <li>
                                    <a href="#">API</a>
                                </li>
                                <li>
                                    <a href="#">JOBS</a>
                                </li>
                                <li>
                                    <a href="#">PRIVACY</a>
                                </li>
                                <li>
                                    <a href="#">TERMS</a>
                                </li>
                                <li>
                                    <a href="#">LOCATIONS</a>
                                </li>
                                <li>
                                    <a href="#">TOP ACCOUNTS</a>
                                </li>
                                <li>
                                    <a href="#">HASHTAGS</a>
                                </li>
                                <li>
                                    <a href="#">LANGUAGE</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="copyright-notice">
                            &copy; 2020 INSTAGRAM
              </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Login;