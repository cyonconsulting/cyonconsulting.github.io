import { HOURS_PER_DAY, ASK_SEK, calculate, convert } from './model.mjs';
const $ = id => document.getElementById(id);
const selected = name => document.querySelector(`input[name="${name}"]:checked`).value;
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
  const proposal = mode === 'unpaid' && weeks === 7 && !$('eves').checked && Math.abs(ask - ASK_SEK) < 0.01;
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
  $('ask').value = ASK_SEK;
  $('eves').checked = false;
  render();
});
$('anchor-sek').textContent = `${money(ASK_SEK, 'SEK')} PA`;
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
render();
