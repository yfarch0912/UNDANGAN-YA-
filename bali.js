/* Bali Pastel Romance — engine (terpisah dari konten di bali-config.js) */
(function(){
function init(){
"use strict";
var C = window.BALI_CONFIG; if(!C) return;
var $ = function(s){ return document.querySelector(s); };
var $$ = function(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); };
var esc = function(t){ return String(t||"").replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); };
var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- panel backgrounds (satu dunia visual yang menyambung) --- */
$$(".sec").forEach(function(sec){
  var key = sec.getAttribute("data-panel"), bg = sec.querySelector(".sec-bg");
  var src = C.panels[key === "gateflip" ? "gate" : key]; if(!bg || !src) return;
  bg.style.backgroundImage = "url('" + src + "')";
  if(key === "gateflip") bg.style.transform = "scaleX(-1)";
  bg.setAttribute("data-base-transform", key === "gateflip" ? "scaleX(-1)" : "");
});
var cover = $("#cover");
var ICONS = "assets/undangya/bali-pastel/icons/icon-";
var OPEN = "assets/undangya/bali-pastel/opening/";

/* --- teks dari config --- */
var names = C.couple.bride.nick + " & " + C.couple.groom.nick;
$("#coverNames").textContent = names; $("#heroNames").textContent = names; $("#closingNames").textContent = names;
$("#coverDate").textContent = C.dateLabel; $("#heroDate").textContent = C.dateLabel;
$("#greetingText").textContent = C.greetingText;
$("#quoteText").textContent = "“" + C.quote.text + "”"; $("#quoteSource").textContent = C.quote.source;
function coupleCard(el, p, role, childWord){
  el.innerHTML = '<div class="avatar">' + (p.photo ? '<img src="'+esc(p.photo)+'" alt="Foto contoh '+esc(role.toLowerCase())+' (pasangan fiktif)">' : esc(p.nick.charAt(0))) + '</div>' +
    '<p class="eyebrow">'+esc(role)+'</p><h3 style="font-family:\'Cormorant Garamond\',serif;font-size:1.45rem;color:var(--mauve-dark);margin:.2rem 0">'+esc(p.full)+'</h3>' +
    '<p style="font-size:.88rem">'+childWord+' dari<br>'+esc(p.father)+' &amp; '+esc(p.mother)+'<br><span style="opacity:.8">'+esc(p.origin)+'</span></p>';
}
if(C.couple.couplePhoto){ var cp = $("#heroPhoto"); if(cp) cp.src = C.couple.heroPhoto || C.couple.couplePhoto; var cvp = $("#coverPhoto"); if(cvp) cvp.src = C.couple.couplePhoto; }
coupleCard($("#brideCard"), C.couple.bride, "Mempelai Wanita", "Putri");
coupleCard($("#groomCard"), C.couple.groom, "Mempelai Pria", "Putra");
$("#storyList").innerHTML = C.story.map(function(s){
  return '<div class="veil story-item rv"><span class="year">'+esc(s.year)+'</span><h3 style="margin:.15rem 0;font-family:\'Cormorant Garamond\',serif;color:var(--mauve-dark)">'+esc(s.title)+'</h3><p style="margin:.2rem 0;font-size:.93rem">'+esc(s.text)+'</p></div>';
}).join("");
$("#eventList").innerHTML = C.events.map(function(e){
  return '<div class="veil event-card rv"><p class="eyebrow">'+esc(e.name)+'</p><h3>'+esc(e.title)+'</h3><p>'+esc(e.dateLabel)+'<br>'+esc(e.time)+'</p><p><b>'+esc(e.venue)+'</b><br><span style="font-size:.86rem">'+esc(e.address)+'</span></p>' +
  '<a class="btn ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(e.mapsQuery)+'"><img class="ic" src="'+ICONS+'pin.webp" alt="">Lihat Lokasi</a></div>';
}).join("");
var ev0 = C.events[0];
$("#locVenue").textContent = ev0.venue; $("#locAddress").textContent = ev0.address;
$("#mapsBtn").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev0.mapsQuery);
$("#giftInfo").innerHTML = esc(C.gift.bank) + " · <b id='giftNum'>" + esc(C.gift.number) + "</b><br>a.n. " + esc(C.gift.holder) + " (data contoh)";
$("#rsvpDeadline").textContent = C.rsvp.deadlineLabel;

