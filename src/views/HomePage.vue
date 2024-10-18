<template>
  <div class="home">
    <h1>Welcome to HireHub</h1>
    <p>Your platform to connect with remote job opportunities.</p>
    <router-link to="/login">
      <button class="btn btn-primary">Get Started</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
