// app.js

// Firebase Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config (same as in admin.js)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔤 Load About Me
async function loadAboutMe() {
  const docRef = doc(db, "aboutme", "main");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    document.getElementById("aboutContent").innerText = docSnap.data().text;
  } else {
    document.getElementById("aboutContent").innerText = "Coming soon...";
  }
}

// 🖼️ Load Photos
async function loadPhotos() {
  const photoContainer = document.getElementById("photoGallery");
  const querySnapshot = await getDocs(collection(db, "photos"));
  querySnapshot.forEach((doc) => {
    const img = document.createElement("img");
    img.src = doc.data().url;
    img.alt = "Uploaded Photo";
    img.className = "gallery-img";
    photoContainer.appendChild(img);
  });
}

// 🎓 Load Certificates
async function loadCertificates() {
  const certContainer = document.getElementById("certList");
  const querySnapshot = await getDocs(collection(db, "certificates"));
  querySnapshot.forEach((doc) => {
    const a = document.createElement("a");
    a.href = doc.data().url;
    a.target = "_blank";
    a.innerText = "📜 View Certificate";
    a.className = "certificate-link";
    certContainer.appendChild(a);
  });
}

// 📞 WhatsApp Button
function setupWhatsAppButton() {
  const whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      window.open("https://wa.me/91YOURNUMBER", "_blank");
    });
  }
}

// 🚀 On Load
window.addEventListener("DOMContentLoaded", () => {
  loadAboutMe();
  loadPhotos();
  loadCertificates();
  setupWhatsAppButton();
});
