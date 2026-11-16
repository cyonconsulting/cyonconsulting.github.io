import { HOURS_PER_DAY, BASE_DAYS, SALARY_RANGES, comparisonTarget, allowanceDefaults, perAdHourlyRates } from './model.mjs';
const $ = id => document.getElementById(id);
const days = value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
const usd = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
function renderComparison() {
  const comparison = comparisonTarget();
  const defaults = allowanceDefaults(SALARY_RANGES);
  const rates = perAdHourlyRates(SALARY_RANGES);
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
    pto.textContent = `${range.ptoNote} ${days(range.referenceDays)} reference days. Leave: ${range.leaveBasis}; holidays: ${range.holidayBasis}.`;
    const evidence = document.createElement('a'); evidence.href = range.ptoSource; evidence.textContent = `${range.ptoSourceLabel} ↗`;
    pto.append(document.createTextNode(' '), evidence);
    const hourly = document.createElement('td'); hourly.className = 'hourly-cell'; hourly.textContent = `${usd(range.hourly)}/h`;
    row.append(heading,pay,pto,hourly,context); $('salary-rows').append(row);
  }
  const terms = rates.map((range, i) => `<a class="range-term range-${i}" href="#range-${i}" aria-label="${range.label} hourly rate"><span class="range-marker">${String.fromCharCode(65+i)}</span> ${usd(range.hourly)}/h</a>`);
  const leaveBasis = defaults.paidLeaveDaysCount ? `mean evidenced leave (${defaults.paidLeaveDaysCount} companies)` : 'fallback leave (no stated counts)';
  const holidayBasis = defaults.paidHolidayDaysCount ? `mean evidenced holidays (${defaults.paidHolidayDaysCount} companies)` : 'fallback holidays (no stated counts)';
  $('reference-equation').textContent = `⇒ Missing counts: ${days(defaults.paidLeaveDays)} days ${leaveBasis}; ${days(defaults.paidHolidayDays)} days ${holidayBasis}`;
  $('hour-equation').innerHTML = `⇒ (${terms.join(' + ')}) / ${rates.length} ≈ <span class="rate-variable">${usd(comparison.hourly)}/hour</span>`;
  $('annual-ask').textContent = `${usd(comparison.annual)} PA`;
  $('headline-annual').textContent = `$${Math.round(comparison.annual / 1000)}k PA`;
  $('base-equation').textContent = `≈ ${usd(comparison.hourly)}/hour * ${HOURS_PER_DAY} * ${BASE_DAYS} (rounded)`;
}
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
