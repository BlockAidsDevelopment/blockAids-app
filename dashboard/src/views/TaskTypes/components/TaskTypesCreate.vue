<template>
  <div>
    <configurator
        title="Add new task type"
        :toggle="toggleConfigurator"
        :class="[
        this.$store.state.config.showConfig ? 'show' : '',
        this.$store.state.config.hideConfigButton ? 'd-none' : ''
      ]"
    >
      <div class="row">
        <form action="" @submit.prevent="submitForm">
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Name</label>
            <argon-input type="text"
                         name="name"
                         :value="form.name"
                         @input="form.name = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <label for="example-text-input" class="form-control-label">Reward</label>
            <argon-input type="text"
                         name="reward"
                         :value="form.reward"
                         @input="form.reward = $event.target.value"/>
          </div>
          <div class="col-md-12">
            <div class="alert" role="alert">
              <p class="text-danger" v-for="error in errors" :key="error">
                <small>{{ error }}</small>
              </p>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <argon-button :fullWidth="true" color="success" variant="gradient">Save</argon-button>
            </div>
          </div>
        </form>
      </div>
    </configurator>
  </div>
</template>

<script>
import Configurator from "@/widgets/Configurator.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import {mapActions, mapMutations, mapGetters} from "vuex";

export default {
  components: {ArgonInput, ArgonButton, Configurator},
  data() {
    return {
      errors: [],
      form: {
        name: null,
        reward: null,
      }
    }
  },
  watch: {
    alert() {
      if (this.alert.status === 'success') {
        this.resetForm();
        this.toggleConfigurator();
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
  methods: {
    ...mapMutations({
      toggleConfigurator: "config/toggleConfigurator",
      navbarMinimize: "config/navbarMinimize"
    }),
    ...mapActions({
      addTaskType: "taskTypes/addTaskType",
    }),
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          formData.append(field, this.form[field]);
        }
        await this.addTaskType(formData);
      }
      return false;
    },
    validateForm() {
      this.errors = [];
      for (const field in this.form) {
        if (this.form[field] === null || this.form[field].length < 1) {
          this.errors.push(`${field} is required!`);
          return false;
        }
      }
      return true;
    },
    resetForm() {
      this.form.name = null;
      this.form.reward = null;
    }
  },
}
</script>