<template>
  <div>
    <h1>{{ job.title }}</h1>
    <p>{{ job.description }}</p>
    <button @click="applyForJob(job._id)">Apply</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      job: {},
    };
  },
  methods: {
    async applyForJob(jobId) {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/jobs/${jobId}/apply`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
  },
};
</script>
