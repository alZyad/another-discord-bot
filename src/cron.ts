import { CronJob } from "cron";
import { client, mainChannelId, sheikId } from "./start-bot.js";
import { TextChannel } from "discord.js";

export const startReminderCron = (interaction: any) => {
  const job = new CronJob(
    "0 0 18 * * *",
    async function () {
      console.log("Brush reminder sent");
      const sheik = client.users.cache.find((user) => user.id === sheikId);
      (client.channels.cache.get(mainChannelId) as TextChannel).send(`Hello ${sheik}, have you brushed your teeth ?`);
    },
    null, // cleanup
    true, // auto start
    "utc" // timeZone
  );
  console.log("started cron job");
  //   job.start(); // is optional here because of the fourth parameter set to true.
};
