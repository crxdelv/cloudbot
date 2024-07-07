// If you prefer using ESM,
// make sure to add type: module
// on your package.json file.

import dotenv from "dotenv";
dotenv.config();

import {
  REST,
  Routes,
  Client,
  GatewayIntentBits
} from "discord.js";

const SearchCommand = {
  options: [
    {
      autocomplete: undefined,
      type: 3,
      choices: undefined,
      name: "query",
      name_localizations: undefined,
      description: "Keyword to search",
      description_localizations: undefined,
      required: true,
      max_length: undefined,
      min_length: 1
    }
  ],
  name: "search",
  name_localizations: undefined,
  description: "Search for a song",
  description_localizations: undefined,
  default_permission: undefined,
  default_member_permissions: undefined,
  dm_permission: undefined,
  nsfw: undefined,
  async execute(interaction) {
    console.log(`\n[=]: Interacting with ${interaction.user.tag}`);
    const query = interaction.options.getString("query");
    if(query.length == 0) return await interaction.reply("Please enter a keyword.");
    await interaction.reply(`Searching for **${query}**...`);
    console.log(`[/]: Searching for ${query}...`);
    try {
      const request = await fetch("https://creytm-piped.vercel.app/stream:search/" + encodeURIComponent(query));
      const source = await request.json();
      await interaction.editReply(`Downloading **${source.title}** by **${source.artist}**...`);
      console.log(`[/]: Downloading ${source.title} by ${source.artist}...`);
      await interaction.editReply({
        files: [{
          attachment: source.url,
          name: source.title.toLowerCase().replaceAll(/[^a-z\s]/gi, "").replaceAll(" ", "-") + ".mp3"
        }],
        content: `Found **${source.title}** by **${source.artist}**`
      });
      console.log(`[/]: Found ${source.title} by ${source.artist}`);
    } catch(e) {
      await interaction.editReply(`Failed to search\n\n\`\`\`${e.stack}\`\`\``);
      console.error(`[/]: Failed to search\n${e.stack}`);
    }
  }
}

const LyricsCommand = {
  options: [
    {
      autocomplete: undefined,
      type: 3,
      choices: undefined,
      name: "query",
      name_localizations: undefined,
      description: "Keyword to search",
      description_localizations: undefined,
      required: true,
      max_length: undefined,
      min_length: 1
    }
  ],
  name: "lyrics",
  name_localizations: undefined,
  description: "Search for a lyrics",
  description_localizations: undefined,
  default_permission: undefined,
  default_member_permissions: undefined,
  dm_permission: undefined,
  nsfw: undefined,
  async execute(interaction) {
    console.log(`\n[=]: Interacting with ${interaction.user.tag}`);
    const query = interaction.options.getString("query");
    if(query.length == 0) return await interaction.reply("Please enter a keyword.");
    await interaction.reply(`Searching lyrics for **${query}**...`);
    console.log(`[/]: Searching lyrics for ${query}...`);
    try {
      const request = await fetch("https://lyrist.vercel.app/api/" + encodeURIComponent(query));
      const source = await request.json();
      if(source.lyrics == null) {
        return await interaction.editReply(`Lyrics for **${query}** are not available`);
        console.error(`[/]: Lyrics for ${query} are not available`);
      }
      await interaction.editReply(`${source.lyrics.replaceAll(/\[(.*?)\]/gm, "**$1**")}`);
    } catch(e) {
      await interaction.editReply(`Failed to search for lyrics\n\n\`\`\`${e.stack}\`\`\``);
      console.error(`[/]: Failed to search for lyrics\n${e.stack}`);
    }
  }
}

const commands = [SearchCommand, LyricsCommand];

async function main() {
  const TOKEN = process.env.TOKEN;
  const CLIENT_ID = process.env.CLIENT_ID;
  console.log("cloudbot v1.0.0 - creuserr");
  console.log("[1]: Starting...");
  const rest = new REST({ version: "10" }).setToken(TOKEN);
  try {
    console.log("[2]: Initiating commands...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("[=]: Commands initiated");
  } catch(error) {
    console.error(error);
  }
  const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildIntegrations
  ] });
  client.on("ready", () => {
    console.log(`[=]: Logged in as ${client.user.tag}`);
  });
  client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const cmd = commands.find(i => i.name == interaction.commandName);
    await cmd.execute(interaction);
  });
  console.log("[3]: Logging in...");
  client.login(TOKEN);
}

main();
