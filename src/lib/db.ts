import { neon } from "@neondatabase/serverless";

// Neon serverless (HTTP) client. Tagged-template values are sent as bound
// parameters, so interpolation is safe from SQL injection.
export const sql = neon(process.env.DATABASE_URL!);
