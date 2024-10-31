import fs from 'fs';
import path from 'path';

const filePath = path.resolve('selectedUsers.json');

export const saveSelectedUsers = (selectedUsers: Set<string>) => {
  const usersArray = Array.from(selectedUsers);
  fs.writeFileSync(filePath, JSON.stringify(usersArray, null, 2));
};

export const loadSelectedUsers = (): Set<string> => {
  if (!fs.existsSync(filePath)) {
    return new Set();
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  const usersArray = JSON.parse(data);
  return new Set(usersArray);
};
