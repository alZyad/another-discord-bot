import { CronJob } from "cron";
import { client, mainChannelId } from "./start-bot.js";
import { TextChannel } from "discord.js";

export const startReminderCron = (interaction: any, selectedUsers: Set<string>) => {
  const job = new CronJob(
    "0 0 18 * * *",
    async function () {
      console.log("Brush reminder sent");
      selectedUsers.forEach((userId) => {
        const user = client.users.cache.find((user) => user.id === userId);
        (client.channels.cache.get(mainChannelId) as TextChannel).send(`Hello ${user}, have you brushed your teeth ?`);
      });
    },
    null, // cleanup
    true, // auto start
    "utc" // timeZone
  );
  console.log("started cron job");
  //   job.start(); // is optional here because of the fourth parameter set to true.
};
