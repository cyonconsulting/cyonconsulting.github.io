import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const refs=JSON.parse(await readFile(new URL('../references/references.json',import.meta.url)));
const source=(await readFile(new URL('../references/app.mjs',import.meta.url),'utf8')).replace(/^import[^\n]*\n/,'');
const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
test('compact rows preserve order, original quotes, short length, portraits and reference destinations',()=>{
 const rows=[...html.matchAll(/<a class="reference-row" href="\/aave\/references\/#([^"]+)">(.*?)<\/a>/gs)];
 assert.deepEqual(rows.map(r=>r[1]),refs.map(r=>r.id));
 for(const [,id,content] of rows){
  const ref=refs.find(r=>r.id===id),quote=decode(content.match(/<q>(.*?)<\/q>/s)[1]);
  assert.ok(quote.length<=(['alex','omar'].includes(id)?220:200));
  const original=ref.full.join('\n');
  const positions=quote.replace(/^\.\.\./,'').split(' … ').map(fragment=>{const position=original.indexOf(fragment);assert.ok(position>=0,id);return position;});
  assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),`${id} excerpts must follow original order`);
  assert.ok(content.includes(`/aave/references/${ref.photo}`));
  assert.ok(content.includes(ref.name)); assert.ok(content.includes(decode(ref.role)));
 }
 assert.ok(html.indexOf('class="compact-references"')<html.indexOf('class="ask-at-a-glance"'));
});
for(const id of ['vanja','omar'])test(`direct #${id} waits for cards and fonts before scrolling`,async()=>{
 const nodes=new Map(),scrolls=[];
 function node(){return {children:[],append(...children){this.children.push(...children);},replaceChildren(...children){this.children=children;},setAttribute(){},addEventListener(){},get childElementCount(){return this.children.length;},set id(value){this._id=value;nodes.set(value,this);},get id(){return this._id;},scrollIntoView(options){scrolls.push({id:this.id,options});}};}
 let resolveData,resolveFonts;
 const data=new Promise(resolve=>{resolveData=resolve;}),fonts=new Promise(resolve=>{resolveFonts=resolve;});
 const document={getElementById(id){return nodes.get(id)??null;},createElement:node,createTextNode:text=>({text}),fonts:{ready:fonts}};
 for(const id of ['lock-button','unlock-form','references','unlock-button','loading']){const n=node();n.id=id;}
 const window={location:{hash:'#'+id},addEventListener(){}};
 const run=new (Object.getPrototypeOf(async function(){}).constructor)('document','window','fetch',source);
 const running=run(document,window,async()=>({ok:true,json:()=>data}));
 assert.equal(scrolls.length,0);resolveData(refs);
 await new Promise(resolve=>setImmediate(resolve));
 assert.ok(nodes.has(id));assert.equal(scrolls.length,0);
 resolveFonts();await running;
 assert.equal(scrolls.length,1);assert.equal(scrolls[0].id,id);assert.equal(scrolls[0].options.block,'start');
});
