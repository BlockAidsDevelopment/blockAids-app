<template>
  <div
      class="collapse navbar-collapse w-auto h-auto h-100"
      id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
            url="/dashboard"
            :class="getRoute() === 'dashboard' ? 'active' : ''"
            :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/users"
            :class="getRoute() === 'users' ? 'active' : ''"
            :navText="'Users'"
        >
          <template v-slot:icon>
            <i class="ni ni-circle-08 text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/specialists"
            :class="getRoute() === 'specialists' ? 'active' : ''"
            :navText="'Specialists'"
        >
          <template v-slot:icon>
            <i class="ni ni-badge text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/organizations"
            :class="getRoute() === 'organizations' ? 'active' : ''"
            :navText="'Organizations'"
        >
          <template v-slot:icon>
            <i class="ni ni-building text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/task-types"
            :class="getRoute() === 'task-types' ? 'active' : ''"
            :navText="'Task Types'"
        >
          <template v-slot:icon>
            <i class="ni ni-archive-2 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
            url="/dashboard/moderate"
            :class="getRoute() === 'task-types' ? 'active' : ''"
            :navText="'Moderate'"
        >
          <template v-slot:icon>
            <i class="ni ni-archive-2 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
