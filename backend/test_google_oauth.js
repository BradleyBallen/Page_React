import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function testOAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Verifica los valores actuales
  console.log("🔎 Verificando configuración actual:");
  console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);

  // Crea una URL de autenticación para ver si Google la acepta
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["email", "profile"],
  });

  console.log("\n🌐 URL generada por Google:");
  console.log(url);

  console.log("\n✅ Si abres esta URL en el navegador y te autenticas sin error, el redirect_uri está bien configurado.");
  console.log("❌ Si Google dice 'redirect_uri_mismatch', entonces la URI no coincide exactamente con la registrada en Google Cloud Console.");
}

testOAuth().catch(console.error);
