<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSignUp() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            username: this.username, // Ensure username is included in the signup
            email: this.email,
            password: this.password,
          }
        );
        if (response.data.success) {
          localStorage.setItem("token", response.data.token); // Store the token if needed
          this.$router.push("/login"); // Redirect to the login page after signup
        } else {
          // Handle signup failure (e.g., show an error message)
          console.error("Signup failed:", response.data.message);
        }
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add some basic styling */
form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
