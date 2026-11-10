// /assets/site.js
document.addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q');
    if (q) {
        const item = q.closest('.faq-item');
        item.classList.toggle('open');
    }
});

// Audio playlist switcher (Cholpon-Ata page)
function initAudioPlaylist(rootId) {
    const root = document.getElementById(rootId);
    if (!root) return;
    const audio = root.querySelector('audio');
    const nowPlaying = root.querySelector('.now-playing');
    root.querySelectorAll('.playlist li[data-src]').forEach((li) => {
        li.addEventListener('click', () => {
            if (li.classList.contains('disabled')) return;
            root.querySelectorAll('.playlist li').forEach((x) => x.classList.remove('active'));
            li.classList.add('active');
            audio.src = li.getAttribute('data-src');
            nowPlaying.textContent = '♪ ' + li.getAttribute('data-title');
            audio.play().catch(() => {});
        });
    });
}
window.initAudioPlaylist = initAudioPlaylist;


/* 2026: contextual self-check and shared anatomical glossary. */
(function(){
"use strict";
const home=location.pathname==="/"||location.pathname==="/index.html";
function initCheck(){
 if(home)return;
 document.querySelectorAll(".self-recognition26").forEach(block=>{
  if(block.closest(".self-disclosure26"))return;
  const box=document.createElement("details");box.className="self-disclosure26";
  const title=document.createElement("summary");
  title.innerHTML='<span aria-hidden="true" class="self-icon26">◉</span><span><strong>Проверьте симметрию мышц самостоятельно</strong><small>Шея · затылок · тело — раскрыть упражнение</small></span><span aria-hidden="true" class="self-toggle26">+</span>';
  block.parentNode.insertBefore(box,block);box.append(title,block);
  box.addEventListener("toggle",()=>{title.querySelector("small").textContent=box.open?"Свернуть упражнение":"Шея · затылок · тело — раскрыть упражнение";});
 });
}
const drawing='<svg class="anatomy-illustration26" viewBox="0 0 500 500" role="img" aria-label="Схема: череп C0 над атлантом C1, ниже позвонки C2, C3, C4, C5" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bone26" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f8faef"/><stop offset="1" stop-color="#94b7ac"/></linearGradient></defs><rect width="500" height="500" rx="22" fill="#102027"/><g fill="none" stroke="#7cb6a5" opacity=".15"><path d="M30 80H470M30 160H470M30 240H470M30 320H470M30 400H470M80 25V475M160 25V475M240 25V475M320 25V475M400 25V475"/></g><path d="M116 184C81 159 81 98 114 60C141 26 209 16 260 37C315 61 335 113 312 166L285 202L261 213L245 198L221 208L204 228L173 212L146 223L130 199Z" fill="url(#bone26)" stroke="#e7faf1" stroke-width="3"/><path d="M251 156Q284 148 305 165L288 179H258Z" fill="#275159"/><g fill="#e0f1e7" stroke="#aacbc0" stroke-width="3"><path d="M158 237Q190 227 223 234Q251 229 275 240L273 260Q244 267 221 263Q185 268 157 254Z"/><path d="M159 281Q191 271 225 277Q253 273 276 283L271 306Q240 310 224 306Q186 310 158 302Z"/><path d="M163 323Q194 314 224 321Q249 316 272 326L270 347Q244 354 222 351Q193 356 163 343Z"/><path d="M166 363Q192 356 224 360Q255 355 274 367L273 390Q242 397 221 393Q193 398 164 387Z"/><path d="M169 409Q193 401 226 407Q252 403 273 413L271 435Q242 443 221 438Q188 442 168 432Z"/></g><ellipse cx="220" cy="232" rx="112" ry="53" fill="none" stroke="#c7f47c" stroke-width="4" stroke-dasharray="8 7"/><g stroke="#9ed9d4" stroke-width="2"><path d="M321 146H351M281 246H351M283 294H351M280 336H351M281 379H351M282 424H351"/></g><g font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#f4f7f1"><text x="360" y="152">C0</text><text x="360" y="251" fill="#c7f47c">C1</text><text x="360" y="300">C2</text><text x="360" y="342">C3</text><text x="360" y="385">C4</text><text x="360" y="430">C5</text></g><g font-family="Arial,sans-serif" font-size="13" fill="#b7cec4"><text x="360" y="169">череп</text><text x="360" y="269">атлант</text><text x="24" y="480">Обведено соединение головы с атлантом (C0–C1)</text></g></svg>';
function initAnatomy(){
 const root=document.querySelector("main");if(!root)return;
 const modal=document.createElement("dialog");modal.className="anatomy-dialog26";
 modal.setAttribute("aria-label","Анатомическое пояснение C0, C1, C2");
 modal.innerHTML='<div class="anatomy-dialog-body26"><div class="anatomy-dialog-head26"><span>SYMMETROR / АНАТОМИЯ</span><button type="button" aria-label="Закрыть" class="anatomy-close26">×</button></div><h2>Что такое <em>C0, C1 и C2?</em></h2><div class="anatomy-content26"><div class="anatomy-visual26">'+drawing+'</div><div class="anatomy-legend26"><p><strong>C0 — череп.</strong><br>Верхняя часть схемы, включая затылочную кость.</p><p><strong>C1 — атлант.</strong><br>Первый шейный позвонок непосредственно под черепом.</p><p><strong>C2 — аксис.</strong><br>Второй шейный позвонок; ниже расположены C3, C4 и C5.</p><p class="anatomy-highlight26">Светящимся контуром выделена область <strong>C0–C1</strong>: положение головы относительно атланта — центральный ориентир авторской системы SYMMETROR.</p><a href="/anatomia/kraniovertebralny-perehod">Открыть подробную анатомию →</a></div></div><p class="anatomy-caption26">Упрощённая графическая схема; не диагностическое изображение и не масштабная анатомическая модель.</p></div>';
 document.body.append(modal);
 const close=()=>modal.close?modal.close():modal.removeAttribute("open");
 const open=()=>modal.showModal?modal.showModal():modal.setAttribute("open","");
 modal.querySelector(".anatomy-close26").addEventListener("click",close);
 modal.addEventListener("click",e=>{if(e.target===modal)close();});
 const pattern=/C0\s*[-–—/]\s*C1|C0\s+C1|C[0-5]|краниовертебральн(?:ый|ого|ому|ым|ом)\s+переход(?:а|е|у|ом)?/gi;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const targets=[];
 while(walker.nextNode()){
  const n=walker.currentNode;
  pattern.lastIndex=0;
  if(!pattern.test(n.nodeValue||""))continue;
  if(n.parentElement&&n.parentElement.closest("a,button,summary,script,style,textarea,select,option,code,pre,svg,[contenteditable]"))continue;
  targets.push(n);
 }
 targets.forEach(n=>{
  const source=n.nodeValue,frag=document.createDocumentFragment();
  let pos=0,m;pattern.lastIndex=0;
  while((m=pattern.exec(source))){
   if(m.index>pos)frag.append(document.createTextNode(source.slice(pos,m.index)));
   const b=document.createElement("button");b.type="button";b.className="anatomy-term26";
   b.textContent=m[0];b.title="Нажмите: графическая схема C0–C1";
   b.setAttribute("aria-label","Объяснить "+m[0]+" на схеме");b.addEventListener("click",open);
   frag.append(b);pos=m.index+m[0].length;
  }
  if(pos<source.length)frag.append(document.createTextNode(source.slice(pos)));
  n.replaceWith(frag);
 });
}
function init(){initCheck();initAnatomy();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
