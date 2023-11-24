import { format, intervalToDuration } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const getTimeInFormat = (inputDate: any) => {
  const date1 = new Date(inputDate);
  const timeZone = localStorage.getItem("restsTimezone") ?? "Europe/Moscow";
  const zonedDate = utcToZonedTime(date1, timeZone);
  return format(zonedDate, "HH:mm");
};

export const getDateTimeInFormat = (inputDate: any) => {
  const date1 = inputDate ? new Date(inputDate) : new Date();
  const timeZone = localStorage.getItem("restsTimezone") ?? "Europe/Moscow";
  const zonedDate = utcToZonedTime(date1, timeZone);
  return format(zonedDate, "dd.MM.yyyy HH:mm");
};

export const getDateInFormat = (inputDate: any) => {
  const date1 = new Date(inputDate);
  const timeZone = localStorage.getItem("restsTimezone") ?? "Europe/Moscow";
  const zonedDate = utcToZonedTime(date1, timeZone);
  return format(zonedDate, "dd.MM.yyyy");
};

export const getTimeInSeconds = (inputDate: any) => {
  return Math.round(new Date(inputDate).getTime() / 1000);
};

export const getDateDifference = (
  firstDate?: string,
  secondDate?: string
): Duration => {
  return intervalToDuration({
    start: firstDate ? new Date(firstDate) : new Date(),
    end: secondDate ? new Date(secondDate) : new Date(),
  });
};
