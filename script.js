// Traduction des labels en plusieurs langues
const translations = {
  en: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds", merryChristmas: "🎄 Merry Christmas! 🎄" },
  fr: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes", merryChristmas: "🎄 Joyeux Noël ! 🎄" },
  es: { days: "Días", hours: "Horas", minutes: "Minutos", seconds: "Segundos", merryChristmas: "🎄 ¡Feliz Navidad! 🎄" },
  de: { days: "Tage", hours: "Stunden", minutes: "Minuten", seconds: "Sekunden", merryChristmas: "🎄 Frohe Weihnachten! 🎄" },
  it: { days: "Giorni", hours: "Ore", minutes: "Minuti", seconds: "Secondi", merryChristmas: "🎄 Buon Natale! 🎄" },
  zh: { days: "天", hours: "小时", minutes: "分钟", seconds: "秒", merryChristmas: "🎄 圣诞快乐！🎄" }
};

// Fonction pour détecter la langue navigateur et retourner une langue supportée
function detectUserLanguage() {
  const lang = navigator.language || navigator.userLanguage || "en";
  const shortLang = lang.split("-")[0];
  return translations[shortLang] ? shortLang : "en";
}

// Mise à jour des labels selon la langue
function updateLabels(lang) {
  const labels = translations[lang] || translations["en"];
  document.getElementById("days-label").textContent = labels.days;
  document.getElementById("hours-label").textContent = labels.hours;
  document.getElementById("minutes-label").textContent = labels.minutes;
  document.getElementById("seconds-label").textContent = labels.seconds;
  return labels;
}

// Compteur en temps réel
function updateCountdown(lang) {
  const now = new Date();

  // 🎄 Si on est le 25 décembre
  if (now.getDate() === 25 && now.getMonth() === 11) {
    const labels = translations[lang] || translations["en"];
    document.getElementById("countdown").textContent = labels.merryChristmas;
    return;
  }

  let year = now.getFullYear();
  let christmas = new Date(year, 11, 25, 0, 0, 0); // 25 décembre minuit

  // 🎯 Si on est après Noël, on cible Noël de l'année suivante
  if (now > christmas) {
    christmas = new Date(year + 1, 11, 25, 0, 0, 0);
  }

  const diff = christmas - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  updateLabels(lang);
}

// Flocons de neige animés
function createSnowflakes() {
  const snowflakeCount = 30;

  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflakeOnce();
  }
}

function createSnowflakeOnce() {
  const flake = document.createElement("div");
  flake.classList.add("snowflake");
  flake.style.left = Math.random() * 100 + "vw";
  flake.style.animationDuration = 5 + Math.random() * 10 + "s";
  flake.style.fontSize = 12 + Math.random() * 18 + "px";
  flake.style.opacity = 0.6 + Math.random() * 0.4;
  flake.textContent = "❄";
  document.body.appendChild(flake);

  setTimeout(() => {
    flake.remove();
    createSnowflakeOnce();
  }, parseFloat(flake.style.animationDuration) * 1000);
}

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
  const userLang = detectUserLanguage();

  updateCountdown(userLang);
  setInterval(() => updateCountdown(userLang), 1000);

  createSnowflakes();
});
