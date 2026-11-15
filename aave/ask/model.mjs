// The proposal is fixed in SEK at the 13 November 2026 ECB reference fixing.
export const FX = Object.freeze({ date: '2026-11-13', EUR: 1, USD: 1.1052, SEK: 11.1075 });
export const BASE_DAYS = 221; // 261 weekdays - 5 weekday public holidays - 35 leave days, 2027.
export const ASK_SEK = Math.round(325000 / FX.USD * FX.SEK / 1000) * 1000;
export const HOURS_PER_DAY = 8;
export const HOLIDAYS = [
  ['2027-01-01', "New Year’s Day"], ['2027-01-06', 'Epiphany'],
  ['2027-03-26', 'Good Friday'], ['2027-03-29', 'Easter Monday'],
  ['2027-05-01', 'May Day'], ['2027-05-06', 'Ascension Day'],
  ['2027-06-06', 'National Day'], ['2027-06-26', 'Midsummer Day'],
  ['2027-11-06', 'All Saints’ Day'], ['2027-12-25', 'Christmas Day'],
  ['2027-12-26', 'Boxing Day']
];
export const EVES = [['2027-06-25', 'Midsummer Eve'], ['2027-12-24', 'Christmas Eve'], ['2027-12-31', 'New Year’s Eve']];
export const isWeekday = date => ![0, 6].includes(new Date(date + 'T12:00:00Z').getUTCDay());
export function calculate({ ask = ASK_SEK, weeks = 7, mode = 'unpaid', eves = false } = {}) {
  const weekdays = 261;
  const holidays = [...HOLIDAYS, ...(eves ? EVES : [])].filter(([date]) => isWeekday(date)).length;
  const leave = weeks * 5;
  const worked = weekdays - holidays - leave;
  const billed = mode === 'unpaid' ? worked : weekdays;
  const daily = ask / BASE_DAYS;
  return { weekdays, holidays, leave, worked, billed, daily,
    hourly: daily / HOURS_PER_DAY, annual: daily * billed, noAbsence: daily * weekdays, unpaidDays: weekdays - billed };
}
export const convert = (sek, currency) => sek / FX.SEK * FX[currency];
