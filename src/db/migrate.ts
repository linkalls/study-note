import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set.");
}

const runMigrate = async () => {
  console.log("Running migrations...");

  const client = postgres(process.env.POSTGRES_URL!, { max: 1 });
  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "src/db/migrations" });

  console.log("Migrations completed.");
  await client.end();
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("Migration failed:");
  console.error(err);
  process.exit(1);
});
