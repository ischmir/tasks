<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '@/configs/firebase';

    const route = useRoute();
    const petId = route.params.id;
    const pet = ref(null);
    const errorMessage = ref('');

    onMounted(async () => {
        try {
            const petRef = doc(db, 'pets', petId);
            const petSnapshot = await getDoc(petRef);

            if (petSnapshot.exists()) {
                pet.value = { id: petSnapshot.id, ...petSnapshot.data() };
            } else {
                errorMessage.value = 'Pet not found.';
            }
        } catch (error) {
            errorMessage.value = 'Failed to fetch pet details.';
            console.error(error);
        }
    });
</script>

<template>
    <div class="pet-details">
        <h1>Pet Details</h1>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <div v-else-if="pet">
            <h2>{{ pet.name }}</h2>
            <p>Type: {{ pet.type }}</p>
            <p>Age: {{ pet.age }}</p>
            <p>Breed: {{ pet.breed }}</p>
        </div>
        <p v-else>Loading...</p>
    </div>
</template>

<style scoped>
    .pet-details {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .error {
        color: red;
        margin-top: 10px;
    }
</style>
