// ✅ Firebase v9+ Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔐 Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// 🔐 Admin Login Function
window.login = async function () {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;
  const errorMsg = document.getElementById("error-msg");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in:", userCredential.user);
    window.location.href = "admin/index.html"; // redirect to admin panel
  } catch (error) {
    console.error(error);
    errorMsg.innerText = "Invalid credentials. Please try again.";
  }
};

// 🔤 Update About Me Text
const aboutForm = document.getElementById("aboutForm");
if (aboutForm) {
  aboutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = document.getElementById("aboutText").value;
    try {
      await setDoc(doc(db, "aboutme", "main"), { text });
      alert("About Me updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update About Me.");
    }
  });
}

// 📸 Upload Photos
const photoForm = document.getElementById("photoForm");
if (photoForm) {
  photoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = document.getElementById("photoFile").files[0];
    if (!file) return alert("Select a photo.");

    const storageRef = ref(storage, "photos/" + file.name);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "photos"), { url });
      alert("Photo uploaded!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo.");
    }
  });
}

// 🎓 Upload Certificates
const certForm = document.getElementById("certForm");
if (certForm) {
  certForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = document.getElementById("certFile").files[0];
    if (!file) return alert("Select a certificate.");

    const storageRef = ref(storage, "certificates/" + file.name);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "certificates"), { url });
      alert("Certificate uploaded!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload certificate.");
    }
  });
}
