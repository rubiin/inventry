<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      background-color="sidebarBackground"
      short-title="Dashboard"
      title="Dashboard"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Firms',
            icon: 'el-icon-s-shop text-lg text-blue',
            path: '/firm',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Sales',
            icon: 'ni ni-cart text-yellow',
            path: '/sales',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Stocks',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/stock',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Products',
            icon: 'el-icon-s-platform text-grey text-lg',
            path: '/products',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Expenses',
            icon: 'el-icon-s-finance text-pink text-lg',
            path: '/expense',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Damaged',
            icon: 'el-icon-s-release text-red text-lg',
            path: '/damages',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content bg-custom" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar" class="bg-custom">
        <!-- your content here -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue';

export default {
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      sidebarBackground: 'orange', //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
