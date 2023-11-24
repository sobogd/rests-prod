import { format } from "date-fns";

export default (ms: number, offset: number): string => {
  const msInMyTimeZone = ms + 3600000 * offset;

  return format(msInMyTimeZone, "HH:mm");
};
