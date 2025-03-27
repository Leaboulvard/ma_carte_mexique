// Création de la carte
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centré sur le Mexique

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des lieux visités
var points = [
    { name: "Mexico City", lat: 19.4326, lng: -99.1332, img: "images/mexico-1.jpg", desc: "La capitale vibrante du Mexique !" },
    { name: "Cancún", lat: 21.1619, lng: -86.8515, img: "https://via.placeholder.com/150", desc: "Plages paradisiaques et vie nocturne." },
];

// Ajout des marqueurs
points.forEach(point => {
    L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`<b>${point.name}</b><br>${point.desc}<br><img src="${point.img}" width="150">`);
});
