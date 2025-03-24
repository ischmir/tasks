import { ref, onUnmounted } from 'vue';
import { defineStore } from 'pinia';
import * as petService from '@/services/PetService';

export const usePetStore = defineStore('animals', () => {
    const animals = ref([]);
    let unsubscribe = null;

    unsubscribe = petService.onUpdate((data) => {
        animals.value = data;
    });

    onUnmounted(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    const createPetListing = async (pet) => {
        try {
            const res = await petService.createPet(pet);
            return res;
        } catch (e) {
            return {
                error: e,
            };
        }
    };

    return {
        createPetListing,
        animals,
    };
});