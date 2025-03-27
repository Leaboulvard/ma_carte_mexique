// Création de la carte
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centré sur le Mexique

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des lieux visités
var points = [
    { name: "Mexico City - Plaza Aviacion", lat: 19.42879, lng: -99.10653, img: "images/mexico-1.jpg", desc: "Petite place sympathique typique de quartier mexicain." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42123, lng: -99.18024, img: "images/mexico-2.jpg", desc: "Ce petit mammifère est un écureueil gris du mexique (Sciurus aureogaster, elle est indigène au lieux autrement dit elle est présente naturellement dans la région." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42063, lng: -99.18388, img: ["images/mexico-3.jpg", "images/mexico-5.jpg"], desc: "Petite vue sur el lago menor (Lac mineur) du parc." },
    { name: "Mexico City - Bosque de Chapultepec", lat: 19.42879, lng: -99.10653, img: "images/mexico-4.jpg", desc: "Petite place sympathique typique de quartier mexicain !" },
];

 // Ajout des marqueurs
 //   points.forEach(point => {
 //       L.marker([point.lat, point.lng]).addTo(map)
 //           .bindPopup(`<b>${point.name}</b><br>${point.desc}<br><img src="${point.img}" width="150">`);
 //   });


    points.forEach(point => {
        let imagesHTML = "";  // Variable pour stocker le HTML des images
    
        // Parcours du tableau d'images pour les ajouter dans le HTML
        point.imgs.forEach(img => {
            imagesHTML += `<img src="${img}" width="150" style="margin: 5px;">`;
        });
    
        // Création du marqueur avec plusieurs images dans la popup
        L.marker([point.lat, point.lng]).addTo(map)
            .bindPopup(`<b>${point.name}</b><br>${point.desc}<br>${imagesHTML}`);
    });
    