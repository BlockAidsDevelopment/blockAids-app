<template>
  <div>
    <button type="button"
            class="btn btn-primary"
            @click="showModal">
      <div class="align-items-center flex">
        <i class="ni ni-fat-add text-sm opacity-10"></i> Add new
      </div>
    </button>

    <div :class="[`modal  fade show `, isModalVisible && `modal-opened`]" id="modal" @click="hideModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create a medical record:</h5>
            <button type="button" class="btn-close" @click="hideModal" id="close-btn"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm" autocomplete="off">
              <div class="row mt-1">
                <div class="col-md-12">
                  <label class="form-control-label">Index</label>
                  <argon-input type="text"
                               name="index"
                               @input="form.name = $event.target.value"/>
                </div>
                <div class="col-md-12">
                  <label class="form-control-label">Unit</label>
                  <argon-input type="text"
                               name="unit"
                               @input="form.unit = $event.target.value"/>
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">Type</label>
                  <div class="form-group">
                    <select class="form-select" aria-label="Default select example" v-model="this.form.type">
                      <option value="select">Select</option>
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                    </select>
                  </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import {mapActions} from "vuex";

export default {
  name: "MedicalRecordCreate",
  props: ["taskType"],
  components: {ArgonButton, ArgonInput},
  data() {
    return {
      isModalVisible: false,
      errors: [],
      showMenu: false,
      form: {
        name: null,
        type: null,
        unit: null,
      }
    }
  },
  methods: {
    ...mapActions({
      fetchMedicalRecordsIndexByTaskTypeId: 'medicalRecordIndexes/fetchMedicalRecordsIndexByTaskTypeId',
      addMedicalRecordsIndex: 'medicalRecordIndexes/addMedicalRecordsIndex',
    }),
    showModal() {
      this.isModalVisible = true;
    },
    hideModal(e) {
      const modal = document.getElementById('modal');
      const closeBtn = document.getElementById('close-btn');
      if (e.target === modal || e.target === closeBtn) {
        this.isModalVisible = false;
      }
    },
    async submitForm() {
      if (this.validateForm()) {
        const formData = new FormData();

        for (const field in this.form) {
          if (this.form[field] !== null)
            formData.append(field, this.form[field]);
        }
        formData.append("taskTypeId", this.taskType.id);
        await this.addMedicalRecordsIndex(formData);
        this.resetForm();

        await this.fetchMedicalRecordsIndexByTaskTypeId(this.taskType.id);

        this.isModalVisible = false;
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
      this.form = {
        name: '',
        unit: '',
        type: ''
      };
      console.log( this.form)

    }
  }
}
</script>

<style>
.modal-opened {
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.flex {
  display: flex;
  align-items: center;
}

.btn-close {
  background-color: #6c7a89 !important;
}
</style>