const decode = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
export const encode = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
export async function deriveKey(password, salt, iterations, usages) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, material, { name: 'AES-GCM', length: 256 }, false, usages);
}
export async function decryptContacts(envelope, password) {
  if (envelope.version !== 1 || envelope.iterations !== 600000) throw new Error('Unsupported contact file.');
  const salt = decode(envelope.salt), iv = decode(envelope.iv);
  if (salt.length !== 16 || iv.length !== 12) throw new Error('Invalid contact file.');
  const key = await deriveKey(password, salt, envelope.iterations, ['decrypt']);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: new TextEncoder().encode('cyon-aave-references-v1') }, key, decode(envelope.ciphertext));
  return JSON.parse(new TextDecoder().decode(plain));
}
