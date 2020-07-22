import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../Services/AuthService';
import './RegisterStyle.css';

let registerOption = {};

const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        fullName: "",
        password: "",
        email: "",
    });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null); // Creates instance var to set timeout method

    // Cleans what useRef does
    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, [])

    const onChangeHandler = (e) => {
        //setUser({ ...user, [e.target.name]: e.target.value });
        const {value} = e.target;
        const isValidEmail = validateEmail(value);
        const tempUser = isValidEmail ? {...user, email: value} : {...user, mobile: value}
        setUser(tempUser);

        //registerOption = e.target.value;
    }

    const resetForm = () => {
        setUser({
            username: "",
            fullName: "",
            password: "",
            email: "",
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.messageError) {
                timerID = setTimeout(() => {
                    props.history.push('/'); // Where to go after registering
                }, 2000)
            }
        });
    }

    
    const validateEmail = (userOption) => {
        let checker = /\S+@\S+\.\S+/;
        return checker.test(userOption)
    }

    return (
        <div id="wrapper">
            <div className="container">
                <div className="phone-app-demo"></div>
                <div className="form-data">
                    <form onSubmit={onSubmit} action="">

                        <div className="logo">
                            <img src="https://i.ibb.co/rtXKD8W/instagram-logo-468-E0-CC266-seeklogo-com.png" alt="" />
                        </div>

                        <div className="sign-up-description">Sign up to see photos and videos from your friends.</div>
                        <button className="form-btn-fb-login" type="submit">Log in with Facebook</button>
                        <span className="has-separator">Or</span>

                        {/* { validateEmail(registerOption) ? user.email : user.mobile } */}
                        <label htmlFor="contact" />
                        <input type="text"
                            name= "contact"
                            value= {validateEmail(user.email) ? user.email : user.mobile}
                            onChange={onChangeHandler}
                            placeHolder="Mobile Number or Email" />

                        <label htmlFor="fullName" />
                        <input type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={onChangeHandler}
                            placeHolder="Full Name" />

                        <label htmlFor="username" />
                        <input type="text"
                            name="username"
                            value={user.username}
                            onChange={onChangeHandler}
                            placeHolder="Username" />

                        <label htmlFor="password" />
                        <input type="password"
                            name="password"
                            value={user.password}
                            onChange={onChangeHandler}
                            placeHolder="Password" />

                        <button className="form-btn-signup" type="submit">Sign up</button>

                        <div className="sign-up-agreement">By signing up, you agree to our Terms, Data Policy and Cookies Policy</div>
                    </form>

                    <div className="sign-up">
                        Have an account? <a href="/">Log in</a>
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
                                    <a href="/">ABOUT</a>
                                </li>
                                <li>
                                    <a href="/">HELP</a>
                                </li>
                                <li>
                                    <a href="/">PRESS</a>
                                </li>
                                <li>
                                    <a href="/">API</a>
                                </li>
                                <li>
                                    <a href="/">JOBS</a>
                                </li>
                                <li>
                                    <a href="/">PRIVACY</a>
                                </li>
                                <li>
                                    <a href="/">TERMS</a>
                                </li>
                                <li>
                                    <a href="/">LOCATIONS</a>
                                </li>
                                <li>
                                    <a href="/">TOP ACCOUNTS</a>
                                </li>
                                <li>
                                    <a href="/">HASHTAGS</a>
                                </li>
                                <li>
                                    <a href="/">LANGUAGE</a>
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
    )
}

export default Register;