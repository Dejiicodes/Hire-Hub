<template>
  <div class="dashboard">
    <h2>Admin Dashboard</h2>
    <div>
      <h3>Users</h3>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }} -

          {{ user.email }}
        </li>
      </ul>
    </div>
    <div>
      <h3>Edit Job Listings</h3>
      <!-- Add job editing functionality here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, username: "john_doe", email: "john@example.com" },
        { id: 2, username: "jane_smith", email: "jane@example.com" },
      ],
    };
  },
};
</script>

<style scoped>
.dashboard {
  margin-top: 50px;
}
</style>
