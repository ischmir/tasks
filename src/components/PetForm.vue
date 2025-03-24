<script setup>
    import { ref } from 'vue';
    import { createPet } from '@/services/PetService';

    const name = ref('');
    const type = ref('');
    const age = ref('');
    const breed = ref('');
    const error = ref('');
    const successMessage = ref('');

    const onCreatePet = async () => {
        if (!name.value || !type.value || !age.value || !breed.value) {
            error.value = 'All fields are required.';
            return;
        }

        error.value = '';
        successMessage.value = '';

        try {
            await createPet({
                name: name.value,
                type: type.value,
                age: parseInt(age.value),
                breed: breed.value,
            });

            name.value = '';
            type.value = '';
            age.value = '';
            breed.value = '';
            successMessage.value = 'Pet added successfully!';
        } catch (e) {
            error.value = 'Failed to add pet. Please try again.';
            console.error(e);
        }
    };
</script>

<template>
    <div class="pet-form">
        <h1>Add a New Pet</h1>
        <form @submit.prevent="onCreatePet">
            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" v-model="name" placeholder="Enter pet name" required />
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <input id="type" v-model="type" placeholder="Enter pet type (e.g., Dog, Cat)" required />
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input id="age" v-model="age" type="number" placeholder="Enter pet age" required />
            </div>
            <div class="form-group">
                <label for="breed">Breed</label>
                <input id="breed" v-model="breed" placeholder="Enter pet breed" required />
            </div>
            <button type="submit">Add Pet</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
</template>

<style scoped>
    .pet-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    .error {
        color: red;
        margin-top: 10px;
    }

    .success {
        color: green;
        margin-top: 10px;
    }
</style>