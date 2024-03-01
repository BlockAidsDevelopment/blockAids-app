<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Profile</p>
<!--              <argon-button color="success" size="sm" class="ms-auto">Save</argon-button>-->
            </div>
          </div>
          <div class="card-body">
            <p class="text-uppercase text-sm">User Information</p>
            <argon-alert v-if="alertVisible">
              {{ alert.message }}
            </argon-alert>
            <form action="" v-if="user" @submit.prevent="submitForm" autocomplete="off">
              <div class="row">
                <div class="col-md-8">
                  <div class="row mt-1">
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Name</label>
                      <argon-input type="text"
                                   name="name"
                                   :value="this.user.name"
                                   @input="form.name = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Email</label>
                      <argon-input type="email"
                                   name="email"
                                   :value="this.user.email"
                                   @input="form.email = $event.target.value"/>
                    </div>
                    <div class="col-md-4">
                      <label for="example-text-input" class="form-control-label">Phone</label>
                      <argon-input type="phone"
                                   name="phone"
                                   :value="this.user.phone"
                                   @input="form.phone = $event.target.value"/>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Gender</label>
                      <div class="form-group">
                        <select class="form-select" aria-label="Default select example" v-model="this.form.gender">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="unisex">Unisex</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label for="example-text-input" class="form-control-label">Birth date</label>
                      <argon-input type="datetime-local"
                                   name="birthdate"
                                   :value="getDateTime(this.user.birthdate)"
                                   @input="form.birthdate = $event.target.value"/>
                    </div>
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
                  <argon-avatar :img="`${backEndUrl}/${user.avatar}`" class="rounded-circle" size="300"/>
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
      user: null,
      form: {
        name: null,
        email: null,
        phone: null,
        birthdate: null,
        gender: "male",
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
    }
  },
  computed: {
    ...mapGetters({
      alert: 'users/getAlert',
    })
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      fetchUserById: 'users/fetchUserById',
      editUser: 'users/editUser',
    }),
    async initData() {
      const id = this.$route.params.id;
      const response = await this.fetchUserById(id);
      this.user = response.data;
      this.form.name = this.user.name;
      this.form.email = this.user.email;
      this.form.phone = this.user.phone;
      this.form.birthdate = this.user.birthdate;
      this.form.gender = this.user.gender;
      this.form.avatar = this.user.avatar;
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();
        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        await this.editUser({id: this.user.id, formData});
        await this.initData();
      }
      return false;
    },
    uploadFile() {
      this.form.avatar = this.$refs.file.files[0];
    },
    validateForm() {
      this.errors = [];
      const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const phoneValidRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?$/;
      const passwordValidRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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
      if (!this.form.email.match(emailValidRegex)) {
        this.errors.push(`invalid email address!`);
        return false;
      }
      if (!this.form.phone.match(phoneValidRegex)) {
        this.errors.push(`invalid phone number!`);
        return false;
      }
      if (this.form.password) {
        if (!this.form.password.match(passwordValidRegex)) {
          this.errors.push(`Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`);
          return false;
        }
        if (this.form.password !== this.form.passwordConfirmation) {
          this.errors.push(`passwords not match!`);
          return false;
        }
      }
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
