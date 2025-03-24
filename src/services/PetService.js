import '@/configs/firebase';
import {
    connectFirestoreEmulator,
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const db = getFirestore();
const col = collection(db, 'pets');
let disableUpdate = false;


if (import.meta.env.MODE === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080);
}


export const createPet = async (pet) => {
    try {
        const ref = await addDoc(col, {
            ...pet,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return { id: ref.id, ...pet };
    } catch (e) {
        return { error: e };
    }
};

// Fetch all pets
export const getPets = async () => {
    const pets = [];

    try {
        const querySnapshot = await getDocs(col);
        querySnapshot.forEach((doc) =>
            pets.push({
                id: doc.id,
                ...doc.data(),
            })
        );

        return pets;
    } catch (e) {
        return { error: e };
    }
};

// Fetch a single pet by ID
export const getPetById = async (id) => {
    try {
        const petRef = doc(db, 'pets', id);
        const petSnapshot = await getDoc(petRef);

        if (petSnapshot.exists()) {
            return { id: petSnapshot.id, ...petSnapshot.data() };
        } else {
            return { error: 'Pet not found' };
        }
    } catch (e) {
        return { error: e };
    }
};

// Listen for real-time updates
export const onUpdate = (cb) => {
    if (disableUpdate) return;
    console.log('onUpdate');
    if (typeof cb !== 'function') return;

    const unsub = onSnapshot(col, async (snapshot) => {
        try {
            const pets = [];
            snapshot.forEach((doc) =>
                pets.push({
                    id: doc.id,
                    ...doc.data(),
                })
            );
            cb(pets); // Pass the updated pets list to the callback
        } catch (e) {
            console.error('Error in onUpdate:', e);
        }
    });

    return unsub; // Return the unsubscribe function
};

// Update an existing pet
export const updatePet = async (id, pet) => {
    disableUpdate = true;
    try {
        const ref = doc(db, 'pets', id);
        await updateDoc(ref, {
            ...pet,
            updatedAt: new Date(),
        });

        return pet;
    } catch (e) {
        return { error: e };
    } finally {
        disableUpdate = false;
    }
};

export const deletePet = async (id) => {
    try {
        const ref = doc(db, 'pets', id);
        await deleteDoc(ref);

        return { success: true };
    } catch (e) {
        return { error: e };
    }
};