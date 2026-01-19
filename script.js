import { points } from "./liste_img_lieux.js";


// Création de la carte
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centré sur le Mexique

// fond de carte CartoDB Positron (clair et minimaliste)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);


points.forEach((point, index) => {

    // Image principale (pour icône et miniature)
    const mainImage = Array.isArray(point.img)
        ? point.img[0]
        : (point.img || 'images/default-icon.png');

    // Icône personnalisée
    let customIcon = L.icon({
        iconUrl: mainImage,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: 'custom-marker'
    });

    // Génération du HTML pour les images (1 ou plusieurs)
    const imagesHtml = Array.isArray(point.img)
        ? `<div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:6px;">
             ${point.img.map(u => `<img src="${u}" style="width:48%; max-width:180px; border-radius:10px;">`).join("")}
           </div>`
        : `<div style="text-align:center;">
             <img src="${mainImage}" width="100%" style="margin-top:6px; border-radius:10px;">
           </div>`;

    // Ajout du marqueur
    L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map)
        .bindPopup(`
            <div style="max-width: 280px;">
                <h3 style="margin-bottom: 5px;">${point.name}</h3>
                <p>${point.desc}</p>

                ${
                    point.video 
                    ? `<video width="100%" controls style="margin-top: 6px; border-radius: 10px;">
                        <source src="${point.video}" type="video/mp4">
                        Votre navigateur ne supporte pas la balise vidéo.
                      </video>` 
                    : imagesHtml
                }
            </div>
        `);
});

const timeline = document.getElementById('timeline');
const dateLabel = document.getElementById('date-label');
const gallery = document.getElementById('gallery');

// Récupérer toutes les dates uniques au format YYYY-MM-DD pour la timeline
const dates = [...new Set(points.map(p => {
  // Par exemple, si tu veux une date précise, tu peux la stocker dans l'objet point.
  // Pour l'exemple, je génère une date fictive ici (à adapter selon tes vraies données)
  // Ici je suppose que tes points ont un attribut "date" (sinon il faut l'ajouter)
  return p.date; 
}))];

// Trier les dates
dates.sort();

// Fonction pour convertir une date en position en % sur la timeline
function dateToPercent(dateStr) {
  const minDate = new Date(dates[0]).getTime();
  const maxDate = new Date(dates[dates.length -1]).getTime();
  const curDate = new Date(dateStr).getTime();
  return ((curDate - minDate) / (maxDate - minDate)) * 100;
}

// Construire la timeline avec des marqueurs pour chaque date unique
dates.forEach(dateStr => {
  const marker = document.createElement('div');
  marker.classList.add('timeline-marker');
  marker.style.position = 'absolute';
  marker.style.bottom = '0';
  marker.style.width = '2px';
  marker.style.height = '20px';
  marker.style.backgroundColor = '#666';
  marker.style.left = dateToPercent(dateStr) + '%';
  marker.title = new Date(dateStr).toLocaleDateString();

  timeline.appendChild(marker);
});

// Construire la galerie de miniatures cliquables
points.forEach((point, index) => {
  const thumb = document.createElement('img');
  thumb.src = point.img || 'images/default-icon.png';
  thumb.style.width = '80px';
  thumb.style.height = '60px';
  thumb.style.objectFit = 'cover';
  thumb.style.cursor = 'pointer';
  thumb.style.border = '2px solid transparent';
  thumb.dataset.date = point.date || '2024-05-01'; // à adapter si tu as la vraie date
  thumb.dataset.index = index;

  // Clic sur la miniature : afficher la date sur la timeline et recentrer la carte
  thumb.addEventListener('click', () => {
    // Reset styles sur toutes les miniatures
    gallery.querySelectorAll('img').forEach(img => img.style.border = '2px solid transparent');

    // Mettre en surbrillance la miniature cliquée
    thumb.style.border = '2px solid #f00';

    const dateStr = thumb.dataset.date;

    // Afficher le label avec la date au bon endroit sur la timeline
    const pos = dateToPercent(dateStr);
    dateLabel.style.display = 'block';
    dateLabel.style.left = pos + '%';
    dateLabel.textContent = new Date(dateStr).toLocaleDateString();

    // Recentrer la carte sur le point sélectionné
    const p = points[index];
    map.setView([p.lat, p.lng], 15);
  });

  gallery.appendChild(thumb);
});

// Création d'une polyline directrice en pointillés pour représenter le parcours
var latlngs = points.map(p => [p.lat, p.lng]);  // Tableau de coordonnées

// Création de la ligne avec style pointillé
var parcours = L.polyline(latlngs, {
    color: 'black',
    weight: 3,
    dashArray: '5, 10',  // Style pointillé
    opacity: 0.7
}).addTo(map);

// Zoom automatique pour englober toute la ligne
map.fitBounds(parcours.getBounds());
