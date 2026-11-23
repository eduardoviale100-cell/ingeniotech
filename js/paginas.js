document.addEventListener('DOMContentLoaded',()=>{
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* Tarjetas desplegables */
  document.addEventListener('click',e=>{
    const h=e.target.closest('.xhead');if(!h)return;
    const c=h.closest('.xcard'),o=c.classList.toggle('open');h.setAttribute('aria-expanded',o);
  });

  /* Contadores animados */
  const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;io.unobserve(en.target);const el=en.target,end=+el.dataset.count,t0=performance.now();
    const step=t=>{const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)
  }),{threshold:.5}):null;
  $$('[data-count]').forEach(el=>io?io.observe(el):el.textContent=el.dataset.count+(el.dataset.suffix||''));

  /* Ventana de producto */
  const pm=$('#pmodal');
  if(pm){
    $$('.pcard').forEach(c=>{const open=()=>{const src=$('#'+c.dataset.target);$('.pbody',pm).innerHTML=src.innerHTML;pm.showModal()};c.addEventListener('click',open);c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
  }
  $$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d)d.close()});$$('.dclose',d).forEach(b=>b.onclick=()=>d.close())});

  /* Galería: ver más + ampliar imagen */
  const gg=$('#ggrid'),gl=$('#glight');
  if(gg){
    const ex=$$('.gitem.extra',gg),mb=$('#gmore');
    if(mb){if(!ex.length)mb.closest('.addbar').remove();else mb.onclick=()=>{const o=gg.classList.toggle('all');mb.textContent=o?'Ver menos':'Ver más';mb.setAttribute('aria-expanded',o)}}
    gg.addEventListener('click',e=>{const a=e.target.closest('.gitem');if(!a||!gl)return;e.preventDefault();const im=$('#glimg',gl);im.src=a.getAttribute('href');im.alt=a.dataset.alt||'';gl.showModal()});
  }

  /* Contacto: tarjeta con brillo/inclinación y copiar */
  const card=$('.ccard');
  if(card&&matchMedia('(hover:hover)').matches){
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;card.style.setProperty('--mx',x+'px');card.style.setProperty('--my',y+'px');card.style.transform=`rotateY(${((x/r.width)-.5)*8}deg) rotateX(${-((y/r.height)-.5)*8}deg)`});
    card.addEventListener('pointerleave',()=>card.style.transform='');
  }
  const toast=$('.toast');
  $$('.copy').forEach(b=>b.addEventListener('click',async e=>{
    e.preventDefault();e.stopPropagation();
    try{await navigator.clipboard.writeText(b.dataset.copy)}catch(_){const t=document.createElement('textarea');t.value=b.dataset.copy;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
    toast.textContent='Copiado: '+b.dataset.copy;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}));
});
