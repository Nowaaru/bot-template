import Discord, { CommandInteraction, Interaction } from "discord.js";
import { getCommands } from "../util/functions";

exports.run = async (
  client: Discord.Client,
  interaction: CommandInteraction
) => {
  const allCommands = getCommands();
  if (!allCommands.has(interaction.commandName)) {
    return interaction.reply("It seems that command does not exist.");
  }

  const command = allCommands.get(
    String(interaction.options.getString("command"))
  );
  const commandPath = command?.path;

  if (commandPath) {
    const resolvedRequire = require.resolve(commandPath);
    if (resolvedRequire) {
      await delete require.cache[resolvedRequire];
      return interaction.reply("Command successfully reloaded.");
    }
  } else return interaction.reply("That command doesn't have a path.");
};

exports.help = {
  name: "reload",
  description: "Reloads a command.",
  args: [
    {
      name: "command",
      description: "The name of the command to reload.",
      type: String,
    },
  ],
};
