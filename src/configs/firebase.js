import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArPIFmHtvRAQ_idJKVgsUpRTWB8ejxOMI",
  authDomain: "fir-test-e3cff.firebaseapp.com",
  projectId: "fir-test-e3cff",
  storageBucket: "fir-test-e3cff.appspot.com",
  messagingSenderId: "674954600282",
  appId: "1:674954600282:web:db8b13171775aef9459d63",
  measurementId: "G-G6RLF12EP0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
