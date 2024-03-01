import {TaskTypesApi} from "@/api/taskTypesApi";

export default {
    namespaced: true,
    state: {
        taskTypes: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getTaskTypes: (state) => state.taskTypes,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setTaskTypes(state, taskTypes) {
            state.taskTypes = taskTypes;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addTaskType({commit}, data) {
            try {
                await TaskTypesApi.create(data);
                const response = await TaskTypesApi.getAll();
                commit('setTaskTypes', response.data);
                commit('setAlert', {message: 'Task type has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchTaskTypeById({commit}, id) {
            try {
                return await TaskTypesApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchTaskTypes({commit}) {
            try {
                const response = await TaskTypesApi.getAll();
                return commit('setTaskTypes', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editTaskType({commit}, data) {
            try {
                await TaskTypesApi.update(data.id, data.formData);
                const response = await TaskTypesApi.getAll();
                commit('setTaskTypes', response.data);
                commit('setAlert', {message: 'Type task has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeTaskType({commit}, id) {
            if (confirm('Are you sure you want to delete this Type task?')) {
                try {
                    await TaskTypesApi.delete(id);
                    const response = await TaskTypesApi.getAll();
                    return commit('setTaskTypes', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}