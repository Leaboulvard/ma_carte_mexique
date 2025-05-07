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
    { name: "Mexico City <br> Musée de l'Art Moderne", lat: 19.42314, lng: -99.17946, img: "images/mexico-12.jpg", desc: "Dans Lucrecia fumando (Lucrecia en tain de fumer), Lucía Maya capture la complexité et l'introspection d'une femme, à travers un portrait silencieux et symbolique, qui perso m'a fait bader." },
    { name: "Mexico City <br> Bosque de Chapultepec", lat: 19.42178, lng: -99.17897, img: "images/mexico-13.jpg", desc: "La statue à l'entrée du parc de Chapultepec, le Monument aux Enfants Héros, rend hommage aux six cadets militaires mexicains morts lors de la bataille de Chapultepec en 1847, symbolisant leur courage et sacrifice." },
    { name: "Mexico City <br> Musée d'archives photographique", lat: 19.43460, lng: -99.13210, video: "videos/mexico-1.mp4", desc: "Vidéo montrant l'œuvre en mouvement." }, 
    { name: "Mexico City <br> Templo Mayor", lat: 19.43522, lng: -99.13175, img: "images/mexico-14.jpg", desc: "Le Templo Mayor, cœur religieux de l’empire aztèque, semble moyennement conservé selon moi, sans doute en raison du développement urbain environnant." },
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.68263, lng: -98.84820, img: "images/mexico-16.jpg", desc: "L’esplanade fermée de la Citadelle servait probablement à des rituels politiques et religieux majeurs, et marque l’entrée sud de la grande avenue des Morts à Teotihuacan." }, 
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.68211, lng: -98.84656, img: "images/mexico-19.jpg", desc: "Le Temple de Quetzalcóatl, ou Temple du Serpent à plumes, est un édifice richement orné dédié à l’une des principales divinités de Teotihuacan, situé au cœur de la Citadelle." }, 
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.69300, lng: -98.84557, img: "images/mexico-20.jpg", desc: "La Pyramide du Soleil, le plus grand monument de Teotihuacan dédié à une divinité solaire, impressionne par sa taille et son architecture, et son alignement avec les phénomènes astronomiques, comme les équinoxes, suggère qu’elle jouait un rôle central dans les rites solaires de cette civilisation." }, 
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.69809, lng: -98.84433, img: "images/mexico-22.jpg", desc: "La Pyramide de la Lune, située à l'extrémité nord de l'Avenue des Morts, est dédiée à la déesse de la lune et joue un rôle clé dans les rituels astronomiques et religieux de Teotihuacan." }, 
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.69541, lng: -98.84523, img: "images/mexico-21.jpg", desc: "L’Avenue des Morts, qui relie les principaux temples de Teotihuacan, doit son nom à tort à l’idée que les structures bordant la voie étaient des tombeaux comme on peut le voir sur l'image, alors qu’elles servaient en réalité à des cérémonies." }, 
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.68734, lng: -98.84900, img: "images/mexico-25.jpg", desc: "Voici le sentier qui relie la zone archéologique à la ville de Teotihuacan, un paysage qui évoque presque l'ambiance d'un western." }, 
    { name: "Mexico City <br> Zone Archéologique de Theotihuacan", lat: 19.68958, lng: -98.84780, img: "images/mexico-26.jpg", desc: "L’agave américain présent sur le sentier, est notamment utilisé pour la production de tequila et de mezcal. Il est également prisé pour ses fibres résistantes, employées dans la fabrication de cordes et de sacs, ainsi que pour son jus, le miel d’agave, utilisé comme édulcorant naturel." }, 
    { name: "Mexico City <br> Theotihuacan", lat: 19.69492, lng: -98.84983, img: "images/mexico-27.jpg", desc: "Voici un repas typiquement mexicain composé de viande rouge et blanche, de haricots rouges, de quesadillas, ainsi que d'une raquette de nopal, une variété de cactus comestible très courante au Mexique." }
];

points.forEach((point, index) => {
    let mediaUrl = point.video ? point.video : point.img;

    // Utilise une icône par défaut si aucune image n'est disponible
    let iconUrl = point.img ? point.img : 'images/default-icon.png'; // Remplacez par une icône réelle si vous n’avez pas d’image

    let customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: 'custom-marker'
    });

    // Ajout du marqueur
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
                    : `<img src="${point.img}" width="100%" style="margin-top: 5px; border-radius: 10px;">`
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
