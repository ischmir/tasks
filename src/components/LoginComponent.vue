<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                errorMessage: "",
            };
        },

        methods: {
            async handleLogin() {
                try {
                    if (this.email === "admin@example.com" && this.password === "password") {
                        localStorage.setItem("token", "dummy-token"); // Simulate token storage
                        this.$router.push("/adminpanel");
                    } else {
                        throw new Error("Invalid email or password");
                    }
                } catch (error) {
                    this.errorMessage = error.message;
                }
            },
        },
    };
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <div class="login-container__form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div class="login-container__form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<style scoped>
    .login-container {
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
</style>