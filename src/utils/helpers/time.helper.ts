import moment from 'moment';

import 'moment/locale/vi';
import 'moment/locale/en-au';
export function isWeekend(date = new Date()) {
  return date.getDay() === 0;
  //   return date.getDay() === 6 || date.getDay() === 0; // Saturday & Sunday
}
export function getNextDays(currentDate = new Date(), daysToAdd = 1) {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
}
export function getListDateAvailable({
  currentDate = new Date(),
  lengthDate = 7,
}) {
  const result = [];
  if (isWeekend(currentDate)) {
    currentDate = getNextDays(currentDate);
  }
  for (let i = 0; i < 7; i++) {
    const date = getNextDays(currentDate, i);
    if (!isWeekend(date)) {
      result.push(date);
    }
  }
  return result.slice(0, lengthDate);
}

const START_HOURS = 7;
const END_HOURS = 22;
export function getListTimeByCurrentDate(date: Date): string[] {
  const result: string[] = [];
  const currentDate = new Date();
  for (let i = START_HOURS; i < END_HOURS; i++) {
    result.push(`${i}:00 - ${i + 1}:00`);
  }
  const currentHours = currentDate.getHours();
  if (date.getDate() === currentDate.getDate()) {
    return result.slice(currentHours - START_HOURS + 2);
  }
  return result;
}

export function getDifferentDay(currentDate: Date, newDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((newDate.getTime() - currentDate.getTime()) / oneDay);
}

export function formatDateTimeMessage(date: Date, language: string) {
  const timeCreated = moment(new Date(date)).locale(
    language === 'vi' ? 'vi' : 'en-au',
  );

  // ** Format time to render === eg?: 20:30
  const formatTime = timeCreated.format('HH:mm');
  return timeCreated.calendar(null, {
    sameDay: `[${
      language === 'vi' ? 'Hôm nay lúc' : 'Today at'
    }] ${formatTime}`,
    nextDay: `[${
      language === 'vi' ? 'Ngày mai lúc' : 'Tomorrow at'
    }] ${formatTime}`,
    nextWeek: `dddd [${language === 'vi' ? 'lúc' : 'at'}] HH:mm`,
    lastDay: `[${
      language === 'vi' ? 'Hôm qua lúc' : 'Yesterday at'
    }] ${formatTime}`,
    lastWeek: `ddd, DD MMM [${language === 'vi' ? 'lúc' : 'at'}] HH:mm`,
    sameElse: `ddd, ll [${language === 'vi' ? 'lúc' : 'at'}] HH:mm`,
  });
}

export function formatTimeLastMessage(date: Date, language: string) {
  const timeCreated = moment(new Date(date)).locale(
    language === 'vi' ? 'vi' : 'en-au',
  );

  // ** Format time to render === eg?: 20:30
  const formatTime = timeCreated.format('HH:mm');
  return timeCreated.calendar(null, {
    sameDay: formatTime,
    nextDay: `ddd ${formatTime}`,
    nextWeek: 'ddd, ll HH:mm',
    lastDay: formatTime,
    lastWeek: 'ddd HH:mm',
    sameElse: 'ddd, ll',
  });
}

export function isExpired(date: Date, currentDate = new Date()) {
  return currentDate > date;
}
export function isAlmostExpired(
  date: Date,
  offsetDay = 3,
  currentDate = new Date(),
) {
  currentDate.setDate(currentDate.getDate() + offsetDay);
  return isExpired(date, currentDate);
}
