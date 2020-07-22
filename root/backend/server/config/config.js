export default {
    db: {
      uri: 'mongodb+srv://dbAdmin:dbAdminPass@cluster0.pyhr9.mongodb.net/<dbname>?retryWrites=true&w=majority'//place the URI of your mongo database here.
    },
    jwt: {
      secretKey: "secretKeyChinomoi" //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
    },
    port: 5000
  };