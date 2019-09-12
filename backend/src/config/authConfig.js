export default {
  secret: process.env.APP_SECRET,
  expiresIn: process.env.EXPIRES_IN || '7d',
};
