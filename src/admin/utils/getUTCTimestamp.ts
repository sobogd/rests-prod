export const getUTCTimestamp = (dateString?: string): number => {
  const date = dateString ? new Date(dateString + " 00:00") : new Date();
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  ).getTime();
};

export const getTimeFromUTCTimeStamp = (utcTimeStamp: number, offset: number): any => {
  const newDate = new Date(Number(utcTimeStamp)).toLocaleTimeString();
  return newDate;
};
