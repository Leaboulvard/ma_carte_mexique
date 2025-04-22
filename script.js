// Création de la carte
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centré sur le Mexique

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des lieux visités (on conserve tel quel)
var points = [
    { name: "Mexico City <br> Plaza Aviacion", lat: 19.42879, lng: -99.10653, img: "images/mexico-1.jpg", desc: "Petite place sympathique typique de quartier mexicain." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42123, lng: -99.18024, img: "images/mexico-2.jpg", desc: "Ce petit mammifère est un écureuil gris du Mexique <i>(Sciurus aureogaster)</i>." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42063, lng: -99.18388, img: "images/mexico-3.jpg", desc: "Petite vue sur el Lago menor ou le Lac mineur en français du parc." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42879, lng: -99.10653, img: "images/mexico-4.jpg", desc: "Petite place typique de quartier mexicain !" },
];

// Ajout des marqueurs
points.forEach((point) => {
    let imageHTML = `<div style="text-align: center;"><img src="${point.img}" width="250" style="margin: 5px; max-width: 100%;"></div>`;

    L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`<b>${point.name}</b><br>${point.desc}<br>${imageHTML}`, {
            maxWidth: 600,
            maxHeight: 500,
        });
});

// Création d’une ligne en pointillés entre les lieux
var latlngs = points.map(p => [p.lat, p.lng]);

L.polyline(latlngs, {
    color: 'blue',
    weight: 3,
    opacity: 0.7,
    dashArray: '10,10' // ligne pointillée
}).addTo(map);
