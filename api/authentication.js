const passport = require('passport');
const sequelize = require('./models');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
  
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const result = await sequelize.models.users.findOne({
        where: { id: payload.id },
      });
      if (result) {
        return done(null, result);
      }
      return done(null, false);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  })
);
  
passport.serializeUser((user, done) => {
  done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
  const user = await sequelize.models.users.findOne({
    where: { id },
  });
  done(null, user);
});