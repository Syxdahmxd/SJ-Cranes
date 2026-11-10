const PHONE1='9845626810', PHONE2='9343712333', WHATSAPP='919845626810', EMAIL='sjcranes93@gmail.com';
const API_URL=''; // Optional: e.g. https://your-api.example.com/api
const capacities=['12 Ton','20 Ton','25 Ton','40 Ton','50 Ton','60 Ton','80 Ton','100 Ton','Above 100 Ton'];
const images=[
 'https://images.unsplash.com/photo-1586458995526-09ce6839babe?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1566766804405-eed274ee46bf?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1592395700302-d433884e8d45?auto=format&fit=crop&w=1000&q=85',
 'https://images.unsplash.com/photo-1781356857510-0be2172fecc1?auto=format&fit=crop&w=1000&q=85'
];
const fleet=capacities.map((capacity,i)=>({capacity,category:i%2?'Hydraulic Crane':'Mobile Crane',manufacturer:capacity==='20 Ton'?'SANY Crane':capacity==='60 Ton'?'Tadano Crane':'Specifications available on request',image:images[i%4]}));
const fleetGrid=document.getElementById('fleetGrid'), capFilter=document.getElementById('capacityFilter'), formCapacity=document.getElementById('formCapacity');
capacities.forEach(c=>{capFilter.add(new Option(c,c));formCapacity.add(new Option(c,c));});
let selectedCategory='All';
function renderFleet(){const cap=capFilter.value;const list=fleet.filter(x=>(selectedCategory==='All'||x.category===selectedCategory)&&(cap==='All capacities'||x.capacity===cap));fleetGrid.innerHTML=list.map(x=>`<article class="fleet-card"><img src="${x.image}" alt="${x.category} ${x.capacity}" loading="lazy"><div class="fleet-overlay"><small>${x.category}</small><h3>${x.capacity}</h3><p>${x.manufacturer}</p><button type="button" data-capacity="${x.capacity}" data-category="${x.category}">Request enquiry ↗</button></div></article>`).join('');}
renderFleet();
document.getElementById('categoryFilters').addEventListener('click',e=>{const b=e.target.closest('button[data-category]');if(!b)return;selectedCategory=b.dataset.category;document.querySelectorAll('#categoryFilters button').forEach(x=>x.classList.toggle('active',x===b));renderFleet();});
capFilter.addEventListener('change',renderFleet);
fleetGrid.addEventListener('click',e=>{const b=e.target.closest('button[data-capacity]');if(!b)return;formCapacity.value=b.dataset.capacity;document.querySelector('[name="crane_type"]').value=b.dataset.category;document.getElementById('contact').scrollIntoView({behavior:'smooth'});});
const menuButton=document.getElementById('menuButton'),navLinks=document.getElementById('navLinks');
menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰';});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));
const form=document.getElementById('quoteForm'),notice=document.getElementById('formNotice');
function getData(){return Object.fromEntries(new FormData(form).entries());}
function message(d){return `Hello SJ Cranes Services, I need a quote. Name: ${d.customer_name||'Not provided'}; Company: ${d.company_name||'Not provided'}; Phone: ${d.phone||'Not provided'}; Location: ${d.location||'Not provided'}; Date: ${d.project_date||'Not provided'}; Crane: ${d.crane_type}; Capacity: ${d.capacity}; Requirements: ${d.requirements||'Please advise'}; Message: ${d.message||''}`;}
function refreshActions(){const d=getData(),msg=encodeURIComponent(message(d));document.getElementById('formWhatsapp').href=`https://wa.me/${WHATSAPP}?text=${msg}`;document.getElementById('formEmail').href=`mailto:${EMAIL}?subject=${encodeURIComponent('Crane quote request')}&body=${msg}`;}
form.addEventListener('input',refreshActions);form.addEventListener('change',refreshActions);refreshActions();
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const d=getData();if(API_URL){try{const r=await fetch(`${API_URL}/quotes`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw new Error('API error');notice.textContent='Enquiry saved successfully. You can also send the details by WhatsApp or email.';}catch{notice.textContent='Could not save online. Please use WhatsApp or Email below to send your enquiry.';}}else{notice.textContent='Your enquiry is ready. Please choose WhatsApp or Email below to send the details directly.';}refreshActions();});
const lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImage');
document.getElementById('projectGrid').addEventListener('click',e=>{const tile=e.target.closest('[data-image]');if(!tile)return;lbImg.src=tile.dataset.image;lightbox.classList.add('open');});
function closeLightbox(){lightbox.classList.remove('open');lbImg.src='';}
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
