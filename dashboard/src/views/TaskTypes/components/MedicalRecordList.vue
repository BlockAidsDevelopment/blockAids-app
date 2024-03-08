<template>
  <div class="medical-records-list">
    <ul v-if="medicalRecords.length > 0">
      <li v-for="(medicalRecord, key) in medicalRecords" :key="key">
        <span>{{ key + 1 }}</span>
        <span><b>{{ medicalRecord.name }}</b></span>
        <span><i>{{ medicalRecord.unit }}</i></span>
        <span><small>{{ medicalRecord.type }}</small></span>
        <span>delete</span>
      </li>
    </ul>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "MedicalRecordList",
  props: ["taskType"],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      medicalRecords: "medicalRecordIndexes/getMedicalRecordsIndexesForTaskType"
    })
  },
  async mounted() {
    if (this.taskType) {
      const response = await this.fetchMedicalRecordsIndexByTaskTypeId(this.taskType.id);
      this.medicalRecords = response.data;
    }
  },
  methods: {
    ...mapActions({
      fetchMedicalRecordsIndexByTaskTypeId: 'medicalRecordIndexes/fetchMedicalRecordsIndexByTaskTypeId',
    }),
  }
}
</script>

<style lang="scss">
.medical-records-list {
  text-align: left;

  ul {
    list-style: none;

    li {
      border: 1px solid #EEE;
      padding: 15px;
      margin: 15px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      span {
        display: flex;
        width: 20%;
      }
    }
  }
}
</style>