import test from 'node:test';
import assert from 'node:assert/strict';
import { ASK_SEK, HOURS_PER_DAY, HOLIDAYS, isWeekday, calculate, convert } from './model.mjs';
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
test('2027 calendar independently gives 261 weekdays and five weekday public holidays', () => {
 let count = 0;
 for (let d = new Date('2027-01-01T12:00:00Z'); d.getUTCFullYear() === 2027; d.setUTCDate(d.getUTCDate() + 1)) {
  if (![0, 6].includes(d.getUTCDay())) count++;
 }
 assert.equal(count, 261);
 assert.deepEqual(HOLIDAYS.filter(([date]) => isWeekday(date)).map(([date]) => date), ['2027-01-01','2027-01-06','2027-03-26','2027-03-29','2027-05-06']);
});
test('rounded SEK anchor approximates $325k annual invoices after 35 days leave and five holidays', () => {
 const r = calculate(); assert.equal(r.worked, 221); assert.equal(r.billed, 221);
 assert.ok(Math.abs(convert(r.annual, 'USD') - 325000) < 50);
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
 assert.ok(Math.abs(convert(ASK_SEK,'EUR')*1.1052 - 325000) < 50);
 assert.equal(HOURS_PER_DAY,8);
 const r = calculate(); close(r.hourly*8,r.daily);
});
test('a SEK 1000 ask increment adjusts annual cost by exactly SEK 1000', () => {
 const a = calculate(), b = calculate({ask:ASK_SEK+1000});
 close(b.annual-a.annual,1000);
});
