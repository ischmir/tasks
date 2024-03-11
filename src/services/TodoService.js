import '@/configs/firebase';
import {
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const db = getFirestore();
