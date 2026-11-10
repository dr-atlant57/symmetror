/* Progressive enhancement for SYMMETROR video placeholders. No autoplay. */
(function(){
  "use strict";
  const manifest = window.SYMMETROR_VIDEOS || {};
  function render(url,host){
    let u;
    try {u=new URL(url); if(u.protocol!=="https:")return;} catch(_){return;}
    const youtube=(u.hostname==="youtube.com"||u.hostname==="www.youtube.com")?u.searchParams.get("v"):(u.hostname==="youtu.be"?u.pathname.slice(1):null);
    let v;
    if(youtube && /^[\w-]{11}$/.test(youtube)){
      v=document.createElement("iframe");v.src="https://www.youtube-nocookie.com/embed/"+youtube;
      v.allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";v.allowFullscreen=true;
    }else if(["vimeo.com","www.vimeo.com"].includes(u.hostname) && /^\/\d+$/.test(u.pathname)){
      v=document.createElement("iframe");v.src="https://player.vimeo.com/video/"+u.pathname.slice(1);v.allowFullscreen=true;
    }else if(u.pathname.toLowerCase().endsWith(".mp4")){
      v=document.createElement("video");v.controls=true;v.preload="metadata";v.src=u.href;
    }else {return;}
    v.title="Видео SYMMETROR";v.loading="lazy";v.className="video-live26";host.replaceChildren(v);host.classList.add("has-video26");
  }
  document.querySelectorAll("[data-video-key]").forEach(host=>{
    const u=manifest[host.dataset.videoKey];if(u)render(u,host);else host.hidden=true;
  });
})();
