import { Client, CommandInteraction, Interaction } from "discord.js";

export type Command = {
  run: (client: Client, interaction: CommandInteraction) => Promise<void>;
  help: {
    name: string;
    description?: string;
    args?: Array<{
      name?: string;
      description?: string;
      readonly type:
        | StringConstructor
        | NumberConstructor
        | BooleanConstructor
        | ObjectConstructor;
    }>;
  };
  path: string;
};
