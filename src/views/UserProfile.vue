<template>
  <div class="profile">
    <h2>User Profile</h2>
    <form @submit.prevent="updateProfile">
      <input type="text" v-model="name" placeholder="Full Name" required />
      <input type="number" v-model="age" placeholder="Age" />
      <input type="text" v-model="gender" placeholder="Gender" />
      <input type="text" v-model="bio" placeholder="Short Bio" />
      <input type="file" @change="uploadPhoto" />
      <button type="submit">Update Profile</button>
    </form>
    <button @click="logout">Logout</button>
    <!-- Logout button -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      age: null,
      gender: "",
      bio: "",
      file: null,
    };
  },
  mounted() {
    this.fetchUserProfile(); // Separate method for fetching profile
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const user = response.data.user;
        this.name = user.name;
        this.age = user.age;
        this.gender = user.gender;
        this.bio = user.bio;
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    },
    uploadPhoto(event) {
      this.file = event.target.files[0]; // Capture the file
    },
    async updateProfile() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("age", this.age);
      formData.append("gender", this.gender);
      formData.append("bio", this.bio);
      if (this.file) formData.append("photo", this.file);

      try {
        await axios.put("/api/users/profile", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Profile updated");
        alert("Profile updated successfully!"); // Notify user of success
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Failed to update profile. Please try again."); // Notify user of failure
      }
    },
    logout() {
      localStorage.removeItem("token"); // Remove token on logout
      localStorage.removeItem("user"); // Optional: remove user data
      this.$router.push("/login"); // Redirect to login page
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: auto;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
