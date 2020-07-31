export default {
    db: {
      uri: 'mongodb+srv://dbAdmin:dbAdminPass@cluster0.pyhr9.mongodb.net/<dbname>?retryWrites=true&w=majority'//place the URI of your mongo database here.
    },
    jwt: {
      secretKey: 'secretKeyChinomoi'
    },
    cloudinary: {
      API_key: '955998156969323',
      API_secret: '4Ti4yHXyqF8BO5P1Gw5E6_Mxk00',
      cloudName: "rodanm"
    },
    port: 5000
  }; 

  // OR use .env (npm dotenv)