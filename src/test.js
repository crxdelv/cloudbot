function assert(condition, error) {
  if(condition) return;
  console.error(`[E]: ${error}`);
  console.error("[=]: Test failed");
  process.exit(1);
}

console.info("[1]: Importing dotenv");
import dotenv from "dotenv";
dotenv.config();

console.info("[2]: Importing discord.js");
import discord from "discord.js";

console.info("[3]: Checking environment variables");
assert(process.env.TOKEN != null, "Missing environment variable: TOKEN");
assert(process.env.CLIENT_ID != null, "Missing environment variable: CLIENT_ID");

console.info("[=]: Test passed");
process.exit(0);