/* INGENIOTECH — mejoras: tema claro/oscuro, barra inferior, revelado al desplazar, progreso */
(()=>{
  const d=document,r=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  r.classList.add('js');

  /* Tema (el valor inicial lo pone el script del <head> para evitar parpadeo) */
  const btn=d.querySelector('.theme-toggle'),meta=d.querySelector('meta[name=theme-color]');
  const setTheme=(t,save)=>{
    r.dataset.theme=t;
    if(btn){btn.setAttribute('aria-pressed',t==='light');btn.setAttribute('aria-label',t==='light'?'Cambiar a modo oscuro':'Cambiar a modo claro')}
    if(meta)meta.setAttribute('content',t==='light'?'#f4f7fb':'#030303');
    if(save){try{localStorage.setItem('it-theme',t)}catch(e){}}
  };
  setTheme(r.dataset.theme==='light'?'light':'dark');
  if(btn)btn.addEventListener('click',()=>{
    r.classList.add('tt');setTheme(r.dataset.theme==='light'?'dark':'light',true);setTimeout(()=>r.classList.remove('tt'),450);
  });


  /* Barra de progreso de lectura */
  const bar=d.createElement('div');bar.className='progress';bar.setAttribute('aria-hidden','true');d.body.prepend(bar);
  const fl=d.querySelector('.social-float-container');
  let tick=false;
  const upd=()=>{const h=r.scrollHeight-innerHeight;r.style.setProperty('--p',h>0?Math.min(scrollY/h,1):0);if(fl)fl.classList.toggle('on',scrollY>240);tick=false};
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();

  /* Revelado escalonado: una sola vez por elemento */
  if(reduce||!('IntersectionObserver' in window))return;
  const sel='.b-title,.rule,.b-intro,.fx-card,.cliente,.b-card,.why li,.chips li,.steps li,.counter,.xcard,.gitem,.ccard,.cform,.fx-oferta,.cta,.tcenter,.pbanner .container>*,.abanner .container>*,.marquee';
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target;
    el.classList.add('in');
    setTimeout(()=>{el.removeAttribute('data-r');el.classList.remove('in');el.style.removeProperty('--d')},1000+parseInt(el.style.getPropertyValue('--d')||0));
  }),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  d.querySelectorAll(sel).forEach(el=>{
    if(el.closest('.fx-hero,.phero,header.site-header'))return;
    const i=[...el.parentElement.children].filter(c=>c.matches(sel)).indexOf(el);
    el.dataset.r='';el.style.setProperty('--d',Math.min(Math.max(i,0),6)*70+'ms');io.observe(el);
  });
})();
