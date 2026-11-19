import { decryptContacts } from './crypto.mjs';
const $ = id => document.getElementById(id);
let references = [], unlocked = false;
function el(tag, className, text) {
  const node=document.createElement(tag); if(className)node.className=className;
  if(text!=null)node.textContent=text; return node;
}
function link(text, href, className) { const a=el('a',className,text); a.href=href; a.rel='noreferrer'; return a; }
function lockedContact(container) {
  container.replaceChildren(el('p','','Email & phone are locked.'));
  const a=link('Unlock contact details ↗','#contact-access','unlock-link');
  a.addEventListener('click',()=>{ $('password').focus({preventScroll:true}); }); container.append(a);
}
function buildReference(ref) {
  const article=el('article','reference'); article.id=ref.id;
  const person=el('div','person');
  const top=el('div','person-top'), name=el('div');
  name.append(el('p','reference-type',ref.type),el('h2','',ref.name));
  const initials=el('span','monogram',ref.initials); initials.setAttribute('aria-hidden','true'); top.append(initials,name);
  person.append(top,el('p','role',ref.role),el('p','relationship',ref.relationship));
  const meta=[ref.location,ref.languages].filter(Boolean).join(' · ');
  if(meta)person.append(el('p','person-meta',meta));
  const links=el('div','person-links');
  if(ref.linkedin)links.append(link('LinkedIn ↗',ref.linkedin)); if(ref.github)links.append(link('GitHub ↗',ref.github)); if(links.childElementCount)person.append(links);
  const contacts=el('div','contacts'); contacts.id=`contacts-${ref.id}`; contacts.setAttribute('aria-label',`${ref.name} contact details`); lockedContact(contacts); person.append(contacts);
  const words=el('div','words'), figure=el('figure');
  for (const excerpt of ref.excerpts) {
    const quote=el('blockquote','excerpt');
    const index=excerpt.text.indexOf(excerpt.highlight);
    if(index<0)quote.textContent=excerpt.text;
    else quote.append(document.createTextNode(excerpt.text.slice(0,index)),el('mark','',excerpt.highlight),document.createTextNode(excerpt.text.slice(index+excerpt.highlight.length)));
    figure.append(quote);
  }
  figure.append(el('figcaption','',`${ref.excerpts.length>1?'Excerpts':'Excerpt'} · ${ref.source}${ref.date?' · '+ref.date:''}`));
  const details=el('details','full-recommendation'); details.append(el('summary','','Read full recommendation'));
  const full=el('blockquote','full-text'); for(const paragraph of ref.full)full.append(el('p','',paragraph)); details.append(full); words.append(figure,details);
  if(ref.source==='LinkedIn recommendation')words.append(link('View recommendations on LinkedIn ↗','https://www.linkedin.com/in/alexcyon/details/recommendations/','source-link'));
  article.append(person,words); return article;
}
function lockContacts(announce=true) {
  for(const ref of references)lockedContact($(`contacts-${ref.id}`));
  unlocked=false; $('unlock-form').hidden=false; $('unlocked-controls').hidden=true; $('unlock-form').reset();
  $('unlock-status').textContent=announce?'Contact details locked.':'';
}
$('lock-button').addEventListener('click',()=>lockContacts());
$('unlock-form').addEventListener('submit',async event=>{
  event.preventDefault(); const button=$('unlock-button'); if(button.disabled)return;
  const password=$('password').value; if(!password)return;
  button.disabled=true; $('unlock-status').textContent='Unlocking…';
  try {
    const response=await fetch('./contacts.enc.json',{cache:'no-store'}); if(!response.ok)throw new Error('load');
    let contacts=await decryptContacts(await response.json(),password);
    for(const ref of references){
      const contact=contacts[ref.id];
      if(!contact || typeof contact.email!=='string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || !/^\+[0-9]{8,15}$/.test(contact.phone))throw new Error('data');
    }
    for(const ref of references){
      const contact=contacts[ref.id], container=$(`contacts-${ref.id}`); container.replaceChildren();
      const email=el('div','contact-item'), phone=el('div','contact-item');
      email.append(el('span','','Email'),link(contact.email,`mailto:${contact.email}`));
      phone.append(el('span','','Phone'),link(contact.phone,`tel:${contact.phone}`)); container.append(email,phone);
    }
    contacts=null; unlocked=true; $('unlock-form').reset(); $('unlock-form').hidden=true; $('unlocked-controls').hidden=false;
    $('unlock-status').textContent=`Email and phone details are now visible on all ${references.length} references.`;
  }catch(error){
    if(error.message==='load')$('unlock-status').textContent='Could not load contact details. Please try again.';
    else $('unlock-status').textContent='Could not unlock contacts. Check the password and try again.';
  }finally{button.disabled=false;}
});
window.addEventListener('pagehide',()=>{if(unlocked)lockContacts(false);});
try {
  const response=await fetch('./references.json'); if(!response.ok)throw new Error(); references=await response.json();
  $('references').replaceChildren(...references.map(buildReference)); $('unlock-button').disabled=false;
}catch{ $('loading').textContent='Recommendations could not load. Please refresh the page.'; $('unlock-button').disabled=true; }
