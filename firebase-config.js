
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB5Ey-aprwiikSYt3CJ3lHY2-yffk8cIHg",
    authDomain: "fir-auth-ebefd.firebaseapp.com",
    projectId: "fir-auth-ebefd",
    // storageBucket: "fir-auth-ebefd.firebasestorage.app",
      storageBucket: "fir-auth-ebefd.appspot.com",
    messagingSenderId: "92805692442",
    appId: "1:92805692442:web:1adee58b96a85f61ff65a3",
    measurementId: "G-4PD57VFZX9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };