import '@/configs/firebase';
import {
  connectFirestoreEmulator,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
} from 'firebase/firestore';

const db = getFirestore();
const col = collection(db, 'todos');

if(import.meta.env.MODE === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export const createTodo = async (todo) => {
  try {
    const ref = await addDoc(col, {
      ...todo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return todo;
  } catch (e) {
    return {
      error: e,
    };
  }
};

export const getTodos = async () => {
  const todos = [];

  try {
    const querySnapshot = await getDocs(col);
    querySnapshot.forEach((doc) => todos.push({
      id: doc.id,
      ...doc.data(),
    }));

    return todos;
  } catch (e) {
    return {
      error: e,
    };
  }
};

export const onUpdate = (cb) => {
  if(typeof cb !== 'function') return;
  const unsub = onSnapshot(col, async (snapshot) => {
    cb(await getTodos());
  });
};
