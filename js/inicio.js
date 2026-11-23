document.addEventListener('DOMContentLoaded',()=>{
  /* Carrusel */
  const slides=[...document.querySelectorAll('.slide')],phrases=[...document.querySelectorAll('.phrase')],dotsBox=document.querySelector('.dots'),hero=document.querySelector('.fx-hero');
  let i=0,timer;
  const dots=slides.map((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Ir a la diapositiva '+(n+1));b.onclick=()=>{go(n);play()};dotsBox.appendChild(b);return b});
  const frame=document.querySelector('.fx-frame'),st=document.createElement('div');st.className='stories';st.setAttribute('role','tablist');
  const segs=slides.map((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Imagen '+(n+1));b.onclick=()=>{go(n);play()};st.appendChild(b);return b});
  if(frame)frame.appendChild(st);
  function go(n){i=(n+slides.length)%slides.length;[slides,phrases,dots,segs].forEach(a=>a.forEach((e,k)=>e.classList.toggle('is-active',k===i)));segs.forEach((e,k)=>e.classList.toggle('is-done',k<i))}
  function play(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>go(i+1),6500)}
  document.querySelector('.c-prev').onclick=()=>{go(i-1);play()};
  document.querySelector('.c-next').onclick=()=>{go(i+1);play()};
  hero.addEventListener('mouseenter',()=>clearInterval(timer));hero.addEventListener('mouseleave',play);
  let x0=null;hero.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  hero.addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50){go(i+(d<0?1:-1));play()}x0=null});
  go(0);play();

  /* Tarjeta de contacto: brillo + inclinación */
  const card=document.querySelector('.ccard');
  if(card&&matchMedia('(hover:hover)').matches){
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      card.style.setProperty('--mx',x+'px');card.style.setProperty('--my',y+'px');
      card.style.transform=`rotateY(${((x/r.width)-.5)*8}deg) rotateX(${-((y/r.height)-.5)*8}deg)`});
    card.addEventListener('pointerleave',()=>card.style.transform='');
  }
  /* Copiar */
  const toast=document.querySelector('.toast');
  document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async e=>{
    e.preventDefault();e.stopPropagation();
    try{await navigator.clipboard.writeText(b.dataset.copy)}catch(_){const t=document.createElement('textarea');t.value=b.dataset.copy;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
    toast.textContent='Copiado: '+b.dataset.copy;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}));
});
