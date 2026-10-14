/** 8086 Visual Lab — gallery and viewer only. Every original model remains sandboxed in its own HTML iframe. */
'use strict';
const MODELS = [
  {
    id: 'advanced-architecture', label: '3D Architecture Studio', small: 'Advanced spatial model', category: 'architecture', type: '3D ARCHITECTURE', file: 'labs/advanced-3d-architecture.html',
    summary: 'Explore the complete internal architecture with an orbitable 3D diagram, interactive components, and live instruction-flow telemetry.',
    features: ['3D orbit controls', 'Live data flow', 'Component inspector'], hint: 'Drag to orbit · Scroll to zoom · Select components', visual: 'arch',
    notes: 'Full 3D visualization with camera presets, BIU and EU blocks, live bus telemetry, and clickable registers.'
  },
  {
    id: 'processor-explorer', label: 'Instruction Flow Explorer', small: 'Animated 3D pathways', category: 'architecture', type: '3D ARCHITECTURE', file: 'labs/processor-explorer.html',
    summary: 'Watch how bytes are fetched, queued, decoded, and executed using an explorable three-dimensional processor model.',
    features: ['3D rotation', 'Step-through execution', 'Signal tracing'], hint: 'Rotate the model · Follow the instruction steps', visual: 'flow',
    notes: 'Interactive walkthrough of instruction fetch, the six-byte queue, register operations, and the ALU.'
  },
  {
    id: 'classic-architecture', label: '3D Block Diagram', small: 'BIU and EU layout', category: 'architecture', type: '3D ARCHITECTURE', file: 'labs/classic-3d-architecture.html',
    summary: 'Inspect the 8086 bus interface and execution units as a spatial block diagram with clickable parts.',
    features: ['3D view', 'Component filtering', 'Zoom & rotate'], hint: 'Drag to rotate · Click a block · Use the right panel', visual: 'blocks',
    notes: 'Classic internal architecture model with detailed block descriptions and interactive controls.'
  },
  {
    id: 'pin-explorer', label: '3D Pin Explorer', small: 'Interactive 40-pin package', category: 'pinout', type: '3D PIN EXPLORER', file: 'labs/interactive-pin-explorer.html',
    summary: 'Orbit a detailed DIP-40 processor package and inspect every pin, signal direction, and min/max mode function.',
    features: ['All 40 pins', 'Min / max mode', 'Pin search'], hint: 'Drag the chip to orbit · Select a pin · Toggle modes', visual: 'chip',
    notes: 'Detailed interactive package model with comprehensive pin data, related pins, and mode switching.'
  },
  {
    id: 'classic-pin', label: 'Classic DIP-40 Model', small: 'Color-coded pin explorer', category: 'pinout', type: '3D PIN EXPLORER', file: 'labs/classic-pin-explorer.html',
    summary: 'A simplified, color-coded 3D Intel 8086 package with pin selection and signal-category filters.',
    features: ['40 interactive pins', 'Signal filters', '3D rotation'], hint: 'Rotate · Click pins · Filter signal types', visual: 'classic-chip',
    notes: 'Classic 3D pin visualization with top-view controls and minimum/maximum signal names.'
  },
  {
    id: 'architecture-lab', label: 'Architecture Cycle Lab', small: 'Interactive 2D reference', category: 'architecture', type: '2D INTERACTIVE MODEL', file: 'labs/architecture-lab.html',
    summary: 'Follow the processor data path on a detailed interactive 2D schematic with animated instruction steps.',
    features: ['Interactive schematic', 'Animated cycles', 'Register playground'], hint: 'Click a block · Press Step or Auto cycle', visual: 'diagram',
    notes: 'Additional two-dimensional model retained from the original files, ideal for understanding the underlying architecture.'
  }
];
const $ = id => document.getElementById(id);
const ICONS = {
  box: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="m3.6 8 8.4-5 8.4 5M12 3v17M3 8l9 5 9-5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 5-5 4 4 3-3 6 6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-2 2"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21l2-2"/>',
  external: '<path d="M14 3h7v7m0-7-10 10"/><path d="M20 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
  maximize: '<path d="M8 3H3v5m0-5 6 6m7-6h5v5m0-5-6 6M3 16v5h5m-5 0 6-6m7 6h5v-5m0 5-6-6"/>',
  minimize: '<path d="M9 9H3M3 3v6m0 0 6-6m6 6h6m0-6v6m0 0-6-6M9 15H3m0 6v-6m0 0 6 6m6-6h6m0 6v-6m0 0-6 6"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2 6"/><path d="M20 4v7h-7"/>',
  mouse: '<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v7"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', close: '<path d="M18 6 6 18M6 6l12 12"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
};
const icon = (name, size=18) => `<svg viewBox="0 0 24 24" aria-hidden="true" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">${ICONS[name] || ICONS.box}</svg>`;
document.querySelectorAll('.icon[data-icon]').forEach(node => { node.innerHTML=icon(node.dataset.icon); });

