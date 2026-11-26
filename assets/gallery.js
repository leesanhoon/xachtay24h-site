(()=>{const t=document.getElementById('track');if(!t)return;
const sl=[...t.children],n=sl.length,cnt=document.getElementById('cnt'),th=[...document.querySelectorAll('.th')];
const main=t.parentElement,pv=main.querySelector('.prev'),nx=main.querySelector('.next');let i=0;
const go=k=>{k=Math.max(0,Math.min(n-1,k));t.scrollTo({left:k*t.clientWidth,behavior:'smooth'})};
const upd=()=>{i=Math.round(t.scrollLeft/t.clientWidth);cnt.textContent=(i+1)+' / '+n;
 th.forEach((b,k)=>b.classList.toggle('on',k==i));if(th[i])th[i].scrollIntoView({block:'nearest',inline:'nearest'});
 if(pv){pv.disabled=i==0;nx.disabled=i==n-1}};
t.addEventListener('scroll',()=>{clearTimeout(t._s);t._s=setTimeout(upd,60)});
if(pv){pv.onclick=()=>go(i-1);nx.onclick=()=>go(i+1)}
th.forEach(b=>b.onclick=()=>go(+b.dataset.i));upd();
const lb=document.getElementById('lb'),li=document.getElementById('lbimg'),lc=document.getElementById('lbcnt');let j=0;
const show=k=>{j=(k+n)%n;li.classList.remove('z');li.src=sl[j].querySelector('img').src;lc.textContent=(j+1)+' / '+n};
sl.forEach((s,k)=>s.onclick=()=>{show(k);lb.hidden=false;document.body.style.overflow='hidden'});
const close=()=>{lb.hidden=true;document.body.style.overflow='';go(j)};
lb.querySelector('.lbx').onclick=close;lb.querySelector('.prev').onclick=e=>{e.stopPropagation();show(j-1)};
lb.querySelector('.next').onclick=e=>{e.stopPropagation();show(j+1)};
li.onclick=e=>{e.stopPropagation();li.classList.toggle('z')};lb.onclick=e=>{if(e.target==lb)close()};
let x0=null;lb.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',e=>{if(x0===null||li.classList.contains('z'))return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)show(j+(dx<0?1:-1));x0=null});
document.addEventListener('keydown',e=>{if(lb.hidden){if(e.key=='ArrowRight')go(i+1);if(e.key=='ArrowLeft')go(i-1);return}
 if(e.key=='Escape')close();if(e.key=='ArrowRight')show(j+1);if(e.key=='ArrowLeft')show(j-1)});
})();