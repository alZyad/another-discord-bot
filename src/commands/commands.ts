import { TextChannel } from "discord.js";
import { client, mainChannelId } from "../start-bot.js";
import { brushReminder } from "./brushReminder.js";

export interface apiCommand {
  name: string;
  description: string;
}

export interface botCommands {
  api: apiCommand;
  execute: (interaction: any) => void;
}

type commandList = { [key: string]: botCommands };
export const commands: commandList = {
  ping: {
    api: { name: "ping", description: "Replies with Pong!" },
    execute: async (interaction) => {
      await interaction.reply("Pong!");
    },
  },
  test: {
    api: { name: "test", description: "Sends test message back after 2 seconds" },
    execute: async (interaction) => {
      await interaction.reply("Test message to be sent in 2 seconds");
      setTimeout(() => (client.channels.cache.get(mainChannelId) as TextChannel).send("test message"), 2000);
    },
  },
  "sou-ulti": {
    api: { name: "sou-ulti", description: "Does sou have her ulti ?" },
    execute: async (interaction) => {
      await interaction.reply("Sou doesn't have her ulti.");
    },
  },
  "brush-reminder": {
    api: { name: "brush-reminder", description: "start reminder to brush your teeth." },
    execute: brushReminder,
  },
};

// TODO make buildCommands function, make sure name is the correct name

export const buildApiCommands = (commandList: commandList): apiCommand[] => Object.values(commandList).map((command: botCommands) => command.api);
