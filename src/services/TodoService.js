import '@/configs/firebase';
import {
  connectFirestoreEmulator,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

const db = getFirestore();
const col = collection(db, 'todos');
let disableUpdate = false;

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
  if(disableUpdate) return;
  console.log('onUpdate');
  if(typeof cb !== 'function') return;
  const unsub = onSnapshot(col, async (snapshot) => {
    cb(await getTodos());
  });
};

export const updateTodo = async (id, todo) => {
  disableUpdate = true;
  try {
    const ref = doc(db, 'todos', id);
    await updateDoc(ref, {
      ...todo,
      updatedAt: new Date(),
    });

    return todo;
  } catch (e) {
    return {
      error: e,
    };
  } finally {
    disableUpdate = false;
  }
};
