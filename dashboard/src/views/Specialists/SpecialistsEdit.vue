<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Profile</p>
              <!--<argon-button color="success" size="sm" class="ms-auto">Save</argon-button>-->
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">Specialist Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>
            <form action="" v-if="specialist" @submit.prevent="submitForm" autocomplete="off">
              <div class="row">
                <div class="col-md-8">
                  <div class="row mt-1">
                    <div class="col-md-3">
                      <label for="example-text-input" class="form-control-label">Name</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.specialist.name"
                                   @input="form.name = $event.target.value"/>
                    </div>
                    <div class="col-md-3">
                      <label for="example-text-input" class="form-control-label">Email</label>
                      <argon-input type="email"
                                   name="email"
                                   :value="this.specialist.email"
                                   @input="form.email = $event.target.value"/>
                    </div>
                    <div class="col-md-3">
                      <label for="example-text-input" class="form-control-label">Function</label>
                      <argon-input type="text"
                                   name="job_position"
                                   :value="this.specialist.jobPosition"
                                   @input="form.job_position = $event.target.value"/>
                    </div>
                    <div class="col-md-3">
                      <label for="example-text-input" class="form-control-label">Organization</label>
                      <div class="form-group">
                        <select class="form-select" aria-label="Default select example"
                                v-model="this.form.organizationId">
                          <option :value="organization.id" v-for="organization in organizations" :key="organization.id">
                            {{ organization.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-1">
                  </div>
                  <div class="row  mt-5">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Password</label>
                      <argon-input type="password"
                                   name="password"
                                   :value="this.form.password"
                                   @input="form.password = $event.target.value"/>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Password Confirmation</label>
                      <argon-input type="password"
                                   name="password-confirmation"
                                   :value="this.form.passwordConfirmation"
                                   @input="form.passwordConfirmation = $event.target.value"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 text-center">
                  <label for="formFile" class="form-control-label">Avatar</label>
                  <div class="form-group">
                    <input class="form-control" type="file" @change="uploadFile" ref="file" id="formFile">
                  </div>
                  <argon-avatar :img="`${backEndUrl}/${specialist.avatar}`" class="rounded-circle" size="300"/>
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
              </div>
            </form>
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
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "profile",
  components: {
    ArgonAlert,
    ArgonInput,
    ArgonButton,
    ArgonAvatar
  },
  data() {
    return {
      alertVisible: false,
      backEndUrl: process.env.VUE_APP_BACK_END_URL,
      errors: [],
      showMenu: false,
      specialist: null,
      form: {
        name: null,
        email: null,
        job_position: null,
        organizationId: 0,
        avatar: null,
        password: null,
        passwordConfirmation: null,
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
    },
    organizations() {
      if (this.organizations.length) {
        const organizations = JSON.parse(JSON.stringify(this.organizations))
        this.form.organizationId = organizations[0].id
      }
    },
  },
  computed: {
    ...mapGetters({
      alert: 'specialists/getAlert',
      organizations: 'organizations/getOrganizations',
    })
  },
  async mounted() {
    await this.initData();
    if (this.organizations.length) {
      const organizations = JSON.parse(JSON.stringify(this.organizations))
      this.form.organizationId = organizations[0].id
    }
  },
  methods: {
    ...mapActions({
      fetchSpecialistById: 'specialists/fetchSpecialistById',
      editSpecialist: 'specialists/editSpecialist',
    }),
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchSpecialistById(id);
      this.specialist = JSON.parse(JSON.stringify(response.data));
      this.form.email = await this.specialist.email;
      this.form.name = await this.specialist.name;
      this.form.job_position = await this.specialist.jobPosition;
      this.form.avatar = await this.specialist.avatar;
      this.form.organizationId = await this.specialist.organizationId;

    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editSpecialist({id: this.specialist.id, formData});
        await this.initData();
      }
      return false;
    },
    uploadFile() {
      this.form.avatar = this.$refs.file.files[0];
    },
    validateForm() {
      this.errors = [];
      // const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // const passwordValidRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      console.log(this.form);

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
      // if (!this.form.email.match(emailValidRegex)) {
      //   this.errors.push(`invalid email address!`);
      //   return false;
      // }
      //
      // if (this.form.password) {
      //   if (!this.form.password.match(passwordValidRegex)) {
      //     this.errors.push(`Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`);
      //     return false;
      //   }
      //   if (this.form.password !== this.form.passwordConfirmation) {
      //     this.errors.push(`passwords not match!`);
      //     return false;
      //   }
      // }
      return true;
    },
    resetForm() {
      this.form.name = null;
      this.form.email = null;
      this.form.phone = null;
      this.form.birthdate = null;
      this.form.gender = "male";
      this.form.avatar = null;
      this.form.password = null;
      this.form.passwordConfirmation = null;
    },
    getDateTime(datetime) {
      const dt = new Date(datetime);
      dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
      return dt.toISOString().slice(0, 16);
    }
  }
}
;
</script>
