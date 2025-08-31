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
    titre: "Peugeot 208 1.2 PureTech 82ch Active – 2018",
    prix: "9 200 €",
    km: "89 500 km",
    annee: "2018",
    image: "assets/peugeot-208.jpg",
    description: "Petite citadine économique et fiable, faible consommation, entretien suivi chez Peugeot. Idéal pour jeunes conducteurs."
  },
  {
    titre: "Renault Clio V TCe 90 Intens – 2020",
    prix: "14 800 €",
    km: "41 200 km",
    annee: "2020",
    image: "assets/renault-clio.jpg",
    description: "Dernière génération, finition Intens avec écran tactile, Android Auto/Apple CarPlay, radar de recul et caméra. Très bon état."
  },
  {
    titre: "BMW Série 3 Touring 320d xDrive – 2015",
    prix: "16 900 €",
    km: "155 000 km",
    annee: "2015",
    image: "assets/bmw-serie3.jpg",
    description: "Break diesel 190 ch, transmission intégrale, confortable et fiable. Carnet d’entretien complet, pneus récents."
  },
  {
    titre: "Audi A3 Sportback 1.6 TDI – 2017",
    prix: "15 500 €",
    km: "120 000 km",
    annee: "2017",
    image: "assets/audi-a3.jpg",
    description: "Audi A3 en très bon état, finition Ambition, sièges sport, GPS intégré, historique limpide. Consommation très faible."
  },
  {
    titre: "Dacia Duster 1.5 dCi 110 4x4 – 2019",
    prix: "13 200 €",
    km: "95 000 km",
    annee: "2019",
    image: "assets/dacia-duster.jpg",
    description: "SUV robuste et pratique, 4 roues motrices, parfait pour campagne/montagne. Entretien complet, CT OK."
  }
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

