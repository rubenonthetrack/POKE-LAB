// ===== GESTION DES LANGUES =====

// Variable globale pour la langue active (FR par défaut)
let currentLanguage = 'fr';

// Variable pour stocker la simulation actuelle
let currentSimulation = null;

/**
 * Initialise le système de langue au chargement de la page
 * Affiche la popup et masque le contenu avec un blur
 */
function initLanguageSystem() {
  // La popup s'affiche automatiquement au chargement (classe 'show' en HTML)
  // Pas de localStorage - la popup apparaît toujours
}

/**
 * Définit la langue active et met à jour tout le contenu
 * @param {string} lang - Code de langue ('fr' ou 'en')
 */
function setLanguage(lang) {
  console.log('setLanguage called with:', lang);
  currentLanguage = lang.toLowerCase();
  
  // Ferme la popup de sélection
  closeLanguagePopup();
  
  // Active le bouton de switch permanent
  activateLanguageSwitcher();
  
  // Traduit tous les éléments
  translateAllElements();
  
  // Réinitialise les sélecteurs avec la bonne langue
  init();
  
  // Reafficher la simulation si elle existe (pour traduire la description)
  if (currentSimulation) {
    afficherResultats(currentSimulation);
  }
  
  // Ferme le menu de langue si ouvert
  closeLanguageSwitcherMenu();
}

/**
 * Ferme la popup et l'overlay
 */
function closeLanguagePopup() {
  const popup = document.getElementById('languagePopup');
  const overlay = document.getElementById('languageOverlay');
  
  if (popup) popup.classList.remove('show');
  if (overlay) overlay.classList.remove('show');
  
  // Enlève le blur du body
  document.body.classList.remove('blur');
}

/**
 * Active et affiche le bouton de switch permanent
 */
function activateLanguageSwitcher() {
  const switcher = document.getElementById('languageSwitcher');
  if (switcher) {
    switcher.classList.add('active');
    updateLanguageSwitcherDisplay();
  }
}

/**
 * Met à jour l'affichage du bouton avec le code langue
 */
function updateLanguageSwitcherDisplay() {
  const codeDisplay = document.getElementById('currentLangCode');
  if (codeDisplay) {
    codeDisplay.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';
  }
}

/**
 * Bascule l'affichage du menu de langue
 */
function toggleLanguageSwitcher() {
  const menu = document.getElementById('languageSwitcherMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

/**
 * Ferme le menu de langue
 */
function closeLanguageSwitcherMenu() {
  const menu = document.getElementById('languageSwitcherMenu');
  if (menu) {
    menu.classList.remove('show');
  }
}

/**
 * Traduit tous les éléments avec des attributs data-fr et data-en
 * Supporte le HTML complexe (avec des balises)
 */
function translateAllElements() {
  const elements = document.querySelectorAll('[data-fr][data-en]');
  
  elements.forEach(el => {
    const frText = el.getAttribute('data-fr');
    const enText = el.getAttribute('data-en');
    const textToUse = currentLanguage === 'fr' ? frText : enText;
    
    // Vérifie si c'est du HTML complexe (contient des balises)
    if (textToUse.includes('<')) {
      el.innerHTML = textToUse;
    } else {
      el.textContent = textToUse;
    }
  });
  
  // Traduit aussi les attributs aria-label et placeholder si nécessaire
  translateAriaLabels();
}

/**
 * Traduit les attributs aria-label et autres attributs spécialisés
 */
function translateAriaLabels() {
  // Cette fonction peut être étendue pour d'autres attributs si nécessaire
}

/**
 * Ferme le menu de langue si on clique en dehors
 */
document.addEventListener('click', function(event) {
  const switcher = document.getElementById('languageSwitcher');
  const menu = document.getElementById('languageSwitcherMenu');
  
  if (switcher && menu && !switcher.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove('show');
  }
});

// ===== INITIALISATION AU CHARGEMENT =====
// Exécute le système de langue dès que le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  initLanguageSystem();
});

// ===== TRADUCTIONS DES DONNÉES =====

const pokemonsNames = {
  fr: ["Mackogneur", "Ronflex", "Dracaufeu", "Tortank", "Pikachu", "Tyranocif", "Ectoplasma", "Mewtwo"],
  en: ["Machamp", "Snorlax", "Charizard", "Blastoise", "Pikachu", "Tyranitar", "Gengar", "Mewtwo"]
};

