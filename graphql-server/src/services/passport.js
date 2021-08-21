const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { generateToken } = require('../lib/jwt');

const passportGoogle = (app) => {
  app.use(passport.initialize());
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const {
          displayName: username,
          id: googleId,
          _json: { email },
        } = profile;
        const newUser = {
          username,
          googleId,
          email,
          google: true,
        };
        try {
          const user = await User.findOne({ email });
          if (!user) {
            const newUserDoc = await User.create(newUser);
            return cb(null, newUserDoc);
          }
          return cb(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  app.get(
    '/google-login',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      session: false,
      passReqToCallback: true,
    }),
    async function (req, res) {
      const token = await generateToken({ id: req.user._id }, '1d');
      res.cookie('devConnector-session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        maxAge: 1000 * 60 * 60 * 24,
      });
      return res.send('done');
    }
  );
};

module.exports = passportGoogle;
