import { HOURS_PER_DAY, BASE_DAYS, SALARY_RANGES, REFERENCE_WEEKDAYS, DEFAULT_PAID_LEAVE, DEFAULT_PAID_HOLIDAYS, comparisonTarget, allowanceDefaults, perAdHourlyRates, ASK_SEK, calculate, convert } from './model.mjs';
const $ = id => document.getElementById(id);
const selected = name => document.querySelector(`input[name="${name}"]:checked`).value;
let activeAskSek = ASK_SEK;
function money(sek, currency) {
  const amount = convert(sek, currency);
  const increment = Math.abs(amount) >= 10000 ? 1000 : 1;
  const rounded = Math.round(amount / increment) * increment;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, currencyDisplay: currency === 'USD' ? 'symbol' : 'code', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(rounded);
}
function render() {
  const ask = Number($('ask').value);
  if (!Number.isSafeInteger(ask) || ask < 100000 || ask > 20000000 || !$('ask').value) {
    $('ask').setCustomValidity('Enter a whole-number annual proposal between SEK 100,000 and SEK 20,000,000.');
    $('ask').reportValidity();
    return;
  }
  $('ask').setCustomValidity('');
  const currency = selected('currency'), period = selected('period'), mode = selected('mode');
  const weeks = Number(selected('weeks'));
  const hours = HOURS_PER_DAY;
  const r = calculate({ ask, weeks, mode, eves: $('eves').checked });
  const proposal = mode === 'unpaid' && weeks === 7 && !$('eves').checked && Math.abs(ask - activeAskSek) < 0.01;
  $('scenario').textContent = proposal ? 'THE PROPOSED ARRANGEMENT' : 'EXPLORATORY COMPARISON · TOP SUMMARY REMAINS THE ASK';
  const rateView = period === 'day' || period === 'hour';
  const value = { year: r.annual, month: r.annual / 12, day: r.daily, hour: r.hourly }[period];
  $('cost-label').textContent = rateView ? `Contract rate / ${period}` : `Expected cost to Aave / ${period}`;
  $('cost').textContent = money(value, currency);
  $('period-note').textContent = {
    year: 'Full-year invoice estimate under the selected arrangement.',
    month: 'Annual invoice total ÷ 12. Budget average; actual monthly invoices vary with days billed.',
    day: 'The fee for one working day. Time-off settings change the annual total, not this rate.',
    hour: `Day rate ÷ ${hours} hours. Time-off settings change the annual total, not this rate.`
  }[period];
  $('day-rate').textContent = money(r.daily, currency);
  $('hour-rate').textContent = money(r.hourly, currency);
  $('hour-label').textContent = `Hourly equivalent · ${hours}h day`;
  $('annual').textContent = money(r.annual, currency);
  $('deduction').textContent = money(r.noAbsence - r.annual, currency);
  $('full-rate').textContent = money(r.noAbsence, currency);
  $('worked').textContent = r.worked;
  $('leave').textContent = r.leave;
  $('holidays').textContent = r.holidays;
  $('billed').textContent = `${r.billed} of ${r.weekdays}`;
  $('bar-work').style.width = `${r.worked / r.weekdays * 100}%`;
  $('bar-leave').style.width = `${r.leave / r.weekdays * 100}%`;
  $('bar-holiday').style.width = `${(r.holidays) / r.weekdays * 100}%`;
  $('scenario-note').textContent = {
    unpaid: `${r.weekdays} weekdays − ${r.holidays} weekday holidays${$('eves').checked ? '/eves' : ''} − ${r.leave} additional leave days = ${r.worked} worked and billed days. No invoices for days off.`,
    paid: `${r.worked} days worked, but ${r.weekdays} paid days: ${r.leave} leave days and ${r.holidays} holiday${$('eves').checked ? '/eve' : ''} days are paid at the same day rate. Requires a different contractual arrangement.`,
  }[mode];
}
document.querySelectorAll('input[type="radio"], #eves').forEach(input => input.addEventListener('change', render));
$('ask').addEventListener('change', render);
$('reset').addEventListener('click', () => {
  for (const [name, value] of Object.entries({ currency: 'USD', period: 'year', mode: 'unpaid', weeks: '7' })) {
    document.querySelector(`input[name="${name}"][value="${value}"]`).checked = true;
  }
  $('fallback-leave').value = DEFAULT_PAID_LEAVE;
  $('fallback-holidays').value = DEFAULT_PAID_HOLIDAYS;
  $('eves').checked = false;
  renderComparison();
});
const usd = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
function renderComparison() {
  for (const id of ['fallback-leave','fallback-holidays']) {
    const input = $(id);
    input.setCustomValidity('');
    if (!input.value || !Number.isInteger(Number(input.value)) || !input.checkValidity()) {
      input.setCustomValidity('Enter a whole number within the displayed range.'); input.reportValidity(); return;
    }
  }
  const fallback = { paidLeaveDays: Number($('fallback-leave').value), paidHolidayDays: Number($('fallback-holidays').value) };
  const comparison = comparisonTarget(fallback);
  const defaults = allowanceDefaults(SALARY_RANGES, fallback);
  const rates = perAdHourlyRates(SALARY_RANGES, fallback);
  $('fallback-leave').disabled = defaults.paidLeaveDaysCount > 0;
  $('fallback-holidays').disabled = defaults.paidHolidayDaysCount > 0;
  activeAskSek = comparison.askSek; $('ask').value = activeAskSek;
  $('salary-rows').replaceChildren();
  for (const [i, range] of rates.entries()) {
    const row = document.createElement('tr'); row.id = `range-${i}`; row.className = `range-${i}`;
    const heading = document.createElement('th'); heading.scope = 'row';
    const marker = document.createElement('span'); marker.className = 'range-marker'; marker.textContent = String.fromCharCode(65+i);
    const role = document.createElement('span'); role.textContent = range.role;
    heading.append(marker, document.createTextNode(` ${range.label}`), role);
    const pay = document.createElement('td');
    pay.textContent = `${usd(Math.round(range.min/1000)*1000)}–${usd(Math.round(range.max/1000)*1000)}`;
    const context = document.createElement('td');
    const source = document.createElement('a'); source.href = range.source; source.textContent = `${range.sourceLabel} ↗`;
    context.append(document.createTextNode(`${range.context} `), source);
    const pto = document.createElement('td'); pto.className = 'pto-cell';
    pto.textContent = `${range.ptoNote} ${range.referenceDays} reference days. Leave: ${range.leaveBasis}; holidays: ${range.holidayBasis}.`;
    const evidence = document.createElement('a'); evidence.href = range.ptoSource; evidence.textContent = `${range.ptoSourceLabel} ↗`;
    pto.append(document.createTextNode(' '), evidence);
    const hourly = document.createElement('td'); hourly.className = 'hourly-cell'; hourly.textContent = `${usd(range.hourly)}/h`;
    row.append(heading,pay,pto,hourly,context); $('salary-rows').append(row);
  }
  const terms = rates.map((range, i) => `<a class="range-term range-${i}" href="#range-${i}" aria-label="${range.label} hourly rate"><span class="range-marker">${String.fromCharCode(65+i)}</span> ${usd(range.hourly)}/h</a>`);
  const leaveBasis = defaults.paidLeaveDaysCount ? `mean evidenced leave (${defaults.paidLeaveDaysCount} company)` : 'fallback leave (no stated counts)';
  const holidayBasis = defaults.paidHolidayDaysCount ? `mean evidenced holidays (${defaults.paidHolidayDaysCount} companies)` : 'fallback holidays (no stated counts)';
  $('reference-equation').textContent = `⇒ Missing counts: ${defaults.paidLeaveDays} days ${leaveBasis}; ${defaults.paidHolidayDays} days ${holidayBasis}`;
  $('hour-equation').innerHTML = `⇒ (${terms.join(' + ')}) / ${rates.length} ≈ <span class="rate-variable">${usd(comparison.hourly)}/hour</span>`;
  $('base-equation').textContent = `⇒ ${usd(comparison.hourly)}/hour * ${HOURS_PER_DAY} * ${BASE_DAYS} ≈ ${usd(comparison.annual)} PA`;
  render();
}
for (const id of ['fallback-leave','fallback-holidays']) $(id).addEventListener('change', renderComparison);
const groups = [
  ['Wallets & shared infrastructure', [
    ['radixdlt/sargon', 'Sargon · production Rust SDK'], ['radixdlt/babylon-wallet-ios', 'Radix Wallet · iOS'],
    ['radixdlt/babylon-wallet-android', 'Radix Wallet · Android'], ['Sajjon/RadixWalletKit', 'RadixWalletKit · Sargon precursor'],
    ['radixdlt/sargon-mfa', 'Sargon MFA'], ['OpenZesame/Zhip', 'Zhip · Zilliqa wallet'], ['OpenZesame/Zesame', 'Zesame · Zilliqa SDK'],
    ['Sajjon/lera', 'lera · Rust view models'], ['Sajjon/identified_vec', 'identified_vec'],
    ['Sajjon/one-does-not-simply-sign', 'one-does-not-simply-sign']
  ]],
  ['Cryptography & key management', [
    ['Sajjon/K1', 'K1 · libsecp256k1 Swift API'], ['Sajjon/EllipticCurveKit', 'EllipticCurveKit'], ['Sajjon/EquationKit', 'EquationKit'],
    ['Sajjon/svar', 'svar · secret recovery'], ['Sajjon/Bells', 'Bells · BLS12-381'], ['Sajjon/Blomst', 'Blomst · blst bindings'],
    ['Sajjon/SvenskaBIP39', 'SvenskaBIP39'], ['Sajjon/Behandla', 'Behandla'], ['Sajjon/Mnemonize', 'Mnemonize'],
    ['Sajjon/VanligaOrd', 'VanligaOrd'], ['Sajjon/ECDH-secp256k1-KDF-Generate-TestVector', 'ECDH test vectors'],
    ['radixdlt/radixdlt-ledger-app', 'Ledger app · C'], ['radixdlt/babylon-ledger-app', 'Ledger app · Rust']
  ]],
  ['Networking, protocols & Web3', [
    ['paritytech/polkadot-sdk', 'Polkadot SDK · contributor'], ['paritytech/polkadot-stps', 'Polkadot STPS · contributor'],
    ['radixdlt/radixdlt-js', 'Radix JS SDK'], ['radixdlt/radixdlt-javascript', 'Radix JavaScript SDK'],
    ['Sajjon/P2PConnector', 'P2PConnector'], ['Sajjon/RTCConnector', 'RTCConnector'], ['Sajjon/Swift-RTC', 'Swift-RTC'],
    ['Sajjon/gastimator', 'gastimator · Ethereum'], ['Sajjon/rad', 'rad · vanity addresses'], ['Sajjon/RadBal', 'RadBal'],
    ['unkuseni/rs_bybit', 'rs_bybit · contributor']
  ]],
  ['Swift, tooling & engineering craft', [
    ['apple/swift-crypto', 'Apple Swift Crypto · contributor'], ['mozilla/uniffi-rs', 'Mozilla UniFFI · contributor'],
    ['Sajjon/clients-rs', 'clients-rs'], ['Sajjon/klirr', 'klirr'], ['Sajjon/SwiftIntro', 'SwiftIntro · mentoring'],
    ['Sajjon/Makros', 'Makros'], ['Sajjon/NanoViewController', 'NanoViewController'], ['Sajjon/ViewComposer', 'ViewComposer'],
    ['Sajjon/MultiSpeedSlider', 'MultiSpeedSlider'], ['Sajjon/Pipeline', 'Pipeline'], ['Sajjon/BytePattern', 'BytePattern'],
    ['Sajjon/pedantic-swift-style', 'pedantic-swift-style'], ['Sajjon/Xcconfigs', 'Xcconfigs'], ['Sajjon/UIKitiOS', 'UIKitiOS'],
    ['Sajjon/Makt', 'Makt · binary formats'], ['Sajjon/Tritium', 'Tritium · SwiftUI'], ['Sajjon/HoMM2SwiftUI-POC', 'HoMM2 SwiftUI proof of concept']
  ]]
];
for (const [title, repos] of groups) {
  const section = document.createElement('div'); section.className = 'repo-group';
  const heading = document.createElement('h4'); heading.textContent = title; section.append(heading);
  const links = document.createElement('div'); links.className = 'repo-list';
  for (const [path, title] of repos) { const link = document.createElement('a'); link.href = `https://github.com/${path}`; link.textContent = `${title} ↗`; links.append(link); }
  section.append(links); $('repo-groups').append(section);
}
renderComparison();
