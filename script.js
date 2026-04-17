const pokemons = [
  { nom: "Mackogneur", poids: 130, vitesse: 55, type: "Combat", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" },
  { nom: "Ronflex", poids: 460, vitesse: 30, type: "Normal", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" },
  { nom: "Dracaufeu", poids: 90.5, vitesse: 100, type: "Feu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
  { nom: "Tortank", poids: 85.5, vitesse: 78, type: "Eau", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" },
  { nom: "Pikachu", poids: 6, vitesse: 90, type: "Electrik", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { nom: "Tyranocif", poids: 202, vitesse: 61, type: "Roche", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png" },
  { nom: "Ectoplasma", poids: 40.5, vitesse: 110, type: "Spectre", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" },
  { nom: "Mewtwo", poids: 122, vitesse: 130, type: "Psy", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" }
];

const attaques = [
  { nom: "Frappe Atlas", type: "physique", acceleration: 15, description: "Projette l'adversaire au sol" },
  { nom: "Plaquage", type: "physique", acceleration: 10, description: "Charge de tout son poids" },
  { nom: "Poing Dynamik", type: "physique", acceleration: 25, description: "Coup de poing surpuissant" },
  { nom: "Charge", type: "physique", acceleration: 8, description: "Fonce à pleine vitesse" },
  { nom: "Tonnerre", type: "electrik", voltage: 100000, intensite: 0.5, description: "Décharge électrique massive" },
  { nom: "Lance-Flammes", type: "feu", temperature: 1500, debit: 2, description: "Jet de flammes à 1500°C" }
];



     // ===== LES FORMULES DE PHYSIQUE =====

// Force = masse × accélération (Newton)
function calculerForce(masse, acceleration) {
  return masse * acceleration;
}

// Énergie cinétique = 1/2 × masse × vitesse² (Joules)
function calculerEnergieCinetique(masse, vitesse) {
  return 0.5 * masse * Math.pow(vitesse, 2);
}

// Quantité de mouvement = masse × vitesse (kg·m/s)
function calculerQuantiteMouvement(masse, vitesse) {
  return masse * vitesse;
}

// Pression d'impact = Force / surface de contact (Pascal)
// On estime la surface d'un poing à 0.01 m² et d'un corps à 0.5 m²
function calculerPression(force, typeCoup) {
  const surface = typeCoup === "poing" ? 0.01 : 0.5;
  return force / surface;
}

// Convertir la stat vitesse du jeu en m/s (on fait ×0.5 pour être réaliste)
function statVersMs(statVitesse) {
  return statVitesse * 0.5;
}

// Puissance électrique P = U × I (Watts)
function calculerPuissanceElectrique(voltage, intensite) {
  return voltage * intensite;
}

// Énergie thermique Q = m × c × ΔT (Joules)
// c de l'eau = 4186 J/(kg·°C), on calcule combien d'eau ça pourrait faire bouillir
function calculerEnergieThermiqueEquivalent(temperature, debit) {
  const chaleurSpecifiqueEau = 4186;
  return debit * chaleurSpecifiqueEau * temperature;
}


// ===== LE MOTEUR DE SIMULATION =====

function simulerAttaque(attaquantIndex, cibleIndex, attaqueIndex) {
  const attaquant = pokemons[attaquantIndex];
  const cible = pokemons[cibleIndex];
  const attaque = attaques[attaqueIndex];
  
  const vitesseMs = statVersMs(attaquant.vitesse);
  let resultats = {};

  if (attaque.type === "physique") {
    const force = calculerForce(attaquant.poids, attaque.acceleration);
    const ec = calculerEnergieCinetique(attaquant.poids, vitesseMs);
    const qm = calculerQuantiteMouvement(attaquant.poids, vitesseMs);
    const typeCoup = attaque.nom.includes("Poing") ? "poing" : "corps";
    const pression = calculerPression(force, typeCoup);
    
    // Vitesse de recul de la cible (conservation de quantité de mouvement)
    const vitesseRecul = (attaquant.poids * vitesseMs) / cible.poids;
    const distanceRecul = (vitesseRecul * vitesseRecul) / (2 * 9.81); // v²/2g

    resultats = {
      type: "physique",
      force: force,
      energieCinetique: ec,
      quantiteMouvement: qm,
      pression: pression,
      vitesseAttaquant: vitesseMs,
      vitesseRecul: vitesseRecul,
      distanceRecul: distanceRecul
    };
  } else if (attaque.nom === "Tonnerre") {
    const puissance = calculerPuissanceElectrique(attaque.voltage, attaque.intensite);
    resultats = {
      type: "electrique",
      puissance: puissance,
      voltage: attaque.voltage,
      intensite: attaque.intensite,
      equivalentMaisons: Math.round(puissance / 3000) // une maison ≈ 3kW
    };
  } else if (attaque.nom === "Lance-Flammes") {
    const energie = calculerEnergieThermiqueEquivalent(attaque.temperature, attaque.debit);
    resultats = {
      type: "thermique",
      energie: energie,
      temperature: attaque.temperature,
      litresEauBouillie: Math.round(energie / (4186 * 100)) // énergie pour faire bouillir 1L depuis 0°C
    };
  }

  return {
    attaquant: attaquant,
    cible: cible,
    attaque: attaque,
    resultats: resultats
  };
}



// ===== AFFICHAGE =====

function afficherResultats(simulation) {
  const r = simulation.resultats;
  const zone = document.getElementById("resultats");
  
  let html = `<div class="result-card">`;
  html += `<h2>⚔️ ${simulation.attaquant.nom} utilise ${simulation.attaque.nom} sur ${simulation.cible.nom} !</h2>`;
  html += `<p class="description">${simulation.attaque.description}</p>`;
  html += `<div class="stats-grid">`;

  if (r.type === "physique") {
    html += `
      <div class="stat-box">
        <span class="stat-label">💪 Force d'impact</span>
        <span class="stat-value">${r.force.toLocaleString()} N</span>
        <span class="stat-compare">${comparerForce(r.force)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">⚡ Énergie cinétique</span>
        <span class="stat-value">${Math.round(r.energieCinetique).toLocaleString()} J</span>
        <span class="stat-compare">${comparerEnergie(r.energieCinetique)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">🎯 Pression d'impact</span>
        <span class="stat-value">${Math.round(r.pression).toLocaleString()} Pa</span>
        <span class="stat-compare">${comparerPression(r.pression)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">🏃 Vitesse d'attaque</span>
        <span class="stat-value">${r.vitesseAttaquant} m/s</span>
        <span class="stat-compare">${(r.vitesseAttaquant * 3.6).toFixed(1)} km/h</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">💨 Recul de ${simulation.cible.nom}</span>
        <span class="stat-value">${r.vitesseRecul.toFixed(1)} m/s</span>
        <span class="stat-compare">Projeté à ${r.distanceRecul.toFixed(1)} mètres</span>
      </div>
      <div class="stat-box formula">
        <span class="stat-label">📐 Formules utilisées</span>
        <span class="stat-value">F = ${simulation.attaquant.poids}kg × ${simulation.attaque.acceleration}m/s²</span>
        <span class="stat-value">Ec = ½ × ${simulation.attaquant.poids}kg × ${r.vitesseAttaquant}²</span>
      </div>
    `;
  } else if (r.type === "electrique") {
    html += `
      <div class="stat-box">
        <span class="stat-label">⚡ Puissance</span>
        <span class="stat-value">${r.puissance.toLocaleString()} W</span>
        <span class="stat-compare">${r.equivalentMaisons} maisons alimentées</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">🔌 Voltage</span>
        <span class="stat-value">${r.voltage.toLocaleString()} V</span>
        <span class="stat-compare">${(r.voltage / 230).toFixed(0)}× une prise murale</span>
      </div>
    `;
  } else if (r.type === "thermique") {
    html += `
      <div class="stat-box">
        <span class="stat-label">🔥 Température</span>
        <span class="stat-value">${r.temperature.toLocaleString()} °C</span>
        <span class="stat-compare">Fait fondre l'aluminium (660°C) !</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">💧 Équivalent</span>
        <span class="stat-value">${r.litresEauBouillie} litres</span>
        <span class="stat-compare">d'eau portée à ébullition</span>
      </div>
    `;
  }

  html += `</div></div>`;
  zone.innerHTML = html;
}

// Comparaisons fun pour donner du contexte
function comparerForce(newtons) {
  if (newtons > 5000) return "💀 Comme un accident de voiture !";
  if (newtons > 2000) return "🥊 Plus fort qu'un champion de boxe";
  if (newtons > 500) return "🦵 Comme un bon coup de pied";
  return "👋 Comme une grosse claque";
}

function comparerEnergie(joules) {
  if (joules > 100000) return "🚗 Comme une voiture à 50km/h";
  if (joules > 10000) return "🏹 Comme une flèche d'arbalète";
  if (joules > 1000) return "⚾ Comme une balle de baseball";
  return "🎾 Comme une balle de tennis";
}

function comparerPression(pascals) {
  if (pascals > 100000) return "Peut briser du béton";
  if (pascals > 50000) return "Peut casser un os";
  if (pascals > 10000) return "Grosse douleur garantie";
  return "Ça fait mal quand même";
}


// ===== INITIALISATION =====

function init() {
  const selAttaquant = document.getElementById("selectAttaquant");
  const selCible = document.getElementById("selectCible");
  const selAttaque = document.getElementById("selectAttaque");

  // Option vide par défaut
  selAttaquant.innerHTML = `<option value="">-- Choisir un attaquant --</option>`;
  selCible.innerHTML = `<option value="">-- Choisir une cible --</option>`;
  selAttaque.innerHTML = `<option value="">-- Choisir une attaque --</option>`;

  pokemons.forEach((p, i) => {
    selAttaquant.innerHTML += `<option value="${i}">${p.nom} (${p.poids}kg)</option>`;
    selCible.innerHTML += `<option value="${i}">${p.nom} (${p.poids}kg)</option>`;
  });

  attaques.forEach((a, i) => {
    selAttaque.innerHTML += `<option value="${i}">${a.nom} (${a.type})</option>`;
  });
}

function updatePreview(role) {
  const select = document.getElementById(role === "attaquant" ? "selectAttaquant" : "selectCible");
  const preview = document.getElementById(role === "attaquant" ? "previewAttaquant" : "previewCible");
  const p = pokemons[select.value];

  preview.innerHTML = `
    <img src="${p.image}" alt="${p.nom}">
    <div class="preview-stats">
      <span>Poids: ${p.poids} kg</span>
      <span>Vitesse: ${p.vitesse} (${statVersMs(p.vitesse)} m/s)</span>
      <span>Type: ${p.type}</span>
    </div>
  `;
}

function lancerSimulation() {
  const a = document.getElementById("selectAttaquant").value;
  const c = document.getElementById("selectCible").value;
  const att = document.getElementById("selectAttaque").value;

  const simulation = simulerAttaque(
    parseInt(a),
    parseInt(c),
    parseInt(att)
  );

  afficherResultats(simulation);
  
  // Petit effet visuel
  document.getElementById("resultats").scrollIntoView({ behavior: "smooth" });
}

function toggleFormules() {
  const panel = document.getElementById("formules-panel");
  const btn = document.getElementById("btnFormules");
  panel.classList.toggle("hidden");
  
  if (panel.classList.contains("hidden")) {
    btn.textContent = "📚 Comprendre les formules";
  } else {
    btn.textContent = "✕ Fermer les explications";
    panel.scrollIntoView({ behavior: "smooth" });
  }
}

function togglePresentation() {
  const modal = document.getElementById("presentationModal");
  modal.classList.toggle("show");
}

// GO !
// Afficher la présentation au chargement
window.addEventListener("load", function() {
  const modal = document.getElementById("presentationModal");
  modal.classList.add("show");
  init();
});

