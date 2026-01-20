import { points } from "./liste_img_lieux.js";


// ===============================
// 1) CRÉATION DE LA CARTE
// ===============================

const map = L.map("map").setView([23.6345, -102.5528], 5);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19
}).addTo(map);


// ===============================
// 2) CRÉATION DES MARQUEURS
// ===============================

const markers = []; // pour filtrage par semaine

points.forEach(point => {

  // Image principale (pour icône photo)
  const mainImage = Array.isArray(point.img)
    ? point.img[0]
    : (point.img || "images/default-icon.png");

  // Icône caméra si vidéo, sinon photo
  const iconUrl = point.video
    ? "images/icon-video.png"
    : mainImage;

  const customIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: "custom-marker"
  });

  // HTML images (1 ou plusieurs)
  const imagesHtml = Array.isArray(point.img)
    ? `<div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:6px;">
         ${point.img.map(u => `<img src="${u}" style="width:48%; max-width:180px; border-radius:10px;">`).join("")}
       </div>`
    : `<div style="text-align:center;">
         <img src="${mainImage}" width="100%" style="margin-top:6px; border-radius:10px;">
       </div>`;

  // Contenu popup
  const popupHtml = `
    <div style="max-width: 280px;">
      <h3>${point.name}</h3>
      <p>${point.desc}</p>
      ${
        point.video
          ? `<video width="100%" controls style="margin-top:6px; border-radius:10px;">
               <source src="${point.video}" type="video/mp4">
             </video>`
          : imagesHtml
      }
    </div>
  `;

  // Création du marqueur
  const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);
  marker.bindPopup(popupHtml);

  // Stock pour filtrage
  markers.push({ marker, point });

  // Clic sur marqueur → mise à jour timeline
  marker.on("click", () => {
    if (point.date && window.setActiveDate) {
      window.setActiveDate(point.date);
    }
  });
});


// ===============================
// 3) TIMELINE (lundis + filtre)
// ===============================

function parseYMD(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function toYMD(dateUTC) {
  return dateUTC.toISOString().slice(0, 10);
}
function mondayOf(dateUTC) {
  const d = new Date(dateUTC);
  const day = d.getUTCDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}
function addDaysUTC(dateUTC, days) {
  const d = new Date(dateUTC);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}
function formatFR(ymd) {
  return parseYMD(ymd).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

const timelineEl = document.getElementById("timeline");
const allDates = points.map(p => p.date).filter(Boolean).sort();

if (timelineEl && allDates.length) {

  const minDate = parseYMD(allDates[0]);
  const maxDate = parseYMD(allDates[allDates.length - 1]);
  const minT = minDate.getTime();
  const maxT = maxDate.getTime();

  function dateToPercent(ymd) {
    const t = parseYMD(ymd).getTime();
    return ((t - minT) / (maxT - minT)) * 100;
  }

  // éléments visuels
  const highlight = document.createElement("div");
  highlight.className = "timeline-highlight";
  timelineEl.appendChild(highlight);

  const dot = document.createElement("div");
  dot.className = "timeline-dot";
  timelineEl.appendChild(dot);

  // lundis
  let cur = mondayOf(minDate);
  const mondays = [];
  while (cur <= maxDate) {
    mondays.push(toYMD(cur));
    cur = addDaysUTC(cur, 7);
  }

  // filtre semaine
  function applyWeekFilter(weekStartYMD) {
    const start = parseYMD(weekStartYMD);
    const end = addDaysUTC(start, 7);

    const visible = [];

    markers.forEach(({ marker, point }) => {
      const d = parseYMD(point.date);
      const inWeek = d >= start && d < end;

      if (inWeek) {
        if (!map.hasLayer(marker)) marker.addTo(map);
        visible.push(marker);
      } else {
        if (map.hasLayer(marker)) map.removeLayer(marker);
      }
    });

    if (visible.length) {
      const group = L.featureGroup(visible);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }

  // mise à jour complète
  function setActiveDate(dateYMD) {
    const d = parseYMD(dateYMD);
    const mon = mondayOf(d);
    const nextMon = addDaysUTC(mon, 7);

    const start = dateToPercent(toYMD(mon));
    const end = dateToPercent(toYMD(nextMon));
    const dayPos = dateToPercent(dateYMD);

    highlight.style.left = `${start}%`;
    highlight.style.width = `${end - start}%`;
    dot.style.left = `${dayPos}%`;

    applyWeekFilter(toYMD(mon));
  }

  window.setActiveDate = setActiveDate;

  // création repères lundis
  mondays.forEach(ymd => {
    const left = dateToPercent(ymd);

    const tick = document.createElement("div");
    tick.className = "timeline-tick";
    tick.style.left = `${left}%`;

    const label = document.createElement("div");
    label.className = "timeline-label";
    label.style.left = `${left}%`;
    label.textContent = formatFR(ymd);

    const onClick = () => setActiveDate(ymd);
    tick.onclick = onClick;
    label.onclick = onClick;

    timelineEl.appendChild(tick);
    timelineEl.appendChild(label);
  });

  setActiveDate(allDates[0]);
}


// ===============================
// 4) PARCOURS
// ===============================

const latlngs = points.map(p => [p.lat, p.lng]);

const parcours = L.polyline(latlngs, {
  color: "black",
  weight: 3,
  dashArray: "5, 10",
  opacity: 0.7
}).addTo(map);
map.fitBounds(parcours.getBounds());
