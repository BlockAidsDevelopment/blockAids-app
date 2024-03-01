<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Specialists table ({{ specialists.length }})</h6>
      <specialists-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Specialist</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              Function
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              Organization
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Status
            </th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(specialist, index) in specialists" :key="specialist.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img :src="`${backEndUrl}/${specialist.avatar}`"
                       class="avatar avatar-md"
                       alt="user1"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ specialist.name }}</h6>
                  <p class="text-xs text-secondary mb-0">{{ specialist.email }}</p>
                </div>
              </div>
            </td>
            <td class="align-middle">
              <span class="text-secondary text-xs font-weight-bold">{{ specialist.jobPosition }}</span>
            </td>
            <td class="align-middle">
              <span class="text-secondary text-xs font-weight-bold">
                {{ specialist.organizationId ? (findOrganization(specialist.organizationId)).name : '' }}
              </span>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/specialists/edit/${specialist.id}`"
              >Edit
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeSpecialist(specialist.id)">
                Delete
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SpecialistsCreate from "@/views/Specialists/components/SpecialistsCreate.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "users-table",
  components: {
    SpecialistsCreate
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL
    }
  },
  computed: {
    ...mapGetters({
      specialists: "specialists/getSpecialists",
      organizations: "organizations/getOrganizations",
    })
  },
  methods: {
    ...mapActions({
      removeSpecialist: "specialists/removeSpecialist",
    }),
    findOrganization(organizationId) {
      return this.organizations.find((organization) => {
        if (organization.id === organizationId) {
          return organization.name;
        }
      });
    }
  }
};
</script>

<style>
.avatar-md {
  height: 58px !important;
  width: auto !important;
  border-radius: 50% !important;
}
</style>