/* --- tamu ?to= --- */
var guest = new URLSearchParams(location.search).get("to");
if(guest){ $("#guestName").textContent = guest; $("#fNama").value = guest; }

/* --- pembuka living scene: rakitan masuk berjenjang + buka --- */
var opened = false, anims = [];
var canAnimate = !reduced && typeof Element !== "undefined" && !!Element.prototype.animate;
function A(el, frames, opts){
  if(!el || !canAnimate) return;
  try{ anims.push(el.animate(frames, opts)); }catch(e){}
}
function finishOpen(){
  cover.classList.add("opened"); $("#main").hidden = false;
  $("#bottomnav").classList.add("show");
  /* nav bawah sembunyi saat scroll ke bawah, muncul saat scroll ke atas */
  var lastY = window.scrollY;
  window.addEventListener("scroll", function(){
    var y = window.scrollY, nav = $("#bottomnav");
    if (y > 320 && y > lastY + 4) nav.classList.add("nav-hide");
    else if (y < lastY - 4 || y <= 320) nav.classList.remove("nav-hide");
    lastY = y;
  }, { passive: true });
  document.body.classList.add("js-anim"); initReveal(); startPetals(); initNavSpy();
  setTimeout(function(){ cover.style.display = "none"; }, 1000);
}
function spawnBurst(){
  var box = $("#petalBurst"); if(!box || !canAnimate) return;
  var srcs = [OPEN + "petal-pink.webp", OPEN + "petal-lilac.webp", OPEN + "petal-duo.webp"];
  for(var i = 0; i < 14; i++){
    var p = document.createElement("img"); p.src = srcs[i % 3]; p.alt = "";
    p.style.width = (16 + Math.random() * 20) + "px"; box.appendChild(p);
    var ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 170;
    A(p, [
      { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
      { transform: "translate(" + (Math.cos(ang) * dist - 13) + "px," + (Math.sin(ang) * dist * .7 + 120) + "px) rotate(" + (Math.random() * 320 - 160) + "deg)", opacity: 0 }
    ], { duration: 1500 + Math.random() * 900, delay: 100 + Math.random() * 350, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" });
  }
}
function playIntro(){
  if(!canAnimate) return;
  A($(".sc-bale"), [
    { opacity: 0, transform: "translateX(-50%) translateY(34px)" },
    { opacity: 1, transform: "translateX(-50%) translateY(0)" }
  ], { duration: 1150, delay: 250, easing: "cubic-bezier(.25,.8,.3,1)", fill: "backwards" });
  A($(".sc-arch"), [
    { opacity: 0, transform: "translateX(-50%) scale(1.05)" },
    { opacity: 1, transform: "translateX(-50%) scale(1)" }
  ], { duration: 1250, delay: 500, easing: "ease-out", fill: "backwards" });
  $$(".sc-flora, .sc-bouq").forEach(function(el, i){
    A(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 750 + i * 160, fill: "backwards" });
  });
  A($("#coverTitle"), [
    { opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }
  ], { duration: 850, delay: 1450, easing: "ease-out", fill: "backwards" });
  A($("#coverPhotoFig"), [
    { opacity: 0, transform: "translateY(22px) scale(.94)" }, { opacity: 1, transform: "translateY(0) scale(1)" }
  ], { duration: 900, delay: 1750, easing: "cubic-bezier(.25,.8,.3,1)", fill: "backwards" });
  A($("#coverMeta"), [
    { opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }
  ], { duration: 850, delay: 2100, easing: "ease-out", fill: "backwards" });
}
playIntro();
$("#openBtn").addEventListener("click", function(){
  if(opened) return; opened = true;
  spawnBurst();
  if(canAnimate){
    A($("#scene"), [{ transform: "scale(1)" }, { transform: "scale(1.16)" }], { duration: 950, easing: "ease-in", fill: "forwards" });
    A($(".cover-ui"), [{ opacity: 1 }, { opacity: 0 }], { duration: 550, fill: "forwards" });
    setTimeout(finishOpen, 980);
  } else { finishOpen(); }
});
var replayBtn = $("#replayBtn");
if(replayBtn) replayBtn.addEventListener("click", function(){
  anims.forEach(function(a){ try{ a.cancel(); }catch(e){} }); anims = [];
  var box = $("#petalBurst"); if(box) box.innerHTML = "";
  cover.style.display = ""; cover.classList.remove("opened");
  $("#main").hidden = true; $("#bottomnav").classList.remove("show");
  opened = false; window.scrollTo(0, 0);
  playIntro();
});

/* --- countdown: satu sumber kebenaran = events di config (WITA +08:00) --- */
var evStart = new Date(C.events[0].startISO).getTime();
var evEnd = new Date(C.events[C.events.length - 1].endISO).getTime();
function cdState(now){
  if(isNaN(evStart) || isNaN(evEnd)) return { mode: "invalid" };
  if(now < evStart){
    var diff = evStart - now;
    return { mode: "before", d: Math.floor(diff/864e5), h: Math.floor(diff/36e5)%24, m: Math.floor(diff/6e4)%60, s: Math.floor(diff/1e3)%60 };
  }
  if(now <= evEnd) return { mode: "during" };
  return { mode: "after" };
}
window.BALI_CD_STATE = cdState; /* diekspos untuk pengujian */
var cdTimer = null;
function tick(){
  var st = cdState(Date.now()), cd = $("#countdown"), msg = $("#cdStatus");
  if(st.mode === "before"){
    cd.hidden = false; msg.hidden = true;
    cd.querySelector("[data-cd=d]").textContent = st.d; cd.querySelector("[data-cd=h]").textContent = st.h;
    cd.querySelector("[data-cd=m]").textContent = st.m; cd.querySelector("[data-cd=s]").textContent = st.s;
    return;
  }
  cd.hidden = true; msg.hidden = false;
  msg.textContent = st.mode === "during" ? "Hari bahagia telah tiba" :
    st.mode === "after" ? "Acara telah berlangsung — terima kasih atas doa restunya" :
    C.dateLabel;
  if(st.mode === "after" || st.mode === "invalid"){ clearInterval(cdTimer); }
}
tick(); cdTimer = setInterval(tick, 1000);

/* --- simpan tanggal (.ics nyata) --- */
function icsDate(iso){ var d = new Date(iso); return isNaN(d) ? "" : d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""); }
$("#icsBtn").addEventListener("click", function(){
  var lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//UndangYa//BaliPastel//ID"];
  C.events.forEach(function(e){
    lines.push("BEGIN:VEVENT","UID:"+e.key+"@undangya","DTSTAMP:"+icsDate(new Date().toISOString()),
      "DTSTART:"+icsDate(e.startISO),"DTEND:"+icsDate(e.endISO),
      "SUMMARY:"+e.title+" — "+names,"LOCATION:"+e.venue+", "+e.address,
      "BEGIN:VALARM","TRIGGER:-P1D","ACTION:DISPLAY","END:VALARM","END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([lines.join("\r\n")], {type:"text/calendar"}));
  a.download = "undangan-fahrezzi-meyzsa.ics"; document.body.appendChild(a); a.click(); a.remove();
});

/* --- galeri + lightbox --- */
var gal = C.gallery, gi = 0;
$("#galGrid").innerHTML = gal.map(function(g,i){
  return '<figure data-i="'+i+'" tabindex="0" role="button" aria-label="Perbesar ilustrasi '+esc(g.cap)+'"><img loading="lazy" decoding="async" src="'+esc(g.src)+'" alt="Ilustrasi '+esc(g.cap)+'" style="object-position:'+esc(g.pos||"50% 50%")+'"><figcaption>'+esc(g.cap)+'</figcaption></figure>';
}).join("");
var lb = $("#lightbox"), lbReturn = null;
function showLb(i){ gi = (i+gal.length)%gal.length; $("#lbImg").src = gal[gi].src; $("#lbImg").style.objectPosition = gal[gi].pos || "50% 50%"; $("#lbCap").textContent = gal[gi].cap; if(!lb.classList.contains("show")){ lbReturn = document.activeElement; } lb.classList.add("show"); $("#lbClose").focus(); }
function closeLb(){ lb.classList.remove("show"); if(lbReturn && lbReturn.focus) lbReturn.focus(); }
$$("#galGrid figure").forEach(function(f){ f.addEventListener("click", function(){ showLb(+f.getAttribute("data-i")); }); f.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); showLb(+f.getAttribute("data-i")); } }); });
$("#lbClose").addEventListener("click", closeLb);
$("#lbPrev").addEventListener("click", function(){ showLb(gi-1); });
$("#lbNext").addEventListener("click", function(){ showLb(gi+1); });
document.addEventListener("keydown", function(e){ if(!lb.classList.contains("show")) return;
  if(e.key === "Escape") closeLb(); if(e.key === "ArrowRight") showLb(gi+1); if(e.key === "ArrowLeft") showLb(gi-1); });

