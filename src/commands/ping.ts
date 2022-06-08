import Discord, { CommandInteraction, Interaction } from "discord.js";

exports.run = (client: Discord.Client, interaction: CommandInteraction) => {
  const interactionSentAt = interaction.createdTimestamp;
  const messageEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Pong!")
    .setDescription(
      `◽Ping: ${Math.abs(
        Date.now() - interaction.createdTimestamp
      )}ms\n◽API Response Time: ${client.ws.ping}ms`
    );

  interaction.reply({
    embeds: [messageEmbed],
  });
};

exports.help = {
  name: "ping",
  description: "Pong!",
  args: [],
};
