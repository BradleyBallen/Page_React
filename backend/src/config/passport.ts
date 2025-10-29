import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: User | false | null) => void
    ) => {
      try {
        // Buscar si el usuario ya existe en la base de datos
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        // Si no existe, lo creamos
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              googleId: profile.id,
              profileImage: profile.photos?.[0]?.value ?? "",
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialización y deserialización del usuario (necesario para sesiones)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
