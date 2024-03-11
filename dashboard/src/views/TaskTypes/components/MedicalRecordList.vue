<template>
  <div class="medical-records-list">
    <ul v-if="medicalRecords.length > 0">
      <li v-for="(medicalRecord, key) in medicalRecords" :key="key">
        <span v-bind:style="{ flex: 0}">{{ key + 1 }}</span>
        <span><b>{{ medicalRecord.name }}</b></span>
        <span><i>{{ medicalRecord.unit }}</i></span>
        <span><small>{{ medicalRecord.type }}</small></span>
        <span v-bind:style="{ flex: 0}">
        <a @click.prevent="removeRecord(medicalRecord.id)">
          <i class="ni ni-fat-remove text-sm opacity-10"></i>
        </a>
      </span>
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
      removeRecord: "medicalRecordIndexes/removeMedicalRecordsIndex",
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
      margin: 10px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:nth-of-type(odd) {
        background: #eeeeee;
      }

      &:nth-of-type(even) {
        background: #ecf0f1;
      }

      span {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        flex: 1;

        small {
          background-color: #5e72e4;
          color: #FFF;
          border-radius: 8px;
          padding: 2px 8px;
          font-size: 10px;
        }

      }
    }
  }
}
</style>