import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase Console > Project settings > Your apps se actual web config paste karein.
const firebaseConfig = {
  apiKey: "AIzaSyAhgVRKBLExrO4yBJBxazLgRQqHxs5XKO4",
  authDomain: "mobasshera.firebaseapp.com",
  projectId: "mobasshera",
  storageBucket: "mobasshera.firebasestorage.app",
  messagingSenderId: "208386629391",
  appId: "1:208386629391:web:4a7b3067f0277f8c2fe87a",
  measurementId: "G-TN3RE3K37L"
};

// Firebase config is present; users must still be created in Firebase Authentication.
const isConfigured = true;

const $ = (id) => document.getElementById(id);
const loginScreen = $("loginScreen");
const loveApp = $("loveApp");
const loginForm = $("loginForm");
const loginError = $("loginError");
const toast = $("toast");
let toastTimer, musicAudio = null, musicPlaying = false, countdownTimer = null;
let auth = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// Fail closed: login remains locked until real Firebase config is added.
if (isConfigured) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginScreen.classList.add("hidden");
      loveApp.classList.remove("hidden");
      startCountdown();
    } else {
      loginScreen.classList.remove("hidden");
      loveApp.classList.add("hidden");
      if (countdownTimer) clearInterval(countdownTimer);
    }
  });
} else {
  loginError.textContent = "Setup required: add your Firebase web config in script.js.";
}

const togglePasswordBtn = $("togglePasswordBtn");
if (togglePasswordBtn) {
  togglePasswordBtn.addEventListener("click", () => {
    const passwordInput = $("password");
    const showing = passwordInput.type === "text";
    passwordInput.type = showing ? "password" : "text";
    togglePasswordBtn.textContent = showing ? "Show" : "Hide";
    togglePasswordBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "";
  if (!auth) {
    loginError.textContent = "Pehle script.js mein Firebase configuration add karein.";
    return;
  }
  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Opening our little world...";
  try {
    await signInWithEmailAndPassword(auth, $("email").value.trim(), $("password").value);
  } catch {
    loginError.textContent = "Login nahi ho paya. Email aur password check karein.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Unlock Our Love ♥";
  }
});

$("logoutBtn").addEventListener("click", async () => {
  if (!auth) return;
  try { await signOut(auth); $("password").value = ""; showToast("Logged out safely. Take care ❤️"); }
  catch { showToast("Logout nahi ho paya. Dobara try karein."); }
});

const nightMessages = [
  "Raat ki khamoshi mein bhi ek naam dil ko sukoon deta hai… Mobashshera, that name is yours. ❤️",
  "Kaash har raat ke aakhri pal mein tumhe keh sakun: apna khayal rakhna, tum mere liye bahut special ho. 🌙",
  "Distance ho ya busy day, meri duaon mein tumhari muskurahat hamesha rahegi. 💗",
  "Good night, meri hone wali humsafar. May your dreams be gentle and your heart feel loved. ✨",
  "Tumse baat karne ka intezaar bhi ek pyari feeling hai. Ek din, InshaAllah, aur bhi khoobsurat yaadein banayenge. 💌",
  "Aaj ka din jaisa bhi raha ho, yaad rakhna: you deserve kindness, peace and a thousand reasons to smile. 🌹"
];
let messageIndex = 0;
$("nextMessage").addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % nightMessages.length;
  $("nightMessage").textContent = nightMessages[messageIndex];
});

