import { DateTime } from "luxon";

export const getDateFromClientZone = (date: Date, utcDiff: number) => {
  if (utcDiff < 0) {
    return DateTime.fromJSDate(date)
      .toUTC()
      .plus({ hour: utcDiff * -1 });
  } else if (utcDiff > 0) {
    return DateTime.fromJSDate(date).toUTC().minus({ hour: utcDiff });
  } else {
    return DateTime.fromJSDate(date).toUTC();
  }
};