const pokemonsTypes = {
  fr: ["Combat", "Normal", "Feu", "Eau", "Électrik", "Roche", "Spectre", "Psy"],
  en: ["Fighting", "Normal", "Fire", "Water", "Electric", "Rock", "Ghost", "Psychic"]
};

const attackNames = {
  fr: ["Frappe Atlas", "Plaquage", "Poing Dynamik", "Charge", "Tonnerre", "Lance-Flammes"],
  en: ["Heavy Slam", "Tackle", "Dynamic Punch", "Charge", "Thunderbolt", "Flamethrower"]
};

const attackDescriptions = {
  fr: [
    "Projette l'adversaire au sol",
    "Charge de tout son poids",
    "Coup de poing surpuissant",
    "Fonce à pleine vitesse",
    "Décharge électrique massive",
    "Jet de flammes à 1500°C"
  ],
  en: [
    "Throws the opponent to the ground",
    "Charges with full weight",
    "Overpowering punch",
    "Charges at full speed",
    "Massive electric discharge",
    "Jet of flames at 1500°C"
  ]
};

const attackTypes = {
  fr: ["physique", "physique", "physique", "physique", "électrique", "feu"],
  en: ["physical", "physical", "physical", "physical", "electric", "fire"]
};

// ===== DONNÉES DE JEU =====

