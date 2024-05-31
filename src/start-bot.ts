import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { REST, Routes } from "discord.js";
import "dotenv/config";
import { buildApiCommands, commands } from "./commands/commands.js";

const TOKEN = process.env.TOKEN ?? "";
const CLIENT_ID = process.env.CLIENT_ID ?? "";

const rest = new REST({ version: "10" }).setToken(TOKEN);
export const mainChannelId = "1142177161294397552";
export const sheikId = "495942140124332033";

try {
  console.log("Started refreshing application (/) commands.");

  const apiCommands = buildApiCommands(commands);
  console.log("apiCommands", apiCommands);
  await rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: apiCommands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error({ error });
}
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  client.user ? console.log(`Logged in as ${client.user.tag}!`) : console.log("Logged in anonymously!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (commands[interaction.commandName]) {
    await commands[interaction.commandName].execute(interaction);
  }
});

client.login(TOKEN);
