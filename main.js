const PHONE1='9845626810', PHONE2='9343712333', WHATSAPP='919845626810', EMAIL='sjcranes93@gmail.com';
const API_URL=''; // Optional: e.g. https://your-api.example.com/api
const capacities=['12 Ton','20 Ton','25 Ton','40 Ton','50 Ton','60 Ton','80 Ton','100 Ton','Above 100 Ton'];
const images=[
  './12 Ton.png',
  './F20.jpeg',
  './Farana.png',
  './F40.jpeg',
  './Sany.jpeg',
  './Tadano.jpeg',
  './Zoomlion.jpeg',
  './Luna.jpeg',
  './Sany.jpeg'
];
const fleet=capacities.map((capacity,i)=>({
  capacity,
  category:i%2?'Hydraulic Crane':'Mobile Crane',
  manufacturer:
    capacity==='12 Ton'?'12 Ton.png':
    capacity==='20 Ton'?'F20':
    capacity==='25 Ton'?'Farana.png':
    capacity==='60 Ton'?'Tadano.jpeg':
    capacity==='80 Ton'?'Zoomlion.jpeg':
    capacity==='100 Ton'?'Sany.jpeg':
    'SJ Cranes',
  image:images[i % images.length]
}));
const fleetGrid=document.getElementById('fleetGrid');
const capFilter=document.getElementById('capacityFilter');
const formCapacity=document.getElementById('formCapacity');

// Populate capacity controls independently so a missing form field cannot
// prevent the fleet capacity filter from being filled.
if(capFilter){
  capFilter.replaceChildren(new Option('All capacities','All capacities'));
  capacities.forEach(capacity=>capFilter.add(new Option(capacity,capacity)));
}
if(formCapacity){
  formCapacity.replaceChildren();
  capacities.forEach(capacity=>formCapacity.add(new Option(capacity,capacity)));
}

let selectedCategory='All';
function renderFleet(){
  if(!fleetGrid||!capFilter)return;
  const cap=capFilter.value;
  const list=fleet.filter(x=>
    (selectedCategory==='All'||x.category===selectedCategory)&&
    (cap==='All capacities'||x.capacity===cap)&&
    !(selectedCategory==='Hydraulic Crane'&&x.capacity==='20 Ton')
  );
  fleetGrid.innerHTML=list.map(x=>`<article class="fleet-card"><img src="${x.image}" alt="${x.manufacturer} ${x.capacity} crane" loading="lazy"><div><span>${x.category}</span><h3>${x.manufacturer}</h3><p>${x.capacity} capacity</p><button class="button primary" type="button" data-capacity="${x.capacity}">Enquire about this crane ↗</button></div></article>`).join('');
}
renderFleet();
const categoryFilters=document.getElementById('categoryFilters');
if(categoryFilters)categoryFilters.addEventListener('click',e=>{
  const button=e.target.closest('button[data-category]');
  if(!button)return;
  selectedCategory=button.dataset.category;
  categoryFilters.querySelectorAll('button').forEach(item=>item.classList.toggle('active',item===button));
  renderFleet();
});
if(capFilter)capFilter.addEventListener('change',renderFleet);
if(fleetGrid)fleetGrid.addEventListener('click',e=>{
  const button=e.target.closest('button[data-capacity]');
  if(!button)return;
  if(formCapacity)formCapacity.value=button.dataset.capacity;
  const craneType=document.querySelector('[name="crane_type"]');
  if(craneType)craneType.value=selectedCategory==='All'?'Mobile Crane':selectedCategory;
  document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
});

const menuButton=document.getElementById('menuButton');
const navLinks=document.getElementById('navLinks');
if(menuButton&&navLinks){
  menuButton.addEventListener('click',()=>{
    const open=navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.textContent=open?'×':'☰';
  });
  navLinks.addEventListener('click',e=>{
    if(e.target.closest('a')){
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.textContent='☰';
    }
  });
}

const form=document.getElementById('quoteForm');
const notice=document.getElementById('formNotice');
const whatsappLink=document.getElementById('formWhatsapp');
function getData(){return form?Object.fromEntries(new FormData(form).entries()):{};}
function message(data){return `Hello SJ Cranes Services, I need a quote.\nName: ${data.customer_name||'Not provided'}\nCompany: ${data.company_name||'Not provided'}\nPhone: ${data.phone||'Not provided'}\nEmail: ${data.email||'Not provided'}\nLocation: ${data.location||'Not provided'}\nProject date: ${data.project_date||'Not provided'}\nCrane type: ${data.crane_type||'Not provided'}\nRequired capacity: ${data.capacity||'Not provided'}\nRequirements: ${data.requirements||'Not provided'}\nMessage: ${data.message||'None'}`;}
function whatsappUrl(data){return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message(data))}`;}
function refreshActions(){if(!form||!whatsappLink)return;whatsappLink.href=whatsappUrl(getData());}
if(form){
  form.addEventListener('input',refreshActions);
  form.addEventListener('change',refreshActions);
  refreshActions();
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const url=whatsappUrl(getData());
    if(notice)notice.textContent='Your enquiry is ready to send via WhatsApp.';
    window.open(url,'_blank','noopener,noreferrer');
  });
}

const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lightboxImage');
const projectGrid=document.getElementById('projectGrid');
if(lightbox&&lbImg&&projectGrid){
  projectGrid.addEventListener('click',e=>{
    const tile=e.target.closest('[data-image]');
    if(!tile)return;
    lbImg.src=tile.dataset.image;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
}
function closeLightbox(){
  if(lightbox&&lbImg){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src='';
  }
}
document.getElementById('lightboxClose')?.addEventListener('click',closeLightbox);
if(lightbox)lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