/* --- penanda section aktif pada navigasi bawah (scroll-spy berbasis titik tengah layar) --- */
function initNavSpy(){
  var links = {}; $$("#bottomnav a").forEach(function(a){ links[a.getAttribute("href").slice(1)] = a; });
  var ids = Object.keys(links), ticking = false;
  function update(){
    ticking = false;
    var mid = window.innerHeight * 0.5, active = null;
    ids.forEach(function(id){
      var s = document.getElementById(id); if(!s) return;
      var r = s.getBoundingClientRect();
      if(r.top <= mid && r.bottom >= mid) active = id; /* tumpang tindih: section terakhir menang */
    });
    if(!active) return;
    ids.forEach(function(k){ links[k].classList.remove("active"); links[k].removeAttribute("aria-current"); });
    links[active].classList.add("active"); links[active].setAttribute("aria-current", "true");
  }
  window.addEventListener("scroll", function(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* --- RSVP / buku tamu (localStorage, statistik jujur dari 0) --- */
var KEY = C.rsvp.storageKey, wishes = [];
try{ wishes = JSON.parse(localStorage.getItem(KEY) || "[]"); }catch(e){ wishes = []; }
var shown = 5;
function stats(){
  $("#statHadir").textContent = wishes.filter(function(w){return w.status==="hadir";}).length;
  $("#statTidak").textContent = wishes.filter(function(w){return w.status==="tidak";}).length;
  $("#statTotal").textContent = wishes.length;
}
function renderWishes(){
  var list = wishes.slice().reverse();
  $("#wishList").innerHTML = list.length ? list.slice(0, shown).map(function(w){
    var badge = w.status==="hadir" ? '<img class="badge-ic" src="'+ICONS+'check.webp" alt="">Hadir' : (w.status==="tidak" ? '<img class="badge-ic" src="'+ICONS+'bud.webp" alt="">Berhalangan' : '<img class="badge-ic" src="'+ICONS+'leaf.webp" alt="">Belum memastikan');
    return '<div class="wish"><b>'+esc(w.nama)+'</b> <span style="font-size:.75rem">'+badge+'</span><p style="margin:.25rem 0;font-size:.9rem">'+esc(w.pesan)+'</p></div>';
  }).join("") : '<p style="font-size:.88rem;opacity:.8">Belum ada ucapan. Jadilah yang pertama memberi doa.</p>';
  $("#loadMore").hidden = list.length <= shown; stats();
}
renderWishes();
$("#loadMore").addEventListener("click", function(){ shown += 5; renderWishes(); });
$("#fPesan").addEventListener("input", function(){ $("#charCount").textContent = this.value.length; });
$("#rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();
  var nama = $("#fNama").value.trim(), status = $("#fStatus").value, pesan = $("#fPesan").value.trim(), msg = $("#formMsg");
  if(!nama || !pesan){ msg.textContent = "Mohon isi nama dan ucapan terlebih dahulu."; msg.className = "form-msg err"; return; }
  if(wishes.some(function(w){ return w.nama.toLowerCase() === nama.toLowerCase() && w.pesan === pesan; })){
    msg.textContent = "Ucapan yang sama sudah tercatat — terima kasih, tidak perlu mengirim dua kali."; msg.className = "form-msg err"; return;
  }
  wishes.push({ nama: nama, status: status, pesan: pesan, at: Date.now() });
  try{ localStorage.setItem(KEY, JSON.stringify(wishes)); }catch(err){}
  shown = Math.max(shown, 5); renderWishes();
  msg.textContent = "Matur suksma, " + nama + "! Ucapanmu tersimpan (mode demo, di perangkat ini)."; msg.className = "form-msg";
  $("#fPesan").value = ""; $("#charCount").textContent = "0";
});

/* --- salin rekening --- */
$("#copyBtn").addEventListener("click", function(){
  var num = C.gift.number, done = function(ok){ $("#copyMsg").textContent = ok ? "Nomor tersalin: " + num : "Gagal menyalin otomatis — nomornya: " + num; };
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(num).then(function(){done(true);}, function(){done(false);}); }
  else{ var t = document.createElement("textarea"); t.value = num; document.body.appendChild(t); t.select(); try{ done(document.execCommand("copy")); }catch(e){ done(false); } t.remove(); }
});

/* --- reveal + parallax ringan --- */
function initReveal(){
  var els = $$(".rv");
  if(reduced || !("IntersectionObserver" in window)){ els.forEach(function(el){ el.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function(entries){ entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } }); }, {threshold:.12});
  els.forEach(function(el){ io.observe(el); });
}
if(!reduced){
  var ticking = false;
  window.addEventListener("scroll", function(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(function(){
      $$(".sec").forEach(function(sec){
        var r = sec.getBoundingClientRect(); if(r.bottom < 0 || r.top > innerHeight) return;
        var bg = sec.querySelector(".sec-bg"); if(!bg) return;
        var off = Math.max(-16, Math.min(16, (r.top / innerHeight) * -16));
        bg.style.transform = (bg.getAttribute("data-base-transform") || "") + " translateY(" + off + "px)";
      });
      ticking = false;
    });
  }, {passive:true});
}
function startPetals(){
  if(reduced || document.querySelector("img.petal")) return;
  var srcs = [OPEN + "petal-pink.webp", OPEN + "petal-lilac.webp", OPEN + "petal-duo.webp"];
  for(var i = 0; i < 6; i++){
    var p = document.createElement("img"); p.className = "petal"; p.alt = "";
    p.src = srcs[i % 3];
    p.style.left = (Math.random()*96) + "vw";
    p.style.width = (14 + Math.random()*14) + "px";
    p.style.animationDuration = (11 + Math.random()*9) + "s";
    p.style.animationDelay = (-Math.random()*14) + "s";
    document.body.appendChild(p);
  }
}

/* --- musik latar: file bersama Petals on the Stone Floor --- */
var playing = false;
function bgmEl(){ return document.getElementById("bgmShared"); }
function syncMusicBtn(){ var mb = $("#musicBtn"); if(!mb) return; mb.classList.toggle("playing", playing); mb.setAttribute("aria-pressed", playing ? "true" : "false"); }
function bindBgm(){ var a = bgmEl(); if(!a || a.__boundBgm) return; a.__boundBgm = true; a.addEventListener("play", function(){ playing = true; syncMusicBtn(); }); a.addEventListener("pause", function(){ playing = false; syncMusicBtn(); }); }
bindBgm();
function startMusic(){
  if(playing || reduced) return;
  var a = bgmEl(); if(!a) return; bindBgm();
  try{ var p = a.play(); if(p && p.catch) p.catch(function(){}); }catch(e){ /* audio tidak tersedia — diam */ }
}
$("#musicBtn").addEventListener("click", function(){
  if(playing){ var a = bgmEl(); if(a) a.pause(); }
  else startMusic();
});
}
if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
