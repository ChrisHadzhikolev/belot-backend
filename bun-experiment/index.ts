import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});
const db = drizzle(connection);

const server = Bun.serve({
    port: 3069,
    fetch(req) {
      return new Response("Bun!");
    },
  });
  
  console.log(`Listening on http://localhost:${server.port} ...`);