let current = MODELS[0];
let view = 'viewer';
let galleryFilter = 'all';
let timer = 0;
const frame = $('model-frame');
const stage = $('stage');
const loader = $('stage-loading');

function navGroup(title,items){
  return `<section class="nav-section"><div class="nav-section-title">${title}<span>${String(items.length).padStart(2,'0')}</span></div>${items.map(m=>{
    const i=MODELS.indexOf(m)+1;
    return `<button type="button" class="model-nav-item ${current.id===m.id?'active':''}" data-model="${m.id}" aria-current="${current.id===m.id?'true':'false'}"><span class="model-icon ${m.category}">${icon(m.category==='pinout'?'cpu':m.visual==='diagram'?'layers':'box')}</span><span class="nav-model-copy"><strong>${m.label}</strong><small>${m.small}</small></span><span class="nav-model-num">${String(i).padStart(2,'0')}</span></button>`;
  }).join('')}</section>`;
}
function renderNav(){
  $('model-nav').innerHTML = navGroup('3D Architecture',MODELS.slice(0,3)) + navGroup('3D Pin Models',MODELS.slice(3,5)) + navGroup('Additional Model',MODELS.slice(5));
  $('model-nav').querySelectorAll('[data-model]').forEach(b=>b.addEventListener('click',()=>switchModel(b.dataset.model)));
}
function closeSidebar(){ $('model-sidebar').classList.remove('is-open');$('sidebar-shade').classList.remove('active');$('mobile-models').setAttribute('aria-expanded','false'); }
$('mobile-models').addEventListener('click',()=>{let opening=!$('model-sidebar').classList.contains('is-open');$('model-sidebar').classList.toggle('is-open',opening);$('sidebar-shade').classList.toggle('active',opening);$('mobile-models').setAttribute('aria-expanded',String(opening));});
$('sidebar-shade').addEventListener('click',closeSidebar);

