<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Users table ({{ users.length }})</h6>
      <user-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
            <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Email
            </th>
            <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Phone
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Gender
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Birth Date
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Age
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Status
            </th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img :src="`${backEndUrl}/${user.avatar}`"
                       class="avatar avatar-sm me-3"
                       alt="user1"
                       v-if="user.avatar !== 'avatar-mock.png'"
                  />
                  <img :src="user.avatar_link"
                       class="avatar avatar-sm me-3"
                       alt="user1"
                       v-else
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                  <!--<p class="text-xs text-secondary mb-0">{{ user.email }}</p>-->
                </div>
              </div>
            </td>
            <td class="align-middle text-left">
              <span class="text-secondary text-xs font-weight-bold">{{ user.public_key }}</span>
            </td>
            <td class="align-middle text-left">
              <span class="text-secondary text-xs font-weight-bold">{{ user.email }}</span>
            </td>
            <td class="align-middle text-left">
              <span class="text-secondary text-xs font-weight-bold">{{ user.phone }}</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ user.gender }}</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ user.birthdate ?? '---' }}</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ getAge(user.birthdate) }} years</span>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/users/edit/${user.id}`"
              >Edit
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeUser(user.id)">
                Delete
              </a>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-center">
          <argon-button @click="loadMore" color="dark" variant="gradient">
            Load more...
          </argon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import UserCreate from "@/views/Users/components/UserCreate.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "users-table",
  components: {ArgonButton, UserCreate},
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
      page: 2,
    }
  },
  computed: {
    ...mapGetters({
      users: "users/getUsers",
    })
  },
  methods: {
    ...mapActions({
      removeUser: "users/removeUser",
      fetchUsers: "users/fetchUsers",
    }),
    async loadMore() {
      await this.fetchUsers({page: this.page++});
    },
    getAge(date) {
      const today = new Date();
      const birthdate = new Date(date);
      const age = today.getFullYear() - birthdate.getFullYear() -
          (today.getMonth() < birthdate.getMonth() ||
              (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
      return age;
    }
  }
};
</script>
