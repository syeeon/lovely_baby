import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCJK2cBL24CMvk158J6VNBYuY2vO2Da6s4",
  authDomain: "baby-1306b.firebaseapp.com",
  databaseURL: "https://baby-1306b-default-rtdb.firebaseio.com",
  projectId: "baby-1306b",
  storageBucket: "baby-1306b.appspot.com",
  messagingSenderId: "759215507977",
  appId: "1:759215507977:web:55d53a0e2c12cb9d7a06d8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
