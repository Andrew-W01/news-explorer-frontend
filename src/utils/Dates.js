export function getTodaysDate() {
  let todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  const currentMonth = todaysDate.getMonth() + 1;
  const currentDay = todaysDate.getDate();
  todaysDate = `${currentYear}-${currentMonth}-${currentDay}`;

  return todaysDate;
}

export function getLastWeeksDate() {
  const todaysDate = new Date();
  let lastWeeksDate = new Date(todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastWeekYear = lastWeeksDate.getFullYear();
  const lastWeekMonth = lastWeeksDate.getMonth() + 1;
  const lastWeekDay = lastWeeksDate.getDate();
  lastWeeksDate = `${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`;

  return lastWeeksDate;
}
