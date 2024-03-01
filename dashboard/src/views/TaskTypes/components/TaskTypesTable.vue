<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Task Types table ({{ taskTypes.length }})</h6>
      <task-types-create/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">ID</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Task type</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Reward</th>
            <th class="text-secondary opacity-7"></th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(taskType, index) in taskTypes" :key="taskType.id">
            <td>
              <div class="px-3 py-1">
                {{ index + 1 }}
              </div>
            </td>
            <td class="align-middle ps-4">
              <span class="text-secondary text-sm">{{ taskType.name }}</span>
            </td>
            <td class="align-middle ps-4">
              <span class="text-secondary text-xs font-weight-bold">{{ taskType.reward }} SOL</span>
            </td>
            <td class="align-middle">
              <router-link
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  :to="`/dashboard/task-types/edit/${taskType.id}`"
              >Edit
              </router-link>
            </td>
            <td class="align-middle">
              <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click.prevent="removeTaskType(taskType.id)">
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
import {mapActions, mapGetters} from "vuex";
import TaskTypesCreate from "@/views/TaskTypes/components/TaskTypesCreate.vue";

export default {
  name: "task-types-table",
  components: {
    TaskTypesCreate
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACK_END_URL
    }
  },
  computed: {
    ...mapGetters({
      taskTypes: "taskTypes/getTaskTypes",
    })
  },
  methods: {
    ...mapActions({
      removeTaskType: "taskTypes/removeTaskType",
    }),
  }
};
</script>