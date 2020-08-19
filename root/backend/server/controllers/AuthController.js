import JWT from 'jsonwebtoken';
import * as passportConfig from '../passport.js';
import User from '../models/UserModel.js';
import config from '../config/config.js';


export const register = (req, res) => {
    const newUserData = req.body;
    User.findOne({ $or: [{ username: newUserData.username }, { email: newUserData.email }, { mobile: newUserData.mobile }] })
        .then(user => {
            if (user) {
                if (user.username === newUserData.username)
                    res.status(400).json({ message: { messageBody: "Username already in use", messageError: true } });
                else if (user.email === newUserData.email)
                    res.status(400).json({ message: { messageBody: "Email already in use", messageError: true } });
                else if (user.mobile === newUserData.mobile)
                    res.status(400).json({ message: { messageBody: "Mobile already in use", messageError: true } });
            }
            else {
                const newUser = new User(newUserData);
                newUser.save()
                    .then(user => {
                        // After registering, it gets logged in
                        const { _id, username, privilege } = user;
                        const token = signToken(_id); // Create jwt token since we signed in
                        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
                        res.status(201).json({ isAuthenticated: true, user: { username, privilege }, message: { messageBody: "Account succesfully created & logged in", messageError: false } });
                        
                        // Only register
                        //res.status(201).json({ message: { messageBody: "Account succesfully created", messageError: false } });
                    })
                    .catch(err => {
                        //console.log(err);
                        res.status(500).json({ message: { messageBody: "Error has occured (saving user)", messageError: true } });
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ message: { messageBody: "Error has occured (checking if user exists)", messageError: true } });
        })
}


// Returns the actual JWT token. Do not send sensitive data (private, etc)
const signToken = userID => {
    return JWT.sign({
        iss: "MR", // Who issued the token
        sub: userID // user PK
    }, config.jwt.secretKey, { expiresIn: "1h" });
}

export const login = (req, res) => {
    if (req.isAuthenticated()) {
        // req.username comes from passport that is ataching the user object to the req obj
        const { _id, username } = req.user;
        const token = signToken(_id); // Create jwt token since we signed in
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        // httpOnly: Set that the client side cannot change this cookie.. prevent cross-site scripting attack
        // sameSite: prevent agains croos-site request forgery attacks (protect token not to be stolen?)
        res.status(200).json({ isAuthenticated: true, user: { username, _id } }); // ADD token **
    }
}


export const logout = (req, res) => {
    res.clearCookie('access_token'); //remove jwt access_token
    res.json({ user: { username: ""}, success: true }); // MAYBE ADD EMAIL AND PHONE? ***
    console.log("Succesfully logged out");
}

export const authenticated = (req, res) => {
    const { _id, username, privilege } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { _id, username } });
}