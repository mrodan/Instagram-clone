import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import config from './config/config.js'; // To import config.js, had to add "type": "module" into the package.json to import/read files as ES6
import authRouter from './routes/AuthRouter.js';
import userRouter from './routes/UserRouter.js'
import postRouter from './routes/PostRouter.js';
import apiRouter from './routes/ApiRouter.js';


// DATABASE CONNECTION
// try {
//     await mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
//   } catch (error) {
//       console.log("Error connecting to DB");
//   }
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log("Successfully connected to DB");
});
// Event triggers when the connection gives an error
mongoose.connection.on('error', () => {
    console.log("Error in connection to DB");
});
// Event triggers when the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log("Connection to DB is closed");
});


const app = express(); // Init express app
app.use(morgan('dev')); // Request log
app.use(cookieParser()); // Use cookieParser module
//app.use(express.json()) // Use body-parser module
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use('/api', apiRouter);



app.listen(config.port, () => {
    console.log(`App now listening on port ${config.port}`);
});









/*
// Test userSchemaV1 and save doc
import User from './models/UserModel.js';
const userInput = {
    username: "chinoRodan",
    fullName: "Moises Rodan",
    password: "123456789",
    email: "rodanm@gmail.com",
    mobile: "+17866569480",
    privilege: "admin",
    dob: "1993-03-10"
}
const user = new User(userInput);
user.save((err, document) => {
    if (err)
        console.log("Error saving document in DB");
    console.log(document);
});
*/