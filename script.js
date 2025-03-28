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
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42063, lng: -99.18388, img: ["images/mexico-3.jpg", "images/mexico-5.jpg"], desc: "Petite vue sur el Lago menor ou le Lac mineur en français du parc." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42879, lng: -99.10653, img: "images/mexico-4.jpg", desc: "Petite place typique de quartier mexicain !" },
];

// Ajout des marqueurs
points.forEach((point, index) => {
    let imagesHTML = "";  // Variable pour stocker les images

    // Vérifie si "point.img" est une seule image ou un tableau d'images
    if (Array.isArray(point.img)) {
        // Si c'est un tableau, on prépare le défilement avec un bouton
        imagesHTML = `
            <div id="image-slider-${index}" class="image-slider" style="text-align: center;">
                <img src="${point.img[0]}" width="250" style="margin: 5px; max-width: 100%;" id="image-${index}-0">
            </div>
            <div style="text-align: center;">
                <button onclick="prevImage(${index}, ${point.img.length})">Précédent</button>
                <button onclick="nextImage(${index}, ${point.img.length})">Suivant</button>
            </div>
        `;
    } else {
        // Sinon, on affiche une seule image
        imagesHTML = `<div style="text-align: center;"><img src="${point.img}" width="250" style="margin: 5px; max-width: 100%;"></div>`;
    }

    // Création du marqueur avec la description et les images dans la popup
    L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`<b>${point.name}</b><br>${point.desc}<br>${imagesHTML}`, {
            maxWidth: 600,  // Largeur maximale de la popup
            maxHeight: 500, // Hauteur maximale de la popup
        });
});

// Fonction pour changer l'image suivante
function nextImage(index, totalImages) {
    let currentImage = document.querySelector(`#image-${index}-current`);
    let nextIndex = (parseInt(currentImage.id.split('-')[2]) + 1) % totalImages; // Cycle les images
    let nextImage = document.querySelector(`#image-${index}-${nextIndex}`);
    currentImage.style.display = 'none';
    nextImage.style.display = 'block';
    currentImage.id = `image-${index}-${nextIndex}`;
}

// Fonction pour changer l'image précédente
function prevImage(index, totalImages) {
    let currentImage = document.querySelector(`#image-${index}-current`);
    let prevIndex = (parseInt(currentImage.id.split('-')[2]) - 1 + totalImages) % totalImages; // Cycle les images en sens inverse
    let prevImage = document.querySelector(`#image-${index}-${prevIndex}`);
    currentImage.style.display = 'none';
    prevImage.style.display = 'block';
    currentImage.id = `image-${index}-${prevIndex}`;
}
