<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
console.log(router.getRoutes());

const routes = router.getRoutes();
</script>

<template>
    <nav>
        <menu>
            <li 
                v-for="route in routes"
                :key="route.path"
            >
                <RouterLink                    
                    :to="route.path"
                >
                    {{ route.meta.title || route.name || route.path }}
                </RouterLink>
            </li>
        </menu>
    </nav>
</template>