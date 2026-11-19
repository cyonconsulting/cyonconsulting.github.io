import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {deriveKey,encode,decryptContacts} from './crypto.mjs';
const refs=JSON.parse(await readFile(new URL('./references.json',import.meta.url)));
test('all seven supplied references have exact excerpts and honest attribution',()=>{
 assert.deepEqual(refs.map(r=>r.id),['matias','alex','sergiu','vanja','michael','viktor','omar']);
 assert.deepEqual(refs.map(r=>r.excerpts.length),[3,2,3,2,2,2,2]);
 for(const ref of refs)for(const excerpt of ref.excerpts){assert.ok(ref.full.some(p=>p.includes(excerpt.text)),`${ref.id} excerpt must match its source`);assert.ok(excerpt.text.includes(excerpt.highlight));}
 assert.equal(refs.find(r=>r.id==='alex').name,'Alex Stelea');
 assert.equal(refs.find(r=>r.id==='omar').source,'Privately supplied recommendation');
 assert.equal(refs.find(r=>r.id==='omar').linkedin,'');
 assert.equal(refs.find(r=>r.id==='vanja').source,'LinkedIn recommendation');
 assert.equal(refs.find(r=>r.id==='vanja').linkedin,'');
 assert.equal(refs.find(r=>r.id==='vanja').relationship,'We worked together at Spotify.');
 assert.match(refs.find(r=>r.id==='viktor').relationship,/not been professional colleagues/);
});
test('published bundle contains no plaintext contact addresses, phone numbers or screenshots',async()=>{
 for(const name of await readdir(new URL('.',import.meta.url))){
  assert.ok(!/\.(png|jpe?g)$/i.test(name));
  const text=await readFile(new URL(name,import.meta.url),'utf8');
  assert.ok(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text),`${name} contains an email address`);
  assert.ok(!/\+[0-9]{8,15}/.test(text),`${name} contains a phone number`);
 }
});
async function fixture(){
 const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),password='test-only sample passphrase';
 const key=await deriveKey(password,salt,600000,['encrypt']);
 const payload={example:{value:'private test value'}};
 const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:new TextEncoder().encode('cyon-aave-references-v1')},key,new TextEncoder().encode(JSON.stringify(payload)));
 return {password,payload,envelope:{version:1,iterations:600000,salt:encode(salt),iv:encode(iv),ciphertext:encode(cipher)}};
}
test('password encryption roundtrips; wrong passwords and tampering fail',async()=>{
 const {password,payload,envelope}=await fixture();
 assert.deepEqual(await decryptContacts(envelope,password),payload);
 await assert.rejects(decryptContacts(envelope,'incorrect sample passphrase'));
 const bytes=Uint8Array.from(atob(envelope.ciphertext),c=>c.charCodeAt(0));bytes[0]^=1;
 await assert.rejects(decryptContacts({...envelope,ciphertext:encode(bytes)},password));
 await assert.rejects(decryptContacts({...envelope,iterations:1},password));
});
test('published ciphertext has the expected random-parameter envelope',async()=>{
 const data=JSON.parse(await readFile(new URL('./contacts.enc.json',import.meta.url)));
 assert.equal(data.version,1);assert.equal(data.iterations,600000);
 assert.equal(atob(data.salt).length,16);assert.equal(atob(data.iv).length,12);
 assert.ok(atob(data.ciphertext).length>16);
});
