import { format } from "date-fns";

export default (ms: number, offset: number): string => {
  const msInMyTimeZone = ms + 3600000 * offset;

  console.log({ ms, msInMyTimeZone });

  return format(msInMyTimeZone, "HH:mm");
};
