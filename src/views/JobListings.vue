<template>
  <div class="jobs">
    <h2>Available Jobs</h2>
    <input
      v-model="searchTerm"
      placeholder="Search jobs..."
      @input="searchJobs"
    />
    <ul>
      <li v-for="job in filteredJobs" :key="job.id">
        <router-link :to="'/jobs/' + job.id">{{ job.title }}</router-link>
        <button @click="applyToJob(job.id)">Apply</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jobs: [],
      searchTerm: "",
      filteredJobs: [],
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await axios.get("/api/jobs");
        this.jobs = response.data;
        this.filteredJobs = this.jobs; // Initialize filteredJobs with all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    },
    searchJobs() {
      this.filteredJobs = this.jobs.filter((job) =>
        job.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    async applyToJob(jobId) {
      try {
        await axios.post(
          `/api/jobs/apply/${jobId}`,
          {},
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        alert("Applied successfully"); // Notify user of success
      } catch (error) {
        console.error("Application failed:", error);
        alert("Failed to apply for job. Please try again."); // Notify user of failure
      }
    },
  },
};
</script>

<style scoped>
.jobs {
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
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
