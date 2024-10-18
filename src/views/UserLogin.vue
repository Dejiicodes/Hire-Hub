<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <router-link to="/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        // Handle role-based redirect
        const role = response.data.role;
        localStorage.setItem("token", response.data.token);

        if (role === "admin") {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/jobs");
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
}
</style>
i
