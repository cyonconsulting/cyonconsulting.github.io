import test from 'node:test';
import assert from 'node:assert/strict';
import { SALARY_RANGES, MEAN_UPPER_USD, BENCHMARK_USD, TARGET_USD, HOURLY_USD, REFERENCE_WEEKDAYS, comparisonTarget, allowanceDefaults, perAdHourlyRates, referenceDays, normalizedHourlyRate, ASK_SEK, HOURS_PER_DAY, HOLIDAYS, isWeekday, calculate, convert } from './model.mjs';
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
test('2027 calendar independently gives 261 weekdays and five weekday public holidays', () => {
 let count = 0;
 for (let d = new Date('2027-01-01T12:00:00Z'); d.getUTCFullYear() === 2027; d.setUTCDate(d.getUTCDate() + 1)) {
  if (![0, 6].includes(d.getUTCDay())) count++;
 }
 assert.equal(count, 261);
 assert.deepEqual(HOLIDAYS.filter(([date]) => isWeekday(date)).map(([date]) => date), ['2027-01-01','2027-01-06','2027-03-26','2027-03-29','2027-05-06']);
});
test('rounded SEK anchor approximates $336k annual invoices after 35 days leave and five holidays', () => {
 const r = calculate(); assert.equal(r.worked, 221); assert.equal(r.billed, 221);
 assert.ok(Math.abs(convert(r.annual, 'USD') - TARGET_USD) < 50);
 assert.ok(Number.isInteger(ASK_SEK)); close(r.annual, ASK_SEK);
 close(r.noAbsence - r.annual, 40 * r.daily);
});
test('paid time off bills the whole year without changing worked days or the day rate', () => {
 const paid = calculate({ mode:'paid' }), unpaid = calculate();
 assert.equal(paid.worked, 221); assert.equal(paid.billed, 261);
 close(paid.daily, unpaid.daily); close(paid.annual - unpaid.annual, 40 * paid.daily);
});
test('leave scenarios change invoices without changing the agreed day rate', () => {
 const a = calculate({ weeks: 5 }), b = calculate({ weeks: 8 }), baseline = calculate();
 assert.equal(a.worked, 231); assert.equal(b.worked, 216);
 close(a.annual - b.annual, 15 * baseline.daily); close(a.daily, b.daily);
});
test('holiday eves deduct exactly three additional weekdays once', () => {
 const a = calculate({eves:true}); assert.equal(a.worked,218); assert.equal(a.holidays,8);
 close(calculate().annual - a.annual, 3*a.daily);
});
test('FX conversions preserve the whole-SEK anchor and hourly rate uses eight hours', () => {
 close(convert(ASK_SEK,'SEK'),ASK_SEK);
 assert.ok(Math.abs(convert(ASK_SEK,'EUR')*1.1052 - TARGET_USD) < 50);
 assert.equal(HOURS_PER_DAY,8);
 const r = calculate(); close(r.hourly*8,r.daily);
});
test('a SEK 1000 ask increment adjusts annual cost by exactly SEK 1000', () => {
 const a = calculate(), b = calculate({ask:ASK_SEK+1000});
 close(b.annual-a.annual,1000);
});

test('benchmark is the mean of all five upper salary bands, then rounded', () => {
 assert.equal(SALARY_RANGES.length,5);
 assert.equal(MEAN_UPPER_USD,366820);
 assert.equal(BENCHMARK_USD,367000);
});

test('salary data has five distinct Principal iOS/mobile roles with explicit sources', () => {
 assert.equal(new Set(SALARY_RANGES.map(r => r.id)).size,5);
 assert.deepEqual(SALARY_RANGES.map(r => r.id),['snap','reddit','metamask','google','servicetitan']);
 for (const range of SALARY_RANGES) {
  assert.match(range.role,/Principal/); assert.match(range.role,/iOS|Mobile/);
  assert.ok(range.max >= 270000); assert.ok(range.min < range.max);
  assert.equal(new URL(range.source).protocol,'https:');
 }
});

test('default unknown PTO assumes 20 paid leave days, giving 241 reference days', () => {
 for (const range of SALARY_RANGES) {
  assert.equal(range.paidLeaveDays,null); assert.equal(range.paidHolidayDays,null);
  assert.equal(referenceDays(range),241);
 }
 assert.equal(REFERENCE_WEEKDAYS,261);
 close(HOURLY_USD,366820/(8*241));
 close(HOURLY_USD*8*221,366820*221/241);
 assert.equal(TARGET_USD,336000); assert.ok(TARGET_USD < BENCHMARK_USD);
});
test('each upper salary becomes an hourly rate before calculating the unweighted mean', () => {
 const refs=[{max:240000,paidLeaveDays:20,paidHolidayDays:10}, {max:360000,paidLeaveDays:30,paidHolidayDays:10}, {max:300000,paidLeaveDays:null,paidHolidayDays:null}];
 const rates=perAdHourlyRates(refs);
 assert.deepEqual(rates.map(r=>r.referenceDays),[231,221,226]);
 assert.equal(rates[2].leaveBasis,'ad average'); assert.equal(rates[2].holidayBasis,'ad average');
 close(rates[2].hourly,300000/(8*226));
 close(normalizedHourlyRate(refs),(240000/(8*231)+360000/(8*221)+300000/(8*226))/3);
 assert.notEqual(normalizedHourlyRate(refs),300000/(8*226));
});
test('stated counts override fallbacks; unknown counts remain adjustable', () => {
 assert.equal(referenceDays({paidLeaveDays:25,paidHolidayDays:10},{paidLeaveDays:20,paidHolidayDays:0}),226);
 assert.equal(referenceDays({paidLeaveDays:25,paidHolidayDays:null},{paidLeaveDays:20,paidHolidayDays:10}),226);
 assert.equal(referenceDays({paidLeaveDays:0,paidHolidayDays:0}),261);
 assert.equal(referenceDays({paidLeaveDays:null,paidHolidayDays:null},{paidLeaveDays:0,paidHolidayDays:0}),261);
 assert.equal(comparisonTarget({paidLeaveDays:20,paidHolidayDays:10}).annual,351000);
 assert.equal(comparisonTarget({paidLeaveDays:0,paidHolidayDays:0}).annual,311000);
 assert.throws(()=>referenceDays({paidLeaveDays:262,paidHolidayDays:0}),RangeError);
 assert.throws(()=>referenceDays({paidLeaveDays:-1,paidHolidayDays:null}),RangeError);
 assert.throws(()=>normalizedHourlyRate([]),RangeError);
});

test('imputation uses only reported counts, including zero, never other imputations', () => {
 const refs=[{max:1,paidLeaveDays:0,paidHolidayDays:null}, {max:1,paidLeaveDays:21,paidHolidayDays:null}, {max:1,paidLeaveDays:null,paidHolidayDays:null}];
 const defaults=allowanceDefaults(refs,{paidLeaveDays:99,paidHolidayDays:10});
 assert.equal(defaults.paidLeaveDays,10.5); assert.equal(defaults.paidLeaveDaysCount,2);
 assert.equal(defaults.paidHolidayDays,10); assert.equal(defaults.paidHolidayDaysCount,0);
 assert.equal(perAdHourlyRates(refs,{paidHolidayDays:10})[2].referenceDays,240.5);
 assert.equal(perAdHourlyRates(refs,{paidHolidayDays:10})[2].holidayBasis,'fallback');
});
