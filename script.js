// Création de la carte
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centré sur le Mexique

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des lieux visités
var points = [
    { name: "Mexico City - Plaza Aviacion", lat: 19.42879, lng: -99.10653, img: "images/mexico-1.jpg", desc: "Petite place sympathique typique de quartier mexicain." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42123, lng: -99.18024, img: "images/mexico-2.jpg", desc: "Ce petit mammifère est un écureuil gris du Mexique <i>(Sciurus aureogaster)</i>." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42063, lng: -99.18388, img: ["images/mexico-3.jpg", "images/mexico-5.jpg"], desc: "Petite vue sur el lago menor <i>(Lac mineur)</i> du parc." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42879, lng: -99.10653, img: "images/mexico-4.jpg", desc: "Petite place sympathique typique de quartier mexicain." },
];

// Ajout des marqueurs
points.forEach(point => {
    let imagesHTML = "";  // Variable pour stocker les images
    
    // Vérifie si "point.img" est un tableau ou une chaîne de caractères
    if (Array.isArray(point.img)) {
        point.img.forEach(img => {
            imagesHTML += `<img src="${img}" width="150" style="margin: 5px;">`;
        });
    } else {
        imagesHTML = `<img src="${point.img}" width="150" style="margin: 5px;">`;
    }

    // Met en italique tout texte entre parenthèses
    let formattedDesc = point.desc.replace(/\((.*?)\)/g, "<i>($1)</i>");
    
    // Création du marqueur avec un retour à la ligne et des photos côte à côte
    L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`<b>${point.name.split(" - ")[0]}</b><br>${point.name.split(" - ")[1]}<br>${formattedDesc}<br>
        <div style="display: flex; gap: 10px;">${imagesHTML}</div>`);
});