function updateFrame(model,force=false){
  if(force || frame.dataset.model!==model.id){
    loader.hidden=false;loader.classList.remove('loaded');
    window.clearTimeout(timer);
    frame.title=`${model.label} — interactive Intel 8086 visualization`;
    frame.dataset.model=model.id;
    frame.src=model.file;
    timer=window.setTimeout(()=>{loader.hidden=true;},12000);
  }
}
frame.addEventListener('load',()=>{window.clearTimeout(timer);loader.classList.add('loaded');window.setTimeout(()=>{loader.hidden=true;},260);});
function updateViewer(model){
  let number=String(MODELS.indexOf(model)+1).padStart(2,'0');
  $('model-eyebrow').innerHTML=`${model.type} <span class="crumb-sep">/</span> MODEL ${number} OF 06`;
  $('model-heading').textContent=model.label;
  $('model-summary').textContent=model.summary;
  $('model-features').innerHTML=model.features.map(f=>`<span class="feature-tag">${f}</span>`).join('');
  $('stage-index').textContent=`${number} / 06`;
  $('stage-hint').textContent=model.hint;
  $('usage-tip').textContent=model.notes;
  $('open-standalone').href=model.file;
  updateFrame(model);
}
function setView(next){
  view=next;
  $('viewer-view').hidden=next!=='viewer';
  $('gallery-view').hidden=next!=='gallery';
  $('viewer-tab').setAttribute('aria-pressed',String(next==='viewer'));
  $('gallery-tab').setAttribute('aria-pressed',String(next==='gallery'));
  document.title=next==='gallery'?'Model Gallery — 8086 Visual Lab':`${current.label} — 8086 Visual Lab`;
  if(next==='gallery')renderGallery();
  window.scrollTo({top:0,behavior:'instant'});
  closeSidebar();
}
function route(){
  const hash=decodeURIComponent(location.hash||'');
  if(hash==='#/gallery'){setView('gallery');return;}
  const m=hash.match(/^#\/model\/([a-z0-9-]+)$/);
  const found=m?MODELS.find(x=>x.id===m[1]):null;
  current=found||MODELS[0];
  updateViewer(current);
  renderNav();
  setView('viewer');
}
function switchModel(id){
  const model=MODELS.find(x=>x.id===id);
  if(!model)return;
  if(location.hash!==`#/model/${id}`)location.hash=`#/model/${id}`;
  else route();
}
$('gallery-tab').addEventListener('click',()=>{location.hash='#/gallery';});
$('viewer-tab').addEventListener('click',()=>switchModel(current.id));
$('featured-start').addEventListener('click',()=>switchModel(MODELS[0].id));
$('reload-model').addEventListener('click',()=>updateFrame(current,true));
$('prev-model').addEventListener('click',()=>switchModel(MODELS[(MODELS.indexOf(current)+MODELS.length-1)%MODELS.length].id));
$('next-model').addEventListener('click',()=>switchModel(MODELS[(MODELS.indexOf(current)+1)%MODELS.length].id));
$('fullscreen-button').addEventListener('click',async()=>{
  try {if(document.fullscreenElement)await document.exitFullscreen();else if(stage.requestFullscreen)await stage.requestFullscreen(); else {frame.contentWindow?.focus();}}
  catch(e){notify('Fullscreen is unavailable in this browser. Try opening the model in a new tab.');}
});
document.addEventListener('fullscreenchange',()=>{
  const yes=Boolean(document.fullscreenElement);
  $('fullscreen-button').innerHTML=icon(yes?'minimize':'maximize')+`<span class="hide-mobile">${yes?'Exit fullscreen':'Fullscreen'}</span>`;
  stage.classList.toggle('is-fullscreen',yes);
});
function notify(message){const t=$('toast');t.textContent=message;t.classList.add('visible');window.clearTimeout(notify.timer);notify.timer=window.setTimeout(()=>t.classList.remove('visible'),2500);}
$('copy-link').addEventListener('click',async()=>{
  const url=location.href.split('#')[0]+`#/model/${current.id}`;
  try {await navigator.clipboard.writeText(url);notify('Direct link copied');}
  catch {const element=document.createElement('textarea');element.value=url;document.body.appendChild(element);element.select();try{document.execCommand('copy');notify('Direct link copied');}catch{notify('Copy the model URL from your address bar');}element.remove();}
});

const diagram=() => `<div class="visual-diagram"><div class="viz-glow"></div><div class="diagram-biu">BIU<div class="diagram-item">QUEUE</div><div class="diagram-item wide">ADDRESS ADDER</div></div><div class="diagram-arrows">⇅</div><div class="diagram-eu">EU<div class="diagram-item">REGISTERS</div><div class="diagram-item wide">ALU / FLAGS</div></div></div>`;
const modelIllustration=m=>{
  if(m.visual==='chip'||m.visual==='classic-chip')return `<div class="visual-illustration chip-illustration ${m.visual}"><div class="dippins leftpins">${Array(12).fill('<i></i>').join('')}</div><div class="dip"><div class="notch"></div><span>INTEL</span><b>8086</b><small>40 PIN DIP</small></div><div class="dippins rightpins">${Array(12).fill('<i></i>').join('')}</div></div>`;
  if(m.visual==='diagram')return `<div class="visual-illustration diagram-illustration">${diagram()}</div>`;
  return `<div class="visual-illustration architecture-illustration ${m.visual}"><div class="plane-shadow"></div>${diagram()}<div class="float-chip one"></div><div class="float-chip two"></div></div>`;
};
function renderGallery(){
  $('gallery-grid').innerHTML=MODELS.filter(m=>galleryFilter==='all'||galleryFilter===m.category).map(m=>`
    <button type="button" class="gallery-card" data-model="${m.id}" aria-label="Open ${m.label}">
      <div class="gallery-art ${m.category}">${modelIllustration(m)}<span class="art-badge">${m.type.startsWith('2D')?'2D':'3D'} INTERACTIVE</span></div>
      <div class="gallery-card-body"><div class="card-topline">${m.type}<span>${String(MODELS.indexOf(m)+1).padStart(2,'0')} / 06</span></div><h3>${m.label}</h3><p>${m.summary}</p><div class="card-bottom"><span>${m.features.slice(0,2).join('  ·  ')}</span><span class="card-open">${icon('right')}</span></div></div>
    </button>`).join('');
  $('gallery-grid').querySelectorAll('[data-model]').forEach(b=>b.addEventListener('click',()=>switchModel(b.dataset.model)));
}
$('gallery-filters').querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
  galleryFilter=b.dataset.filter;
  $('gallery-filters').querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));
  renderGallery();
}));

function openReference(){ $('reference-modal').hidden=false; document.body.classList.add('modal-open');$('reference-close').focus(); }
function closeReference(){ $('reference-modal').hidden=true;document.body.classList.remove('modal-open');$('reference-button').focus(); }
$('reference-button').addEventListener('click',openReference);
$('reference-close').addEventListener('click',closeReference);
$('reference-modal').addEventListener('click',e=>{if(e.target===$('reference-modal'))closeReference();});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(!$('reference-modal').hidden)closeReference();else closeSidebar();}
  if(e.target.matches('input,textarea,select')||e.ctrlKey||e.metaKey||e.altKey)return;
  if(/^[1-6]$/.test(e.key)&&$('reference-modal').hidden)switchModel(MODELS[Number(e.key)-1].id);
});
window.addEventListener('hashchange',route);
renderNav();
route();
