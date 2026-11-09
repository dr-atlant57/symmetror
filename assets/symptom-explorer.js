/* Accessible interactive body zone selector; not a diagnostic tool. */
(function(){
 const explorer=document.getElementById("zone-explorer26");if(!explorer)return;
 const zones={
  occiput:{title:"Затылок и положение головы",text:"В модели SYMMETROR внимание начинается с положения головы относительно позвоночника и работы подзатылочных мышц. Похожие ощущения имеют разные причины: изучите анатомию и связанные состояния.",links:[["Боль в затылке","/simptomy/golovnaya-bol"],["Головокружение и шум","/simptomy/shum-v-ushah"],["Анатомия соединения головы и шеи","/anatomia/kraniovertebralny-perehod"]]},
  neck:{title:"Шея и плечевой пояс",text:"Напряжение, ограничение поворота головы, хруст и ощущение тяжести — повод посмотреть на движение и мышечные компенсации. Длительные или усиливающиеся симптомы требуют профессиональной оценки.",links:[["Боль и хруст в шее","/simptomy/hrust-v-shee"],["Онемение рук","/simptomy/onemenie-ruk"],["Метод SYMMETROR","/about"]]},
  pelvis:{title:"Поясница, таз и осанка",text:"По авторской модели изменение положения головы может сопровождаться компенсаторными изменениями ниже по телу. Структурные причины боли и перекоса нужно рассматривать отдельно.",links:[["Перекос таза и длина ног","/anatomia/perekos-taza-dlina-nog"],["Осанка и сколиоз","/simptomy/skolioz"],["Полная программа","/program.html"]]},
  feet:{title:"Стопы и опора",text:"Стопы — конечная опорная зона системы движения. Мы рассматриваем положение головы, корпуса и таза совместно, не ставя диагноз по выбору области.",links:[["От головы до стоп","/program.html"],["Перекос таза и длина ног","/anatomia/perekos-taza-dlina-nog"],["Связаться с практиком","/request.html"]]}
 };
 const buttons=[...explorer.querySelectorAll("[data-zone]")];const details=explorer.querySelector("[data-zone-details]");
 function select(k){
  const d=zones[k];if(!d)return;
  buttons.forEach(b=>{const active=b.dataset.zone===k;b.setAttribute("aria-pressed",String(active));b.classList.toggle("selected",active)});
  const title=document.createElement("h3");title.textContent=d.title;const p=document.createElement("p");p.textContent=d.text;
  const links=document.createElement("div");links.className="zone-links26";d.links.forEach(([label,url])=>{const a=document.createElement("a");a.href=url;a.textContent=label+" ↗";links.append(a)});
  details.replaceChildren(title,p,links);
 }
 buttons.forEach(b=>b.addEventListener("click",()=>select(b.dataset.zone)));
 select("occiput");
})();
