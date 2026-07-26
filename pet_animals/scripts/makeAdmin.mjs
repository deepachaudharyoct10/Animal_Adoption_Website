// One-off local script to promote an existing user to admin.
// Not part of the app's public API on purpose — this is the only way to grant
// admin access, and it requires your MONGODB_URI (from .env.local), so only
// whoever has that connection string can create an admin.
//
// Usage: node scripts/makeAdmin.mjs someone@example.com

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  if (process.env.MONGODB_URI) return;
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: node scripts/makeAdmin.mjs <email>");
    process.exit(1);
  }

  loadEnvLocal();

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in environment or .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const result = await mongoose.connection.collection("users").updateOne(
    { email },
    { $set: { role: "admin" } }
  );

  if (result.matchedCount === 0) {
    console.error(`No user found with email: ${email} (must match exactly as registered)`);
  } else {
    console.log(`${email} is now an admin.`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
