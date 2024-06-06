import { differenceInMinutes, differenceInHours } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const dateFromMs = (ms?: number): Date => {
  return !ms ? new Date() : new Date(Number(ms));
};

export const timeZone = (): string => {
  return localStorage.getItem('restsTimezone') ?? 'Europe/Moscow';
};

export const dateMs = () => {
  return Date.now();
};

export const dateHHmm = (ms?: number): string => {
  const date = dateFromMs(ms);
  const tz = timeZone();

  return formatInTimeZone(date, tz, 'HH:mm');
};

export const dateDiffNowHHmm = (ms?: number) => {
  const ms1 = Number(ms ?? 0);
  const ms2 = Date.now();
  const diffHH = differenceInHours(ms2, ms1);
  const lastMins = diffHH * 60 * 60 * 1000;
  const diffMM = differenceInMinutes(ms2 - lastMins, ms1);
  const MM = diffMM?.toString()?.length > 1 ? diffMM : `0${diffMM}`;

  return `${diffHH}:${MM}`;
};

export const dateDurationHHmm = (input?: number) => {
  const ms = Number(input ?? 0);
  const HH = Number(
    Number(ms / 1000 / 60 / 60)
      ?.toString()
      ?.split('.')?.[0] ?? 0,
  );
  const HHInMs = HH * 60 * 60 * 1000;
  const diffMM = Number((ms - HHInMs) / 1000 / 60).toFixed(0);
  const MM = diffMM?.toString()?.length > 1 ? diffMM : `0${diffMM}`;

  return `${HH}:${MM}`;
};
