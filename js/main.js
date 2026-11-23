document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-menu-wrapper');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isOpened);
            menuToggle.classList.toggle('is-active');
            navWrapper.classList.toggle('is-active');
            document.body.style.overflow = !isOpened ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('is-active');
                navWrapper.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }
});

/* Barra de navegación: se oculta al bajar y reaparece al subir + botón "volver arriba" */
(function(){
  const header=document.querySelector('.site-header'),up=document.querySelector('.subir');
  if(!header)return;
  let last=window.pageYOffset||0,ticking=false;
  function onScroll(){
    const y=window.pageYOffset||document.documentElement.scrollTop,menuOpen=document.body.style.overflow==='hidden';
    if(!menuOpen){
      if(y>last&&y>100)header.classList.add('ocultar');else header.classList.remove('ocultar');
    }
    if(up)up.classList.toggle('show',y>600);
    last=y<0?0:y;ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(onScroll);ticking=true}},{passive:true});
  if(up)up.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();
