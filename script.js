// Gestion ultra simple côté client pour GitHub Pages (pas de serveur)
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('annonces-list');
  const form = document.getElementById('annonce-form');

  // Affichage des annonces stockées côté navigateur (localStorage)
  if (list) {
    const annonces = JSON.parse(localStorage.getItem('annonces') || '[]');
    if (!annonces.length) {
      list.innerHTML = '<div class="card">Aucune annonce pour le moment. Déposez la vôtre depuis la page <strong>Déposer</strong> 👇</div>';
    } else {
      list.innerHTML = '';
      annonces.forEach(a => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${a.titre ?? ''}</h3>
          <p>${a.description ?? ''}</p>
          ${a.photo ? `<img src="${a.photo}" alt="photo véhicule" style="margin-top:10px;border-radius:10px">` : ''}
        `;
        list.appendChild(card);
      });
    }
  }

  // Soumission d'une annonce (stockage local + redirection)
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const titre = document.getElementById('titre').value.trim();
      const description = document.getElementById('description').value.trim();
      const file = document.getElementById('photo').files[0];

      const save = (photoDataUrl='') => {
        const annonces = JSON.parse(localStorage.getItem('annonces') || '[]');
        annonces.push({ titre, description, photo: photoDataUrl });
        localStorage.setItem('annonces', JSON.stringify(annonces));
        window.location.href = 'annonces.html';
      };

      if (!titre || !description) return;

      if (file) {
        const reader = new FileReader();
        reader.onload = e2 => save(e2.target.result);
        reader.readAsDataURL(file);
      } else {
        save();
      }
    });
  }
});
