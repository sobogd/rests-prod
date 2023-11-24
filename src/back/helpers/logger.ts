import { DateTime } from "luxon";

const i = ({ t, m, p }: { t: string; m: string; p?: object }) => {
  const date = DateTime.now().toUTC().toFormat("dd.MM.yyyy HH:mm");
  const defaultMessage = `${date}--${t}--${m}`;
  if (p) {
    console.log(defaultMessage + `--${JSON.stringify(p)}`);
  } else {
    console.log(defaultMessage);
  }
};

const e = ({ t, m, p }: { t: string; m: string; p?: object }): string => {
  const date = DateTime.now().toUTC().toFormat("dd.MM.yyyy HH:mm");
  const defaultMessage = `${date}--${t}--${m}`;
  if (p) {
    return defaultMessage + `--${JSON.stringify(p)}`;
  } else {
    return defaultMessage;
  }
};

export const l = {
  i,
  e,
};
