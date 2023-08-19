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
  "sou-ulti": {
    api: { name: "sou-ulti", description: "Does sou have her ulti ?" },
    execute: async (interaction) => {
      await interaction.reply("Sou doesn't have her ulti");
    },
  },
};

// TODO make buildCommands function, make sure name is the correct name

export const buildApiCommands = (commandList: commandList): apiCommand[] =>
  Object.values(commandList).map((command: botCommands) => command.api);