const letters = [
  { title: "When I Miss You 💌", text: "Mobashshera,\n\nKabhi-kabhi dil chahta hai ki tumse bahut saari baatein karun, tumhari hasi sunun aur tumhara din kaisa raha ye jaanun.\n\nAbhi hum apni kahani ke shuruaati panne likh rahe hain, aur main chahta hoon ki har naya panna respect, trust aur pyaar se bhara ho.\n\nYou are someone I am excited to know, care for and build a future with. ❤️" },
  { title: "A Promise For You 🌹", text: "Meri pyaari Mobashshera,\n\nMain wada karta hoon ki tumhari baat sunne ki koshish karunga, tumhari feelings ki izzat karunga aur hamare rishte ko waqt aur care dunga.\n\nPerfect hona zaroori nahi, ek doosre ko samajhna zaroori hai.\n\nInshaAllah, we will keep learning how to make each other feel safe, valued and loved. 💍" },
  { title: "Before You Sleep 🌙", text: "Good night, Mobashshera. ❤️\n\nAaj raat sukoon se sona, saari pareshaniyan thodi der ke liye bhool jaana. Kaash tumhari neend gulab ki tarah narm aur tumhare khwab sitaron ki tarah roshan hon.\n\nKal ek naya din hai, ek nayi muskurahat ke saath.\n\nSweet dreams, future Mrs. Sanaul. ✨" }
];
document.querySelectorAll(".letter-card").forEach((card) => {
  card.addEventListener("click", () => {
    const letter = letters[Number(card.dataset.letter)];
    if (!letter) return;
    $("letterTitle").textContent = letter.title;
    $("letterText").textContent = letter.text;
    $("letterReveal").classList.remove("hidden");
    $("letterReveal").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
$("closeLetter").addEventListener("click", () => $("letterReveal").classList.add("hidden"));

// Default date: 1 November 2027. Update to your actual wedding date.
const weddingDate = new Date(2027, 10, 1, 0, 0, 0);
function startCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  function updateCountdown() {
    const remaining = weddingDate.getTime() - Date.now();
    if (remaining <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "♥");
      $("countdownNote").textContent = "Our beautiful new chapter begins. ❤️";
      clearInterval(countdownTimer);
      return;
    }
    $("days").textContent = Math.floor(remaining / 86400000);
    $("hours").textContent = Math.floor((remaining % 86400000) / 3600000);
    $("minutes").textContent = Math.floor((remaining % 3600000) / 60000);
    $("seconds").textContent = Math.floor((remaining % 60000) / 1000);
  }
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

const heartsContainer = $("hearts");
const heartSymbols = ["♥", "♡", "❤", "✦"];
function createHeart() {
  if (document.hidden || document.querySelectorAll(".floating-heart").length > 24) return;
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 96}%`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.animationDuration = `${6 + Math.random() * 6}s`;
  heartsContainer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}
const heartInterval = setInterval(createHeart, 850);
window.addEventListener("pagehide", () => clearInterval(heartInterval));

$("heartBtn").addEventListener("click", () => {
  for (let i = 0; i < 7; i++) setTimeout(createHeart, i * 90);
  showToast("Ek virtual hug aur dher saara pyaar! ❤️");
});

$("musicBtn").addEventListener("click", async () => {
  if (!musicAudio) {
    musicAudio = new Audio("assets/romantic.mp3");
    musicAudio.loop = true;
    musicAudio.volume = 0.35;
  }
  if (!musicPlaying) {
    try {
      await musicAudio.play();
      musicPlaying = true;
      $("musicBtn").textContent = "♫ Music: On";
      showToast("Music is playing. Enjoy this moment ❤️");
    } catch {
      showToast("assets/romantic.mp3 mein apni audio file add karein.");
    }
  } else {
    musicAudio.pause();
    musicPlaying = false;
    $("musicBtn").textContent = "♫ Music: Off";
    showToast("Music paused. 💗");
  }
});


// Lover Images gallery: previews selected images locally in this browser.
const loverPhotoInput = $("loverPhotoInput");
const loverPhotoGallery = $("loverPhotoGallery");
if (loverPhotoInput && loverPhotoGallery) {
  loverPhotoInput.addEventListener("change", () => {
    const files = Array.from(loverPhotoInput.files || []).filter(file => file.type.startsWith("image/"));
    if (!files.length) return;
    const emptyCard = loverPhotoGallery.querySelector(".photo-empty");
    if (emptyCard) emptyCard.remove();
    files.forEach(file => {
      const card = document.createElement("article");
      card.className = "lover-photo-card glass";
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      image.alt = "A special lover memory";
      image.loading = "lazy";
      image.addEventListener("load", () => URL.revokeObjectURL(image.src), { once: true });
      const caption = document.createElement("p");
      caption.textContent = file.name.replace(/\.[^.]+$/, "") || "Our special memory ❤️";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "photo-remove-btn";
      remove.textContent = "Remove ×";
      remove.setAttribute("aria-label", "Remove this photo");
      remove.addEventListener("click", () => card.remove());
      card.append(image, caption, remove);
      loverPhotoGallery.appendChild(card);
    });
    loverPhotoInput.value = "";
    showToast("Your lovely photos are added to this preview ❤️");
  });
}
