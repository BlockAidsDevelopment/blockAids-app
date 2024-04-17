<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Moderate List</h6>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card-body px-0 pt-0 pb-2">
          <h5 class="text-center">New Patients</h5>
          <div class="table-responsive p-0" v-if="usersShow">
            <table class="table align-items-center mb-0">
              <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Patient</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Account ID
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Allow</th>
              </tr>
              </thead>
              <tbody v-for="(user, index) in users" :key="user.id">
              <tr v-if="user.accountId && !user.allowed">
                <td>
                  <div class="px-3 py-1">
                    {{ index + 1 }} {{user.allowed}}
                  </div>
                </td>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                      <p class="text-xs text-secondary mb-0">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <span class="text-secondary text-xs font-weight-bold">{{ user.accountId }}</span>
                </td>
                <td class="align-middle">
                  <a href="#" @click="userApprove(user)"
                     class="text-secondary font-weight-bold text-xs">
                    Approve
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6">

        <div class="card-body px-0 pt-0 pb-2">
          <h5 class="text-center">New Specialists</h5>
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Specialist</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Account ID
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Allow</th>
              </tr>
              </thead>
              <tbody v-for="(specialist, index) in specialists" :key="specialist.id">
              <tr v-if="specialist.accountId && !specialist.allowed">
                <td>
                  <div class="px-3 py-1">
                    {{ index + 1 }}
                  </div>
                </td>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ specialist.name }}</h6>
                      <p class="text-xs text-secondary mb-0">{{ specialist.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <span class="text-secondary text-xs font-weight-bold">{{ specialist.accountId }}</span>
                </td>
                <td class="align-middle">
                  <a href="#" @click="specialistApprove(specialist)"
                     class="text-secondary font-weight-bold text-xs">
                    Approve
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Moderate",
  data() {
    return {
      specialistsShow: true,
      usersShow: true,
      specialists: [],
      users: [],
    }
  },
  computed: {
    ...mapGetters({
      allSpecialists: "specialists/getSpecialists",
      allUsers: "users/getUsers",
    })
  },
  async mounted() {
    await this.getAllSpecialists();
    await this.getAllUsers();
    this.specialists = this.allSpecialists;
    this.users = this.allUsers;
  },
  watch: {
    allUsers() {
      this.users = this.allUsers;
    }
  },
  methods: {
    ...mapActions({
      editSpecialist: 'specialists/editSpecialist',
      editUser: 'users/editUser',
      getAllSpecialists: 'specialists/fetchSpecialists',
      getAllUsers: 'users/fetchUsers',
    }),
    async specialistApprove(specialist) {
      const formData = new FormData();
      formData.append("email", specialist.email);
      formData.append("allowed", true);
      await this.editSpecialist({id: specialist.id, formData});
      await this.getAllSpecialists();
    },
    async userApprove(user) {
      this.usersShow = false;
      this.users = [];
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("allowed", true);
      await this.editUser({id: user.id, formData});
      await this.getAllUsers();

      this.usersShow = true;
    }
  }
};
</script>
