// Création de la carte
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centré sur le Mexique

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des lieux visités
var points = [
    { name: "Mexico City <br> Plaza Aviacion", lat: 19.42879, lng: -99.10653, img: "images/mexico-1.jpg", desc: "Petite place sympathique typique de quartier mexicain." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42123, lng: -99.18024, img: "images/mexico-2.jpg", desc: "Ce petit mammifère est un écureuil gris du Mexique <i>(Sciurus aureogaster)</i>." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42063, lng: -99.18388, img: ["images/mexico-3.jpg", "images/mexico-5.jpg"], desc: "Petite vue sur el lago menor (Lac mineur) du parc." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42879, lng: -99.10653, img: "images/mexico-4.jpg", desc: "Petite place typique de quartier mexicain !" },
];

// Ajout des marqueurs
points.forEach(point => {
    let imagesHTML = "";  // Variable pour stocker les images

    // Vérifie si "point.img" est une seule image ou un tableau d'images
    if (Array.isArray(point.img)) {
        // Si c'est un tableau, on boucle et ajoute chaque image
        point.img.forEach(img => {
            imagesHTML += `<img src="${img}" width="150" style="margin: 5px; display: inline-block;">`; // Utilisation de display: inline-block
        });
    } else {
        // Sinon, ajoute une seule image
        imagesHTML = `<img src="${point.img}" width="150" style="margin: 5px; display: inline-block;">`; // Utilisation de display: inline-block
    }

    // Création du marqueur avec la description et les images dans la popup
    L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`<b>${point.name}</b><br>${point.desc}<br>${imagesHTML}`);
});
