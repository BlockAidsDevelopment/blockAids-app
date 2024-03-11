import {MedicalRecordIndexesApi} from "@/api/medicalRecordIndexesApi";

export default {
    namespaced: true,
    state: {
        medicalRecordsIndexes: [],
        medicalRecordsIndexesForTaskType: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getMedicalRecordsIndexes: (state) => state.medicalRecordsIndexes,
        getMedicalRecordsIndexesForTaskType: (state) => state.medicalRecordsIndexesForTaskType,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setMedicalRecordsIndexes(state, medicalRecordsIndexes) {
            state.medicalRecordsIndexes = medicalRecordsIndexes;
        },
        setMedicalRecordsIndexesForTaskType(state, medicalRecordsIndexes) {
            state.medicalRecordsIndexesForTaskType = medicalRecordsIndexes;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addMedicalRecordsIndex({commit}, data) {
            try {
                await MedicalRecordIndexesApi.create(data);
                const response = await MedicalRecordIndexesApi.getAll();
                commit('setMedicalRecordsIndexes', response.data);
                commit('setAlert', {message: 'Index has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchMedicalRecordsIndexById({commit}, id) {
            try {
                return await MedicalRecordIndexesApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchMedicalRecordsIndexByTaskTypeId({commit}, taskTypeId) {
            try {
                const response = await MedicalRecordIndexesApi.getByTaskTypeId(taskTypeId);
                commit('setMedicalRecordsIndexesForTaskType', response.data);
                commit('setAlert', {message: 'Index has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchMedicalRecordsIndexes({commit}) {
            try {
                const response = await MedicalRecordIndexesApi.getAll();
                return commit('setMedicalRecordsIndexes', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editMedicalRecordsIndex({commit}, data) {
            try {
                await MedicalRecordIndexesApi.update(data.id, data.formData);
                const response = await MedicalRecordIndexesApi.getAll();
                commit('setMedicalRecordsIndexes', response.data);
                commit('setAlert', {message: 'Index has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeMedicalRecordsIndex({commit}, id) {
            if (confirm('Are you sure you want to delete this index?')) {
                try {
                    await MedicalRecordIndexesApi.delete(id);
                    const response = await MedicalRecordIndexesApi.getAll();
                    return commit('setMedicalRecordsIndexesForTaskType', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        },
    }
}