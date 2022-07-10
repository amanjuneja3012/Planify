import dayjs from 'dayjs';

export default {
  MILLISECONDS: {
    fromMillis(value: number) {
      return value;
    },
    fromSeconds(value: number) {
      return value * 1000;
    },
    fromMinutes(value: number) {
      return value * (60 * 1000);
    },
    fromHours(value: number) {
      return value * (60 * 60 * 1000);
    },
    fromDays(value: number) {
      return value * (60 * 60 * 24 * 1000);
    },
  },
  SECONDS: {
    fromMillis(value: number) {
      return Math.floor(value / 1000);
    },
    fromSeconds(value: number) {
      return value;
    },
    fromMinutes(value: number) {
      return value * 60;
    },
    fromHours(value: number) {
      return value * (60 * 60);
    },
    fromDays(value: number) {
      return value * (60 * 60 * 24);
    },
  },
  MINUTES: {
    fromMillis(value: number) {
      return Math.floor(value / (1000 * 60));
    },
    fromSeconds(value: number) {
      return Math.floor(value / 60);
    },
    fromMinutes(value: number) {
      return value;
    },
    fromHours(value: number) {
      return value * 60;
    },
    fromDays(value: number) {
      return value * (60 * 24);
    },
  },
  HOURS: {
    fromMillis(value: number) {
      return Math.floor(value / (60 * 60 * 1000));
    },
    fromSeconds(value: number) {
      return Math.floor(value / (60 * 60));
    },
    fromMinutes(value: number) {
      return Math.floor(value / 60);
    },
    fromHours(value: number) {
      return value;
    },
    fromDays(value: number) {
      return value * 24;
    },
  },
  DAYS: {
    fromMillis(value: number) {
      return Math.floor(value / (60 * 60 * 1000 * 24));
    },
    fromSeconds(value: number) {
      return Math.floor(value / (60 * 60 * 24));
    },
    fromMinutes(value: number) {
      return Math.floor(value / (60 * 24));
    },
    fromHours(value: number) {
      return Math.floor(value / 24);
    },
    fromDays(value: number) {
      return value;
    },
  },
  clockTime() {
    return new Date().getTime();
  },
  dayjs,
};

const TimestampDescriptorLong = {
  lastDay: '[Yesterday,] LT',
  sameDay: 'LT',
  nextDay: '[Tomorrow,] LT',
  lastWeek: 'dddd',
  nextWeek: 'dddd',
  sameElse: 'MMMM Do',
};

const TimestampDescriptorShort = {
  lastDay: '[Yesterday]',
  sameDay: 'LT',
  nextDay: '[Tomorrow]',
  lastWeek: 'dddd',
  nextWeek: '[Next week]',
  sameElse: 'MMM Do',
};
