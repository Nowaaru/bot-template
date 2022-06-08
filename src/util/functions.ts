import fs from "fs";
import path from "path";
import { Command } from "./types";

const basePath = path.resolve(__dirname, "../", "commands");
export const getCommands = (): Map<string, Command> => {
  const allCommands = new Map<string, any>();
  fs.readdirSync(basePath).forEach((file) => {
    const commandPath = path.join(basePath, file);
    const command = require(commandPath);
    allCommands.set(
      command.help.name,
      Object.assign(command, {
        path: commandPath,
      })
    );
  });

  return allCommands;
};
