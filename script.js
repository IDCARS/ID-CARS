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
      target.innerHTML = '<div class="card">Aucune annonce pour le moment. Déposez la vôtre depuis la page <strong>Déposer</strong> 👇</div>';
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
