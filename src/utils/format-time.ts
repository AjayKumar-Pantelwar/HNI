import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // for pDate
import relativeTime from 'dayjs/plugin/relativeTime'; // for fToNow

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'DD-MM-YYYY'; // Adjust format to Day.js syntax
  return date ? dayjs(date).format(fm) : '';
}

export function pDate(date: string, newFormat?: string) {
  const fm = newFormat || 'DD-MM-YYYY'; // Adjust format to Day.js syntax
  return date ? dayjs(date, fm).toDate() : null;
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'DD MMM YYYY A'; // Adjust format to Day.js syntax
  return date ? dayjs(date).format(fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? dayjs(date).valueOf() : '';
}

export function fToNow(date: InputValue) {
  return date ? dayjs(date).fromNow() : '';
}
