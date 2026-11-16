// The proposal is fixed in SEK at the 13 November 2026 ECB reference fixing.
export const FX = Object.freeze({ date: '2026-11-13', EUR: 1, USD: 1.1052, SEK: 11.1075 });
export const HOURS_PER_DAY = 8;
export const REFERENCE_WEEKDAYS = 261;
export const BASE_DAYS = 221; // 261 weekdays - 5 weekday public holidays - 35 leave days, 2027.
export const SALARY_RANGES = Object.freeze([
  { id: 'snap', label: 'Snap', min: 276000, max: 414000,
    role: 'Principal Software Engineer, iOS',
    paidLeaveDays: null, paidHolidayDays: 12, ptoNote: 'US profile: flexible vacation (exempt); 12 paid holidays.',
    ptoSource: 'https://www.builtinnyc.com/company/snap-inc/benefits', ptoSourceLabel: 'US company benefits profile',
    context: '2025 · Zone A: CA, WA, NYC; lower bands in other zones.',
    source: 'https://www.builtinsf.com/job/principal-software-engineer-ios/4750752', sourceLabel: 'Preserved advert' },
  { id: 'reddit', label: 'Reddit', min: 232500, max: 325500,
    role: 'Principal Engineer, iOS Performance',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'US: flexible vacation and global days off; no counts. Ireland’s historical 25 days excluded.',
    ptoSource: 'https://redditinc.com/careers', ptoSourceLabel: 'Company careers', context: '2026 · US remote.',
    source: 'https://remotestake.com/jobs/principal-engineer-ios-performance-9850301c46', sourceLabel: 'Preserved advert' },
  { id: 'metamask', label: 'Consensys / MetaMask', min: 227000, max: 272000,
    role: 'Principal Mobile Engineer, Platform',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Company profile: unlimited vacation/holidays; recharge days not quantified annually.',
    ptoSource: 'https://wellfound.com/company/consensys/culture_and_benefits', ptoSourceLabel: 'Company benefits profile', context: '2026 · US-specific band; React Native and native mobile.',
    source: 'https://jobs.electriccapital.com/companies/consensys-2-33323f7e-0ce6-439f-89d6-30a145d8d69c/jobs/85611542-principal-mobile-engineer-platform-metamask', sourceLabel: 'Preserved advert' },
  { id: 'google', label: 'Google', min: 307000, max: 427000,
    role: 'Principal Engineer, iOS Search App',
    paidLeaveDays: 20, paidHolidayDays: 13, ptoNote: 'Other US engineering ad: 20 vacation days (first five years) + 13 paid holidays. Company-policy proxy.',
    ptoSource: 'https://www.google.com/about/careers/applications/jobs/results/113654329000239814-staff-software-engineer-infrastructure-google-cloud-runtimes', ptoSourceLabel: 'Employer US benefits disclosure', context: 'June 2026 · CA / NYC. Dated newsletter record; original advert expired.',
    source: 'https://stanforiosdevelopers.substack.com/p/new-ios-hiring-activity-204', sourceLabel: 'Preserved salary record' },
  { id: 'servicetitan', label: 'ServiceTitan', min: 263800, max: 395600,
    role: 'Principal Software Engineer, Mobile',
    paidLeaveDays: null, paidHolidayDays: null, ptoNote: 'Employer ads: flexible time off; no recurring annual counts.',
    ptoSource: 'https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/senior-analyst--business-operations---strategy_jr116409', ptoSourceLabel: 'Other employer advert', context: '2026 · iOS and Android platform. US Zone 1; Zone 2: $246,500–$369,700.',
    source: 'https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/principal-software-engineer--mobile_jr115706', sourceLabel: 'Employer advert' },
  {"id": "slate", "label": "Slate Auto", "min": 202610, "max": 337684, "role": "Principal Engineer, Mobile", "paidLeaveDays": null, "paidHolidayDays": null, "ptoNote": "Vacation offered; annual counts not stated.", "context": "September 2026 · Remote WA. React Native/C++, vehicle communications and mobile security.", "source": "https://recar.wd108.myworkdayjobs.com/en-US/SLATEcareers/job/Remote-WA/Principal-Engineer--Mobile_JR101381-1", "sourceLabel": "Employer advert", "ptoSource": "https://recar.wd108.myworkdayjobs.com/en-US/SLATEcareers/job/Remote-WA/Principal-Engineer--Mobile_JR101381-1", "ptoSourceLabel": "Advert benefits"},
  {"id": "minimed", "label": "MiniMed", "min": 153000, "max": 261000, "role": "Principal Mobile Engineer", "paidLeaveDays": null, "paidHolidayDays": null, "ptoNote": "PTO and holidays offered; annual counts not stated.", "context": "November 2026 · Northridge, CA band. iOS/Android medical devices; other US band $138,000–$234,000.", "source": "https://mdtkangaroo.wd108.myworkdayjobs.com/en-US/MiniMedCareers/job/Principal-Mobile-Engineer_R-801938-1", "sourceLabel": "Employer advert", "ptoSource": "https://mdtkangaroo.wd108.myworkdayjobs.com/en-US/MiniMedCareers/job/Principal-Mobile-Engineer_R-801938-1", "ptoSourceLabel": "Advert benefits"},
  {"id": "zillow", "label": "Zillow", "min": 186700, "max": 298300, "role": "Principal Software Development Engineer, iOS Mobile", "paidLeaveDays": null, "paidHolidayDays": null, "ptoNote": "US benefits do not quantify annual counts. Six-year sabbatical and India allowances excluded.", "context": "December 2024–January 2025 · Closed US-remote advert; listed states including CA/NY/WA. Native Swift/Objective-C.", "source": "https://portfoliojobs.tcv.com/companies/zillow/jobs/43993671-principal-software-development-engineer-ios-mobile", "sourceLabel": "Preserved investor-hosted advert", "ptoSource": "https://www.zillow.com/careers/benefits/", "ptoSourceLabel": "Employer benefits"},
]);
export const MEAN_UPPER_USD = SALARY_RANGES.reduce((sum, range) => sum + range.max, 0) / SALARY_RANGES.length;
export const BENCHMARK_USD = Math.round(MEAN_UPPER_USD / 1000) * 1000;
// Company-specific US evidence overrides sample-mean estimates; fallbacks are last resort.
export const DEFAULT_PAID_LEAVE = 20;
export const DEFAULT_PAID_HOLIDAYS = 0;
export function referenceDays(range, { paidLeaveDays = DEFAULT_PAID_LEAVE, paidHolidayDays = DEFAULT_PAID_HOLIDAYS } = {}) {
  const counts = [range.paidLeaveDays ?? paidLeaveDays, range.paidHolidayDays ?? paidHolidayDays];
  if (counts.some(n => !Number.isFinite(n) || n < 0)) throw new RangeError('Paid days off must be finite and nonnegative.');
  const days = REFERENCE_WEEKDAYS - (counts[0] ?? 0) - (counts[1] ?? 0);
  if (days <= 0) throw new RangeError('Reference days must remain positive.');
  return days;
}
export function allowanceDefaults(ranges, fallback = {}) {
  const result = {};
  for (const [field, defaultValue] of [['paidLeaveDays', DEFAULT_PAID_LEAVE], ['paidHolidayDays', DEFAULT_PAID_HOLIDAYS]]) {
    const stated = ranges.map(range => range[field]).filter(value => value != null);
    if (stated.some(value => !Number.isFinite(value) || value < 0)) throw new RangeError('Stated paid days off must be finite and nonnegative.');
    result[field] = stated.length ? stated.reduce((sum, value) => sum + value, 0) / stated.length : (fallback[field] ?? defaultValue);
    result[`${field}Count`] = stated.length;
  }
  return result;
}
export function perAdHourlyRates(ranges, fallback = {}) {
  if (!ranges.length) throw new RangeError('At least one salary reference is required.');
  const defaults = allowanceDefaults(ranges, fallback);
  return ranges.map(range => ({
    ...range,
    referenceDays: referenceDays(range, defaults),
    hourly: range.max / (HOURS_PER_DAY * referenceDays(range, defaults)),
    leaveBasis: range.paidLeaveDays != null ? (range.ptoSource ? 'company evidence' : 'stated') : defaults.paidLeaveDaysCount ? 'sample mean (estimated)' : 'fallback',
    holidayBasis: range.paidHolidayDays != null ? (range.ptoSource ? 'company evidence' : 'stated') : defaults.paidHolidayDaysCount ? 'sample mean (estimated)' : 'fallback',
  }));
}
export function normalizedHourlyRate(ranges, fallback = {}) {
  const rates = perAdHourlyRates(ranges, fallback);
  return rates.reduce((sum, range) => sum + range.hourly, 0) / rates.length;
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
