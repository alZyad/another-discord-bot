import { startReminderCron } from "../cron.js";
import { client } from "../start-bot.js";
import { saveSelectedUsers, loadSelectedUsers } from "../storage.js";

let selectedUsers = loadSelectedUsers();

export const selectUsers = async (interaction: any) => {
  const userId = interaction.user.id;
  if (selectedUsers.has(userId)) {
    selectedUsers.delete(userId);
    await interaction.reply("You have been removed from the brush reminder list.");
  } else {
    selectedUsers.add(userId);
    await interaction.reply("You have been added to the brush reminder list.");
  }
  saveSelectedUsers(selectedUsers);
};

export const brushReminder = async (interaction: any) => {
  let reminderOn = false; // get reminderOn value
  reminderOn = !reminderOn;
  // save new value of reminderOn
  if (reminderOn) {
    startReminderCron(interaction, selectedUsers);
  }
  await interaction.reply(reminderOn ? "The reminder is turned on." : "The reminder is turned off.");
};
