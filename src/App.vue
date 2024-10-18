<template>
  <div id="app" class="c-app">
    <!-- Sidebar -->
    <CSidebar>
      <CSidebarBrand href="#"></CSidebarBrand>
      <CSidebarNav>
        <CNavItem name="Dashboard" to="/dashboard" icon="cil-speedometer" />
        <CNavItem name="Users" to="/users" icon="cil-user" />
        <CNavItem name="Job Listings" to="/jobs" icon="cil-list" />
        <!-- Add more sidebar items as needed -->
      </CSidebarNav>
    </CSidebar>

    <!-- Main Wrapper -->
    <div class="c-wrapper">
      <!-- Header -->
      <CHeader>
        <CHeaderNav>
          <CNavItem href="#">HireHub</CNavItem>
        </CHeaderNav>
      </CHeader>

      <!-- Content -->
      <div class="c-body">
        <router-view />
      </div>

      <!-- Footer -->
      <CFooter>
        <div>HireHub © 2024</div>
      </CFooter>
    </div>
  </div>
</template>

<script>
import {
  CSidebar,
  CSidebarNav,
  CNavItem,
  CHeader,
  CHeaderNav,
  CFooter,
} from "@coreui/vue";

export default {
  name: "App",
  components: {
    CSidebar,
    CSidebarNav,
    CNavItem,
    CHeader,
    CHeaderNav,
    CFooter,
  },
};
</script>

<style>
/* Apply necessary CoreUI styles */
@import "~@coreui/coreui/dist/css/coreui.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.c-app {
  display: flex;
}
</style>