const pokemons = [
  { nom: 0, poids: 130, vitesse: 55, type: 0, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png" },
  { nom: 1, poids: 460, vitesse: 30, type: 1, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" },
  { nom: 2, poids: 90.5, vitesse: 100, type: 2, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
  { nom: 3, poids: 85.5, vitesse: 78, type: 3, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" },
  { nom: 4, poids: 6, vitesse: 90, type: 4, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { nom: 5, poids: 202, vitesse: 61, type: 5, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png" },
  { nom: 6, poids: 40.5, vitesse: 110, type: 6, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" },
  { nom: 7, poids: 122, vitesse: 130, type: 7, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" }
];

const attaques = [
  { nom: 0, type: "physique", acceleration: 15, description: 0 },
  { nom: 1, type: "physique", acceleration: 10, description: 1 },
  { nom: 2, type: "physique", acceleration: 25, description: 2 },
  { nom: 3, type: "physique", acceleration: 8, description: 3 },
  { nom: 4, type: "electrik", voltage: 100000, intensite: 0.5, description: 4 },
  { nom: 5, type: "feu", temperature: 1500, debit: 2, description: 5 }
];

// ===== FONCTION POUR OBTENIR UN TEXTE TRADUIT =====

function getText(array, index) {
  if (Array.isArray(array)) {
    return array[currentLanguage === 'fr' ? 0 : 1][index];
  }
  return array[index];
}

function getPokemonName(pokemon) {
  return pokemonsNames[currentLanguage][pokemon.nom];
}

function getPokemonType(pokemon) {
  return pokemonsTypes[currentLanguage][pokemon.type];
}

function getAttackName(attack) {
  return attackNames[currentLanguage][attack.nom];
}

function getAttackDescription(attack) {
  return attackDescriptions[currentLanguage][attack.description];
}

function getAttackType(attack) {
  if (currentLanguage === 'fr') {
    if (attack.type === 'physique') return 'physique';
    if (attack.type === 'electrik') return 'électrique';
    if (attack.type === 'feu') return 'feu';
  } else {
    if (attack.type === 'physique') return 'physical';
    if (attack.type === 'electrik') return 'electric';
    if (attack.type === 'feu') return 'fire';
  }
  return attack.type;
}



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
    const typeCoup = attackNameFr.includes("Poing") ? "poing" : "corps";
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
  } else if (attaque.type === "electrik") {
    const puissance = calculerPuissanceElectrique(attaque.voltage, attaque.intensite);
    resultats = {
      type: "electrique",
      puissance: puissance,
      voltage: attaque.voltage,
      intensite: attaque.intensite,
      equivalentMaisons: Math.round(puissance / 3000) // une maison ≈ 3kW
    };
  } else if (attaque.type === "feu") {
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
  // Stocker la simulation courante pour permettre la retraduction
  currentSimulation = simulation;
  
  const r = simulation.resultats;
  const zone = document.getElementById("resultats");
  const attaquantName = getPokemonName(simulation.attaquant);
  const cibleName = getPokemonName(simulation.cible);
  const attackName = getAttackName(simulation.attaque);
  const attackDesc = getAttackDescription(simulation.attaque);
  
  let html = `<div class="result-card">`;
  
  if (currentLanguage === 'fr') {
    html += `<h2>⚔️ ${attaquantName} utilise ${attackName} sur ${cibleName} !</h2>`;
  } else {
    html += `<h2>⚔️ ${attaquantName} uses ${attackName} on ${cibleName}!</h2>`;
  }
  
  html += `<p class="description">${attackDesc}</p>`;
  
  // Ajout de la description détaillée selon le type d'attaque
  html += getSimulationDescription(simulation);
  
  html += `<div class="stats-grid">`;

  if (r.type === "physique") {
    const forceLabel = currentLanguage === 'fr' ? '💪 Force d\'impact' : '💪 Impact Force';
    const energyLabel = currentLanguage === 'fr' ? '⚡ Énergie cinétique' : '⚡ Kinetic Energy';
    const pressureLabel = currentLanguage === 'fr' ? '🎯 Pression d\'impact' : '🎯 Impact Pressure';
    const speedLabel = currentLanguage === 'fr' ? '🏃 Vitesse d\'attaque' : '🏃 Attack Speed';
    const recoilLabel = currentLanguage === 'fr' ? `💨 Recul de ${cibleName}` : `💨 ${cibleName}'s Recoil`;
    const formulasLabel = currentLanguage === 'fr' ? '📐 Formules utilisées' : '📐 Formulas Used';
    const projectedLabel = currentLanguage === 'fr' ? 'Projeté à' : 'Projected to';
    const metersUnit = currentLanguage === 'fr' ? 'mètres' : 'meters';
    const kmhUnit = currentLanguage === 'fr' ? 'km/h' : 'km/h';
    
    html += `
      <div class="stat-box">
        <span class="stat-label">${forceLabel}</span>
        <span class="stat-value">${r.force.toLocaleString()} N</span>
        <span class="stat-compare">${comparerForce(r.force)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${energyLabel}</span>
        <span class="stat-value">${Math.round(r.energieCinetique).toLocaleString()} J</span>
        <span class="stat-compare">${comparerEnergie(r.energieCinetique)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${pressureLabel}</span>
        <span class="stat-value">${Math.round(r.pression).toLocaleString()} Pa</span>
        <span class="stat-compare">${comparerPression(r.pression)}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${speedLabel}</span>
        <span class="stat-value">${r.vitesseAttaquant} m/s</span>
        <span class="stat-compare">${(r.vitesseAttaquant * 3.6).toFixed(1)} ${kmhUnit}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${recoilLabel}</span>
        <span class="stat-value">${r.vitesseRecul.toFixed(1)} m/s</span>
        <span class="stat-compare">${projectedLabel} ${r.distanceRecul.toFixed(1)} ${metersUnit}</span>
      </div>
      <div class="stat-box formula">
        <span class="stat-label">${formulasLabel}</span>
        <span class="stat-value">F = ${simulation.attaquant.poids}kg × ${simulation.attaque.acceleration}m/s²</span>
        <span class="stat-value">Ec = ½ × ${simulation.attaquant.poids}kg × ${r.vitesseAttaquant}²</span>
      </div>
    `;
  } else if (r.type === "electrique") {
    const powerLabel = currentLanguage === 'fr' ? '⚡ Puissance' : '⚡ Power';
    const voltageLabel = currentLanguage === 'fr' ? '🔌 Voltage' : '🔌 Voltage';
    const housesText = currentLanguage === 'fr' ? 'maisons alimentées' : 'houses powered';
    const wallText = currentLanguage === 'fr' ? '× une prise murale' : '× a wall outlet';
    
    html += `
      <div class="stat-box">
        <span class="stat-label">${powerLabel}</span>
        <span class="stat-value">${r.puissance.toLocaleString()} W</span>
        <span class="stat-compare">${r.equivalentMaisons} ${housesText}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${voltageLabel}</span>
        <span class="stat-value">${r.voltage.toLocaleString()} V</span>
        <span class="stat-compare">${(r.voltage / 230).toFixed(0)}${wallText}</span>
      </div>
    `;
  } else if (r.type === "thermique") {
    const tempLabel = currentLanguage === 'fr' ? '🔥 Température' : '🔥 Temperature';
    const eqLabel = currentLanguage === 'fr' ? '💧 Équivalent' : '💧 Equivalent';
    const boilText = currentLanguage === 'fr' ? 'd\'eau portée à ébullition' : 'of water brought to boiling point';
    const litresUnit = currentLanguage === 'fr' ? 'litres' : 'liters';
    const aluminumText = currentLanguage === 'fr' ? 'Fait fondre l\'aluminium (660°C) !' : 'Melts aluminum (660°C)!';
    
    html += `
      <div class="stat-box">
        <span class="stat-label">${tempLabel}</span>
        <span class="stat-value">${r.temperature.toLocaleString()} °C</span>
        <span class="stat-compare">${aluminumText}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${eqLabel}</span>
        <span class="stat-value">${r.litresEauBouillie} ${litresUnit}</span>
        <span class="stat-compare">${boilText}</span>
      </div>
    `;
  }

  html += `</div></div>`;
  zone.innerHTML = html;
}

/**
 * Génère une description détaillée de la simulation selon le type
 */
function getSimulationDescription(simulation) {
  const r = simulation.resultats;
  const attaquantName = getPokemonName(simulation.attaquant);
  const cibleName = getPokemonName(simulation.cible);
  
  let description = `<div class="simulation-description">`;
  
  if (r.type === "physique") {
    if (currentLanguage === 'fr') {
      description += `
        <h3>📊 Analyse de l'attaque physique</h3>
        <p>Le simulateur a calculé les forces en jeu lors de cette attaque physique. Voici ce qu'il s'est passé :</p>
        <ul>
          <li><strong>La force générée</strong> par ${attaquantName} a atteint <strong>${r.force.toLocaleString()} Newtons</strong>. C'est l'intensité brute de l'impact.</li>
          <li><strong>L'énergie cinétique</strong> emmagasinée est de <strong>${Math.round(r.energieCinetique).toLocaleString()} Joules</strong>. C'est le potentiel de destruction à l'impact.</li>
          <li><strong>La quantité de mouvement</strong> est de <strong>${Math.round(r.quantiteMouvement).toLocaleString()} kg·m/s</strong>. C'est la difficulté qu'aura ${cibleName} à résister à ce coup.</li>
          <li><strong>La pression d'impact</strong> atteint <strong>${Math.round(r.pression).toLocaleString()} Pascals</strong>. C'est la concentration de force sur la zone de contact.</li>
          <li>En conséquence, <strong>${cibleName} serait projeté à ${r.vitesseRecul.toFixed(1)} m/s</strong>, soit une distance d'environ <strong>${r.distanceRecul.toFixed(1)} mètres</strong>.</li>
        </ul>
        <p>Les formules utilisées : <strong>F = m × a</strong> pour la force, et <strong>Ec = ½mv²</strong> pour l'énergie cinétique.</p>
      `;
    } else {
      description += `
        <h3>📊 Physical Attack Analysis</h3>
        <p>The simulator calculated the forces involved in this physical attack. Here's what happened:</p>
        <ul>
          <li><strong>The force generated</strong> by ${attaquantName} reached <strong>${r.force.toLocaleString()} Newtons</strong>. This is the raw intensity of the impact.</li>
          <li><strong>The kinetic energy</strong> stored is <strong>${Math.round(r.energieCinetique).toLocaleString()} Joules</strong>. This is the destruction potential at impact.</li>
          <li><strong>The momentum</strong> is <strong>${Math.round(r.quantiteMouvement).toLocaleString()} kg·m/s</strong>. This is the difficulty ${cibleName} will have resisting this blow.</li>
          <li><strong>The impact pressure</strong> reaches <strong>${Math.round(r.pression).toLocaleString()} Pascals</strong>. This is the force concentration on the contact area.</li>
          <li>As a result, <strong>${cibleName} would be projected at ${r.vitesseRecul.toFixed(1)} m/s</strong>, roughly a distance of <strong>${r.distanceRecul.toFixed(1)} meters</strong>.</li>
        </ul>
        <p>Formulas used: <strong>F = m × a</strong> for force, and <strong>Ec = ½mv²</strong> for kinetic energy.</p>
      `;
    }
  } else if (r.type === "electrique") {
    if (currentLanguage === 'fr') {
      description += `
        <h3>⚡ Analyse de l'attaque électrique</h3>
        <p>Le simulateur a calculé la décharge électrique générée par cette attaque. Voici les détails :</p>
        <ul>
          <li><strong>La puissance totale</strong> libérée est de <strong>${r.puissance.toLocaleString()} Watts</strong>. C'est équivalent à alimenter <strong>${r.equivalentMaisons} maisons</strong> !</li>
          <li><strong>Le voltage</strong> atteint <strong>${r.voltage.toLocaleString()} Volts</strong>, soit environ <strong>${(r.voltage / 230).toFixed(0)} fois</strong> la tension d'une prise murale standard.</li>
          <li>Une telle décharge serait absolument dévastratrice. L'électricité causerait des brûlures massives et pourrait arrêter le cœur.</li>
        </ul>
        <p>Formule utilisée : <strong>P = U × I</strong> (Puissance = Voltage × Intensité)</p>
      `;
    } else {
      description += `
        <h3>⚡ Electric Attack Analysis</h3>
        <p>The simulator calculated the electrical discharge generated by this attack. Here are the details:</p>
        <ul>
          <li><strong>The total power</strong> released is <strong>${r.puissance.toLocaleString()} Watts</strong>. This is equivalent to powering <strong>${r.equivalentMaisons} houses</strong>!</li>
          <li><strong>The voltage</strong> reaches <strong>${r.voltage.toLocaleString()} Volts</strong>, roughly <strong>${(r.voltage / 230).toFixed(0)} times</strong> the voltage of a standard wall outlet.</li>
          <li>Such a discharge would be absolutely devastating. The electricity would cause massive burns and could stop the heart.</li>
        </ul>
        <p>Formula used: <strong>P = U × I</strong> (Power = Voltage × Intensity)</p>
      `;
    }
  } else if (r.type === "thermique") {
    if (currentLanguage === 'fr') {
      description += `
        <h3>🔥 Analyse de l'attaque thermique</h3>
        <p>Le simulateur a calculé l'énergie thermique libérée par cette attaque. Voici ce que cela signifie :</p>
        <ul>
          <li><strong>La température</strong> atteint <strong>${r.temperature.toLocaleString()} °C</strong>. C'est extrêmement chaud !</li>
          <li>À cette température, cette attaque pourrait <strong>faire fondre l'aluminium (660°C)</strong> et même d'autres métaux.</li>
          <li><strong>L'énergie thermique</strong> est suffisante pour faire bouillir <strong>${r.litresEauBouillie} litres d'eau</strong> (en la chauffant de 0°C à 100°C).</li>
          <li>Tout ce qui se trouve à proximité subirait des dégâts thermiques catastrophiques.</li>
        </ul>
        <p>Formule utilisée : <strong>Q = m × c × ΔT</strong> (Énergie = Masse × Capacité calorifique × Variation de température)</p>
      `;
    } else {
      description += `
        <h3>🔥 Thermal Attack Analysis</h3>
        <p>The simulator calculated the thermal energy released by this attack. Here's what it means:</p>
        <ul>
          <li><strong>The temperature</strong> reaches <strong>${r.temperature.toLocaleString()} °C</strong>. That's extremely hot!</li>
          <li>At this temperature, this attack could <strong>melt aluminum (660°C)</strong> and even other metals.</li>
          <li><strong>The thermal energy</strong> is enough to boil <strong>${r.litresEauBouillie} liters of water</strong> (heating it from 0°C to 100°C).</li>
          <li>Anything nearby would suffer catastrophic thermal damage.</li>
        </ul>
        <p>Formula used: <strong>Q = m × c × ΔT</strong> (Energy = Mass × Specific heat capacity × Temperature change)</p>
      `;
    }
  }
  
  description += `</div>`;
  return description;
}

// Comparaisons fun pour donner du contexte
function comparerForce(newtons) {
  if (currentLanguage === 'fr') {
    if (newtons > 5000) return "💀 Comme un accident de voiture !";
    if (newtons > 2000) return "🥊 Plus fort qu'un champion de boxe";
    if (newtons > 500) return "🦵 Comme un bon coup de pied";
    return "👋 Comme une grosse claque";
  } else {
    if (newtons > 5000) return "💀 Like a car crash!";
    if (newtons > 2000) return "🥊 Stronger than a boxing champion";
    if (newtons > 500) return "🦵 Like a good kick";
    return "👋 Like a hard slap";
  }
}

function comparerEnergie(joules) {
  if (currentLanguage === 'fr') {
    if (joules > 100000) return "🚗 Comme une voiture à 50km/h";
    if (joules > 10000) return "🏹 Comme une flèche d'arbalète";
    if (joules > 1000) return "⚾ Comme une balle de baseball";
    return "🎾 Comme une balle de tennis";
  } else {
    if (joules > 100000) return "🚗 Like a car at 50 km/h";
    if (joules > 10000) return "🏹 Like a crossbow arrow";
    if (joules > 1000) return "⚾ Like a baseball";
    return "🎾 Like a tennis ball";
  }
}

function comparerPression(pascals) {
  if (currentLanguage === 'fr') {
    if (pascals > 100000) return "Peut briser du béton";
    if (pascals > 50000) return "Peut casser un os";
    if (pascals > 10000) return "Grosse douleur garantie";
    return "Ça fait mal quand même";
  } else {
    if (pascals > 100000) return "Can break concrete";
    if (pascals > 50000) return "Can break a bone";
    if (pascals > 10000) return "Guaranteed severe pain";
    return "Hurts anyway";
  }
}


// ===== INITIALISATION =====

function init() {
  const selAttaquant = document.getElementById("selectAttaquant");
  const selCible = document.getElementById("selectCible");
  const selAttaque = document.getElementById("selectAttaque");

  const chooseAttacker = currentLanguage === 'fr' ? "-- Choisir un attaquant --" : "-- Choose an attacker --";
  const chooseTarget = currentLanguage === 'fr' ? "-- Choisir une cible --" : "-- Choose a target --";
  const chooseAttack = currentLanguage === 'fr' ? "-- Choisir une attaque --" : "-- Choose an attack --";

  // Option vide par défaut
  selAttaquant.innerHTML = `<option value="">` + chooseAttacker + `</option>`;
  selCible.innerHTML = `<option value="">` + chooseTarget + `</option>`;
  selAttaque.innerHTML = `<option value="">` + chooseAttack + `</option>`;

  pokemons.forEach((p, i) => {
    const pokeName = getPokemonName(p);
    selAttaquant.innerHTML += `<option value="${i}">${pokeName} (${p.poids}kg)</option>`;
    selCible.innerHTML += `<option value="${i}">${pokeName} (${p.poids}kg)</option>`;
  });

  attaques.forEach((a, i) => {
    const attackName = getAttackName(a);
    const attackType = getAttackType(a);
    selAttaque.innerHTML += `<option value="${i}">${attackName} (${attackType})</option>`;
  });
}

function updatePreview(role) {
  const selectId = role === "attaquant" ? "selectAttaquant" : "selectCible";
  const previewId = role === "attaquant" ? "previewAttaquant" : "previewCible";
  const select = document.getElementById(selectId);
  const preview = document.getElementById(previewId);
  
  if (!select || !select.value) return; // Vérif de sécurité
  
  const p = pokemons[parseInt(select.value)];
  
  if (!p) return; // Pokémon invalide
  
  const pokeName = getPokemonName(p);
  const pokeType = getPokemonType(p);
  const weightLabel = currentLanguage === 'fr' ? 'Poids' : 'Weight';
  const speedLabel = currentLanguage === 'fr' ? 'Vitesse' : 'Speed';
  const typeLabel = currentLanguage === 'fr' ? 'Type' : 'Type';

  preview.innerHTML = `
    <img src="${p.image}" alt="${pokeName}">
    <div class="preview-stats">
      <span>${weightLabel}: ${p.poids} kg</span>
      <span>${speedLabel}: ${p.vitesse} (${statVersMs(p.vitesse)} m/s)</span>
      <span>${typeLabel}: ${pokeType}</span>
    </div>
  `;
}

function lancerSimulation() {
  const a = parseInt(document.getElementById("selectAttaquant").value);
  const c = parseInt(document.getElementById("selectCible").value);
  const att = parseInt(document.getElementById("selectAttaque").value);

  // Vérification que les valeurs sont valides
  if (isNaN(a) || isNaN(c) || isNaN(att)) {
    alert(currentLanguage === 'fr' ? 'Veuillez sélectionner un attaquant, une cible et une attaque' : 'Please select an attacker, target, and attack');
    return;
  }

  const simulation = simulerAttaque(a, c, att);

  afficherResultats(simulation);
  
  // Petit effet visuel
  document.getElementById("resultats").scrollIntoView({ behavior: "smooth" });
}

function toggleFormules() {
  const panel = document.getElementById("formules-panel");
  const btn = document.getElementById("btnFormules");
  panel.classList.toggle("hidden");
  
  if (panel.classList.contains("hidden")) {
    const textFr = "📚 Comprendre les formules";
    const textEn = "📚 Understand the formulas";
    btn.textContent = currentLanguage === 'fr' ? textFr : textEn;
  } else {
    const textFr = "✕ Fermer les explications";
    const textEn = "✕ Close explanations";
    btn.textContent = currentLanguage === 'fr' ? textFr : textEn;
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

