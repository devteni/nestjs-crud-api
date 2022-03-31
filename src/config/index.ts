export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoURI: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
});
