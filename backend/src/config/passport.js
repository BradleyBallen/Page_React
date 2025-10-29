import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        
        const userData = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };

        done(null, userData);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
