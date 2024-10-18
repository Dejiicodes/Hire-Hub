<!-- src/components/Navigation.vue -->
<template>
  <nav>
    <ul class="nav-links">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/jobs">Jobs</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/profile">Profile</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin">Admin Dashboard</router-link>
      </li>
      <li v-if="isLoggedIn">
        <a href="#" @click="logout">Logout</a>
      </li>
      <li v-else>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      userRole: null, // 'user' or 'admin'
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
    isAdmin() {
      return this.userRole === "admin";
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.userRole = payload.role;
    }
  },
};
</script>

<style scoped>
nav {
  background-color: #4caf50;
  padding: 1em;
}
.nav-links {
  display: flex;
  list-style: none;
}
.nav-links li {
  margin-right: 20px;
}
</style>
