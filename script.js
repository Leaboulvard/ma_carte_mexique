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
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42011, lng: -99.18725, img: "images/mexico-4.jpg", desc: "Voici le ruisseau qui alimente le lac mineur." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42019, lng: -99.18556, img: "images/mexico-5.jpg", desc: "Le meilleur point de vue sur le lac alimenté par le ruisseau attenant." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42021, lng: -99.18559, img: "images/mexico-6.jpg", desc: "Dans ce parc, on peut voir en grande quantité une plante ornementale originaire d'Afrique du Sud : la Clivia." },
    { name: "Mexico City <br> Musée de l'Art Moderne", lat: 19.42302, lng: -99.17997, img: "images/mexico-8.jpg", desc: "Cette œuvre emblématique, La vendedora de frutas (La Vendeuse de fruits), réalisée par Olga Costa, met en valeur la culture populaire mexicaine." },
    { name: "Mexico City <br> Musée de l'Art Moderne", lat: 19.42313, lng: -99.17924, img: "images/mexico-9.jpg", desc: "La Briosa con bebé (La courageuse avec son bébé), de Lourdes Grobet, capture avec force et tendresse l’univers féminin des luchadoras (catcheuses) mexicaines." },
    { name: "Mexico City <br> Musée de l'Art Moderne", lat: 19.42302, lng: -99.17999, img: "images/mexico-11.jpg", desc: "Les Deux Fridas de Frida Kahlo, exprime la dualité identitaire et la douleur intime subit d'une séparation." },
    { name: "Mexico City <br> Musée de l'Art Moderne", lat: 19.42314, lng: -99.17946, img: "images/mexico-12.jpg", desc: "Dans Lucrecia fumando (Lucrecia en tain de fumer), Lucía Maya capture la complexité et l'introspection d'une femme, à travers un portrait silencieux et symbolique." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42178, lng: -99.17897, img: "images/mexico-13.jpg", desc: "La statue à l'entrée du parc de Chapultepec, le Monument aux Enfants Héros, rend hommage aux six cadets militaires mexicains morts lors de la bataille de Chapultepec en 1847, symbolisant leur courage et sacrifice." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42178, lng: -99.17897, img: "images/mexico-13.jpg", desc: "" }
    // Point avec vidéo
    { name: "Mexico City <br> Musée d'archives photographique", lat: 19.42318, lng: -99.17990, video: "videos/mexico-1.mp4", desc: "Vidéo montrant l'œuvre en mouvement." }
];

// Ajout des marqueurs
points.forEach((point, index) => {
    let mediaUrl = point.video ? point.video : point.img; // Utilise la vidéo si elle existe, sinon l'image

    // Crée une icône personnalisée avec l'image miniature
    let customIcon = L.icon({
        iconUrl: point.img,
        iconSize: [40, 40], // taille de l’icône
        iconAnchor: [20, 40], // position de l’ancre
        popupAnchor: [0, -40], // où s’ouvre la popup
        className: 'custom-marker'
    });

    // Ajout du marqueur avec l'icône personnalisée
    L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map)
        .bindPopup(`
            <div style="max-width: 250px;">
                <h3 style="margin-bottom: 5px;">${point.name}</h3>
                <p>${point.desc}</p>
                ${
                    point.video 
                    ? `<video width="100%" controls style="margin-top: 5px; border-radius: 10px;">
                        <source src="${point.video}" type="video/mp4">
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>` 
                    : `<img src="${mediaUrl}" width="100%" style="margin-top: 5px; border-radius: 10px;">`
                }
            </div>
        `);
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
