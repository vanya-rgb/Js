import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPDN5MfmujYBykLLNWFt2gFA3yrvqyBjw",
  authDomain: "vue-auction-ce723.firebaseapp.com",
  databaseURL: "https://vue-auction-ce723-default-rtdb.firebaseio.com",
  projectId: "vue-auction-ce723",
  storageBucket: "vue-auction-ce723.appspot.com",
  messagingSenderId: "1072287996529",
  appId: "1:1072287996529:web:01ee4ed280e2b7bc9099d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const storage = getStorage(app)
export default db
