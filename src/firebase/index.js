import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({ 
  apiKey: "AIzaSyDH-rmvYVH5kAvY4wI-Zzqf1qFFEZQvzYU",
  authDomain: "liteflix-cd0b6.firebaseapp.com",
  projectId: "liteflix-cd0b6",
  storageBucket: "liteflix-cd0b6.appspot.com",
  messagingSenderId: "992656210143",
  appId: "1:992656210143:web:3682ccc2601ff86fbd516a",
  measurementId: "G-KLNK52ZZZ8"
 });

const storage = getFirestore(firebaseApp)

export { storage };