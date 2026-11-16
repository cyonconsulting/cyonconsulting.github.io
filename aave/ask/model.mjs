// The proposal is fixed in SEK at the 13 November 2026 ECB reference fixing.
export const FX = Object.freeze({ date: '2026-11-13', EUR: 1, USD: 1.1052, SEK: 11.1075 });
export const HOURS_PER_DAY = 8;
export const REFERENCE_WEEKDAYS = 261;
export const BASE_DAYS = 221; // 261 weekdays - 5 weekday public holidays - 35 leave days, 2027.
export const SALARY_RANGES = Object.freeze([
  { id: 'snap', label: 'Snap', min: 276000, max: 414000,
    role: 'Principal Software Engineer, iOS',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Annual PTO count not stated.',
    context: '2025 · Zone A: CA, WA, NYC; lower bands in other zones.',
    source: 'https://www.builtinsf.com/job/principal-software-engineer-ios/4750752', sourceLabel: 'Preserved advert' },
  { id: 'reddit', label: 'Reddit', min: 232500, max: 325500,
    role: 'Principal Engineer, iOS Performance',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Flexible vacation; no day count.', context: '2026 · US remote.',
    source: 'https://remotestake.com/jobs/principal-engineer-ios-performance-9850301c46', sourceLabel: 'Preserved advert' },
  { id: 'metamask', label: 'Consensys / MetaMask', min: 227000, max: 272000,
    role: 'Principal Mobile Engineer, Platform',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Annual PTO count not stated.', context: '2026 · US-specific band; React Native and native mobile.',
    source: 'https://jobs.electriccapital.com/companies/consensys-2-33323f7e-0ce6-439f-89d6-30a145d8d69c/jobs/85611542-principal-mobile-engineer-platform-metamask', sourceLabel: 'Preserved advert' },
  { id: 'google', label: 'Google', min: 307000, max: 427000,
    role: 'Principal Engineer, iOS Search App',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Annual PTO count not stated in salary record.', context: 'June 2026 · CA / NYC. Dated newsletter record; original advert expired.',
    source: 'https://stanforiosdevelopers.substack.com/p/new-ios-hiring-activity-204', sourceLabel: 'Preserved salary record' },
  { id: 'servicetitan', label: 'ServiceTitan', min: 263800, max: 395600,
    role: 'Principal Software Engineer, Mobile',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Flexible time off; no day count.', context: '2026 · iOS and Android platform. US Zone 1; Zone 2: $246,500–$369,700.',
    source: 'https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/principal-software-engineer--mobile_jr115706', sourceLabel: 'Employer advert' },
]);
export const MEAN_UPPER_USD = SALARY_RANGES.reduce((sum, range) => sum + range.max, 0) / SALARY_RANGES.length;
export const BENCHMARK_USD = Math.round(MEAN_UPPER_USD / 1000) * 1000;
// Fallback assumptions apply only when an advert does not quantify a count.
export const DEFAULT_PAID_LEAVE = 20;
export const DEFAULT_PAID_HOLIDAYS = 0;
export function referenceDays(range, { paidLeaveDays = DEFAULT_PAID_LEAVE, paidHolidayDays = DEFAULT_PAID_HOLIDAYS } = {}) {
  const counts = [range.paidLeaveDays ?? paidLeaveDays, range.paidHolidayDays ?? paidHolidayDays];
  if (counts.some(n => n != null && (!Number.isInteger(n) || n < 0))) throw new RangeError('Paid days off must be nonnegative integers or null.');
  const days = REFERENCE_WEEKDAYS - (counts[0] ?? 0) - (counts[1] ?? 0);
  if (days <= 0) throw new RangeError('Reference days must remain positive.');
  return days;
}
export function normalizedHourlyRate(ranges, fallback = {}) {
  if (!ranges.length) throw new RangeError('At least one salary reference is required.');
  return ranges.reduce((sum, range) => sum + range.max / (HOURS_PER_DAY * referenceDays(range, fallback)), 0) / ranges.length;
}
export function comparisonTarget(fallback = {}) {
  const hourly = normalizedHourlyRate(SALARY_RANGES, fallback);
  const annual = Math.round(hourly * HOURS_PER_DAY * BASE_DAYS / 1000) * 1000;
  const askSek = Math.round(annual / FX.USD * FX.SEK / 1000) * 1000;
  return { hourly, annual, askSek };
}
export const { hourly: HOURLY_USD, annual: TARGET_USD, askSek: ASK_SEK } = comparisonTarget();
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
