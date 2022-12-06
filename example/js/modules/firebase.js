// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXEL9NtaXEAzXJo0M7lHibBF4QbBOSkEg",
  authDomain: "solaris-f6c95.firebaseapp.com",
  projectId: "solaris-f6c95",
  storageBucket: "solaris-f6c95.appspot.com",
  messagingSenderId: "164463429902",
  appId: "1:164463429902:web:8a932b69a30fd42480af5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function saveFavPlanet(planets, i) {
    try {
        await addDoc(collection(db, 'favPlanets'), {
            planetName: `${planets[i].name}`,
            planetSize: `${planets[i].circumference}`,
            DistanceFromEarth: `${planets[i].distance}`
        })
    } catch (error) {
        console.log(error);
    }
}

async function getFavPlanets() {
    const favPlanets = await getDocs(collection(db, 'favPlanets'));
    console.log(favPlanets);

    favPlanets.forEach((favPlanet) => {
        console.log(favPlanet.id);
        console.log(favPlanet.data());
        const elem = `button`
    });
}

export { saveFavPlanet }