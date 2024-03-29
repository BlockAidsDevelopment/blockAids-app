<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Task Type</p>
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Task type Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>

            <div class="row">

              <div class="col-md-4">
                <form action="" v-if="taskType" @submit.prevent="submitForm" autocomplete="off">
                  <div class="row mt-1">
                    <div class="col-md-12">
                      <label for="example-text-input" class="form-control-label">Name</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.taskType.name"
                                   @input="form.name = $event.target.value"/>
                    </div>
                    <div class="col-md-12">
                      <label for="example-text-input" class="form-control-label">Reward</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.taskType.reward"
                                   @input="form.reward = $event.target.value"/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="alert" role="alert">
                      <p class="text-danger" v-for="error in errors" :key="error">
                        <small>{{ error }}</small>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12 mt-5 d-flex justify-content-center">
                    <div class="form-group">
                      <argon-button :fullWidth="true" color="success" variant="gradient">Save</argon-button>
                    </div>
                  </div>
                </form>
              </div>

              <div class="col-md-8">
                <h6 class="text-center">Medical Records:</h6>
                <div class="col-md-12 mt-1 d-flex justify-content-center">
                  <div class="form-group">
                    <MedicalRecordCreate v-if="taskType" :taskType="taskType"/>
                  </div>
                </div>
                <MedicalRecordList v-if="taskType" :taskType="taskType"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import MedicalRecordCreate from "@/views/TaskTypes/components/MedicalRecordCreate.vue";
import MedicalRecordList from "@/views/TaskTypes/components/MedicalRecordList.vue";

export default {
  name: "edit-organization",
  components: {
    ArgonAlert,
    ArgonInput,
    ArgonButton,
    MedicalRecordCreate,
    MedicalRecordList,
  },
  data() {
    return {
      alertVisible: false,
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
      errors: [],
      showMenu: false,
      taskType: null,
      form: {
        name: null,
        reward: null,
      }
    };
  },
  watch: {
    alert() {
      if (this.alert.status === 'success') {
        this.alertVisible = true;
        setTimeout(() => this.alertVisible = false, 5000);
      }
      if (this.alert.status === 'error') {
        this.errors.push(this.alert.message);
      }
    }
  },
  computed: {
    ...mapGetters({
      alert: 'taskTypes/getAlert',
    })
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      fetchTaskTypeById: 'taskTypes/fetchTaskTypeById',
      editTaskType: 'taskTypes/editTaskType',
      fetchMedicalRecordsIndexByTaskTypeId: 'medicalRecordIndexes/fetchMedicalRecordsIndexByTaskTypeId',
    }),
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchTaskTypeById(id);
      this.taskType = response.data;
      this.form.name = this.taskType.name;
      this.form.reward = this.taskType.reward;

      await this.fetchMedicalRecordsIndexByTaskTypeId(id);
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editTaskType({id: this.taskType.id, formData});
        await this.initData();
      }
      return false;
    },
    validateForm() {
      this.errors = [];
      for (const field in this.form) {
        if (this.form[field] === null || this.form[field].length < 1) {
          if (this.form[field] !== null) {
            if (this.form[field].length >= 1) {
              this.errors.push(`${field} is required!`);
            }
            return false;
          }
        }
      }
      return true;
    },
    resetForm() {
      this.form.name = null;
      this.form.reward = null;
    },
  }
}
;
</script>
