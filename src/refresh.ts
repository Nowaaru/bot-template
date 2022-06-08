import "dotenv/config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { getCommands } from "./util/functions";
import { Command } from "./util/types";

import {
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandNumberOption,
  SlashCommandStringOption,
} from "@discordjs/builders";

const Rest = new REST({ version: "9" }).setToken(process.env.TOKEN!);
const allCommands = getCommands();

const commandsArray: Array<Command["help"]> = [];
allCommands.forEach((x) => {
  const { name, description, args } = x.help;
  const newCommand = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description ?? "No description provided.");

  if (args) {
    args.forEach((y) => {
      const {
        name: argName = "Unnamed",
        description: argDescription = "No description provided.",
      } = y;

      switch (y.type.name) {
        case "String":
          newCommand.addStringOption(
            new SlashCommandStringOption()
              .setName(argName)
              .setDescription(argDescription)
              .setRequired(true)
          );
          break;
        case "Number":
          newCommand.addNumberOption(
            new SlashCommandNumberOption()
              .setName(argName)
              .setDescription(argDescription)
              .setRequired(true)
          );
        case "Boolean":
          newCommand.addBooleanOption(
            new SlashCommandBooleanOption()
              .setName(argName)
              .setDescription(argDescription)
              .setRequired(true)
          );
          break;
        default:
          return commandsArray.push(y as any);
      }
    });
  }

  commandsArray.push(newCommand.toJSON());
});

(async () => {
  console.log("Refreshing application commands.");

  await Rest.put(
    Routes.applicationGuildCommands("759698332653846570", "983120778214121542"),
    {
      body: commandsArray,
    }
  );
})()
  .then(() => console.log("Completed."))
  .catch(console.error);
