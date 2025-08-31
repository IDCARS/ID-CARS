// Gestion côté client (compatible GitHub Pages)
document.addEventListener('DOMContentLoaded', () => {
  const listHome = document.getElementById('annonces-home');
  const list = document.getElementById('annonces-list');
  const formDeposer = document.getElementById('form-deposer');
  const result = document.getElementById('submit-result');

  // Utility: load & save annonces
  const load = () => JSON.parse(localStorage.getItem('annonces') || '[]');
  const save = (arr) => localStorage.setItem('annonces', JSON.stringify(arr));

  // Render list (home: up to 3)
  function renderAnnonces(target, max = Infinity){
    if (!target) return;
    const annonces = load();
    if (!annonces.length){
      target.innerHTML = '<div class="card"Déposez la vôtre depuis la page <strong>Déposer</strong> 👇</div>';
      return;
    }
    target.innerHTML = '';
    annonces.slice(0, max).forEach(a => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${a.modele || a.titre || ''}</h3>
        <p>${a.annee ? 'Année : ' + a.annee + ' • ' : ''}${a.km ? 'Km : ' + a.km : ''}${a.prix ? ' • ' + a.prix + ' €' : ''}</p>
        <p>${a.description || ''}</p>
        ${a.photos && a.photos.length ? `<img src="${a.photos[0]}" alt="Photo véhicule" style="margin-top:10px;border-radius:10px">` : ''}
      `;
      target.appendChild(card);
    });
  }

  renderAnnonces(listHome, 3);
  renderAnnonces(list);

  // Handle submit
  if (formDeposer){
    formDeposer.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const tel = document.getElementById('tel').value.trim();
      const modele = document.getElementById('modele').value.trim();
      const annee = document.getElementById('annee').value.trim();
      const km = document.getElementById('km').value.trim();
      const prix = document.getElementById('prix').value.trim();
      const description = document.getElementById('description').value.trim();
      const files = document.getElementById('photos').files;

      // Read up to 5 photos as dataURL
      const photos = [];
      const maxPhotos = Math.min(files.length, 5);
      for (let i=0; i<maxPhotos; i++){
        const file = files[i];
        const dataUrl = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result);
          r.onerror = rej;
          r.readAsDataURL(file);
        });
        photos.push(dataUrl);
      }

      // Save in localStorage for local display (not global)
      const annonces = load();
      annonces.unshift({ nom, email, tel, modele, annee, km, prix, description, photos });
      save(annonces);

      // Prepare mailto body
      const body = [
        `Nom: ${nom}`,
        `Email: ${email}`,
        `Téléphone: ${tel}`,
        `Véhicule: ${modele}`,
        `Année: ${annee}`,
        `Kilométrage: ${km}`,
        `Prix souhaité: ${prix} €`,
        `Description: ${description}`,
        photos.length ? `(Photos jointes sur le site ou à renvoyer par WhatsApp)` : `(Pas de photo jointe)`, 
      ].join('\n');

      const mailto = `mailto:ydrix07@icloud.com?subject=${encodeURIComponent('Nouvelle annonce – ' + modele)}&body=${encodeURIComponent(body)}`;

      // Build WhatsApp link
      const waText = `Nouvelle annonce:%0A${encodeURIComponent(body)}`;
      const wa = `https://wa.me/33619186822?text=${waText}`;

      // Show confirmation with links
      if (result){
        result.style.display = 'block';
        result.innerHTML = `
          <h3>Merci !</h3>
          <p>Votre demande a bien été préparée. Cliquez pour nous contacter :</p>
          <p>
            <a class="btn" href="${mailto}">✉️ Envoyer par email</a>
            <a class="btn ghost" target="_blank" rel="noopener" href="${wa}">💬 Envoyer sur WhatsApp</a>
          </p>
          <p class="muted">Votre annonce est visible sur votre appareil dans la page <strong>Annonces</strong> (stockage local).</p>
        `;
        window.scrollTo({ top: result.offsetTop - 80, behavior: 'smooth' });
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar nav");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
const annonces = [
  {
    titre: "Seat Ibiza Connect 1.4 Turbo 2017",
    prix: "5 500 €",
    km: "233 000 km",
    annee: "2017",
    image: "assets/assets/assets/kia-sportage.jpg",
    description: "Seat Ibiza 2017, connect, idéal pour son usage quotidien, son moteur 1,04 l turbo essence de 90 chevaux et reconnu pour sa fiabilité et sa consommation avec 233 000 km, elle a été entretenue régulièrement et nécessite aucun frais immédiat. Elle est très bien équipée avec un écran tactile, la climatisation, le régulateur de vitesse et toutes les fonctionnalités modernes. Contactez-nous pour plus d'informations."
  },
  {
    titre: "Volkswagen Tiguan 2.0 TDI 150 4Motion Carat – 2016",
    prix: "21 300 €",
    km: "127 800 km",
    annee: "2016",
    image: "assets/assets/vw-tiguan.jpg",
    description: "Version Carat full options (cuir, toit ouvrant, GPS, LED, aides à la conduite). 4Motion, état impeccable, révisions à jour."
  },
  {
    titre: "Volkswagen Golf GTD – 2.0 TDI 184 ch",
    prix: "12500",
    km: "203 000 km",
    annee: "2013",
    image: "assets/assets/peugeot-208.jpg",
    description: "Volkswagen Golf GTD, compacte sportive et confortable. Intérieur sport cuir/alcantara avec surpiqûres GTD, sièges avant chauffants, volant sport multifonction à méplat avec palettes (DSG), grand écran GPS avec système multimédia complet (Bluetooth, USB, SD). Caméra de recul avec radars avant/arrière, régulateur de vitesse adaptatif, aides à la conduite avec freinage d’urgence, climatisation automatique bi-zone. Éclairage Full LED/Xénon directionnel, feux de jour LED, jantes alliage 18’’ GTD spécifiques, vitres arrière surteintées, pack chrome extérieur, rétroviseurs électriques rabattables et dégivrants. ✨ Une compacte sportive, économique et fiable, parfaite aussi bien pour un usage quotidien que pour se faire plaisir sur route.
  },
  {
    titre: "Kia Sportage 1.7 CRDi 115 ch – 2016",
    prix: "10 500 €",
    km: "200 00 km",
    annee: "2016",
    image: "assets/assets/renault-clio.jpg",
    description: "Kia Sportage 1.7 CRDi 115 ch de 2016 4e génération phase 1, SUV diesel fiable, économique et bien entretenu, idéal pour la ville comme pour les longs trajets. Boîte manuelle 6 rapports, 200 000 km (évolutifs), chaîne de distribution robuste, entretien suivi exclusivement en concession Kia jusqu’à 183 000 km avec carnet et factures. Équipements : grand écran multimédia avec GPS intégré, Bluetooth et commandes au volant, climatisation automatique bi-zone, régulateur et limiteur de vitesse, feux LED diurnes, jantes alliage 17’’, banquette arrière rabattable 60/40 offrant un grand coffre, ABS, ESP et 6 airbags. Un SUV polyvalent, confortable et prêt à prendre la route."
  },
  {
    titre: "Opel Crossland 1.5D 110 ELEGANCE",
    prix: "11 900 €",
    km: "103 000 km",
    annee: "2021",
    image: "assets/assets/bmw-serie3.jpg",
    description: "Opel Crossland 1.5D 110 ch Élégance de 2021, gris métallisé, 5 places, boîte manuelle 6 vitesses, 110 ch, kit distribution remplacé récemment. Très bon état avec carnet d’entretien complet et contrôle technique OK. Équipements : climatisation automatique, GPS, Bluetooth, USB, ordinateur de bord, sellerie cuir/tissu, allumage auto des feux, vitres et rétroviseurs électriques dégivrants, jantes alliage, peinture métallisée, ABS, airbags, capteur de pluie, régulateur et limiteur de vitesse. Un SUV moderne, fiable et économique, idéal pour un usage quotidien.."
  },
];
// Fonction d'affichage
function renderAnnonces() {
  const list = document.getElementById("annonces-list");
  const home = document.getElementById("annonces-home");

  if (!list && !home) return;

  annonces.forEach(a => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${a.image}" alt="${a.titre}" style="border-radius:10px;margin-bottom:10px">
      <h3>${a.titre}</h3>
      <p>${a.annee} • ${a.km}</p>
      <p><strong>${a.prix}</strong></p>
      <p class="muted">${a.description}</p>
    `;
    if (list) list.appendChild(card);
    if (home) home.appendChild(card.cloneNode(true));
  });
}

document.addEventListener("DOMContentLoaded", renderAnnonces);

