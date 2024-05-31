import { startReminderCron } from "../cron.js";

export const brushReminder = async (interaction: any) => {
  let reminderOn = false; // get reminderOn value
  reminderOn = !reminderOn;
  // save new value of reminderOn
  if (reminderOn) {
    startReminderCron(interaction);
  }
  await interaction.reply(reminderOn ? "The reminder is turned on." : "The reminder is turned off.");
};
