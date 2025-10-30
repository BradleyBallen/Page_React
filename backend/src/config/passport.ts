import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


console.log("🧩 Variables de entorno cargadas:");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Cargado" : "❌ NO cargado");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
      proxy: true,
    },
    async (_accessToken, _refreshToken, profile: Profile, done) => {
      console.log("✅ Callback de GoogleStrategy alcanzado");
      console.log("📧 Email recibido:", profile.emails?.[0]?.value);
      console.log("🆔 Google ID:", profile.id);
      console.log("🖼️ Foto:", profile.photos?.[0]?.value);

      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          console.error("❌ No se encontró email en el perfil de Google.");
          return done(new Error("No email found in Google profile"), null);
        }

        console.log("🔍 Buscando usuario en la base de datos...");
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          console.log("🚀 Usuario no encontrado, creando nuevo usuario...");
          user = await prisma.user.create({
            data: {
              name: profile.displayName || "Usuario sin nombre",
              email,
              googleId: profile.id,
              profileImage: profile.photos?.[0]?.value || "",
            },
          });
          console.log("🆕 Usuario creado con éxito:", user.email);
        } else {
          console.log("👤 Usuario existente:", user.email);
        }

        console.log("✅ Autenticación exitosa, devolviendo usuario a Passport...");
        return done(null, user);
      } catch (error) {
        console.error("❌ Error durante la autenticación de Google:");
        console.error(error);
        return done(error, null);
      }
    }
  )
);
// Log adicional:
console.log("🚦 Configuración actual de GoogleStrategy:");
console.log({
  redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  client_id: process.env.GOOGLE_CLIENT_ID,
});

// 🟡 Serialización (guarda solo el ID del usuario en sesión)
passport.serializeUser((user: any, done) => {
  console.log("🧠 Serializando usuario con ID:", user.id);
  done(null, user.id);
});

// 🟡 Deserialización (recupera usuario desde DB)
passport.deserializeUser(async (id: number, done) => {
  console.log("🧩 Deserializando usuario con ID:", id);
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      console.error("⚠️ Usuario no encontrado en DB durante deserialización.");
    } else {
      console.log("✅ Usuario recuperado:", user.email);
    }
    done(null, user);
  } catch (err) {
    console.error("❌ Error al deserializar usuario:", err);
    done(err, null);
  }
});

export default passport;
