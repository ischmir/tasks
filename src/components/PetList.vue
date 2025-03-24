<script>
    import { getPets } from "@/services/PetService";

    export default {
        data() {
            return {
                pets: [],
            };
        },
        async created() {
            try {
                const pets = await getPets();
                if (!pets.error) {
                    this.pets = pets;
                } else {
                    console.error("Error fetching pets:", pets.error);
                }
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        },
        methods: {
            viewPetDetails(id) {
                this.$router.push(`/pets/${id}`);
            },
        },
    };
</script>

<template>
    <div class="pet-list">
        <h1>Pet List</h1>
        <ul v-if="pets.length">
            <li v-for="pet in pets" :key="pet.id" @click="viewPetDetails(pet.id)" class="clickable">
                <h2>{{ pet.name }}</h2>
                <p>Type: {{ pet.type }}</p>
                <p>Age: {{ pet.age }}</p>
                <p>Breed: {{ pet.breed }}</p>
            </li>
        </ul>
        <p v-else>No pets found.</p>
    </div>
</template>
  
<style scoped>
    .pet-list {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }
  
    .pet-list ul {
        list-style-type: none;
        padding: 0;
    }
  
    .pet-list li {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        background-color: #f9f9f9;
    }

    .pet-list li:hover {
        background-color: #e6e6e6;
    }
  
    .pet-list h2 {
        margin: 0 0 10px;
    }
  
    .pet-list p {
        margin: 5px 0;
    }
</style>

