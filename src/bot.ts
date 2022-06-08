import fs from "fs";
import path from "path";
import Discord from "discord.js";
import "dotenv/config";

import { getCommands } from "./util/functions";

const Client = new Discord.Client({
  intents: [],
});

const allCommands = Client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;

  const foundCommand = getCommands().get(interaction.commandName);
  if (!foundCommand) return;

  foundCommand.run(Client, interaction);
});

Client.login(process.env.TOKEN);
