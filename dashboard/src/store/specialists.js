import {SpecialistsApi} from "@/api/specialistsApi";

export default {
    namespaced: true,
    state: {
        specialists: [],
        alert: {
            message: null,
            status: null,
        }
    },
    getters: {
        getSpecialists: (state) => state.specialists,
        getAlert: (state) => state.alert,
    },
    mutations: {
        setSpecialists(state, specialists) {
            state.specialists = specialists;
        },
        setAlert(state, alert) {
            state.alert = alert;
        }
    },
    actions: {
        async addSpecialist({commit}, data) {
            try {
                await SpecialistsApi.create(data);
                const response = await SpecialistsApi.getAll();
                commit('setSpecialists', response.data);
                commit('setAlert', {message: 'Specialist has been successfully added!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchSpecialistById({commit}, id) {
            try {
                return await SpecialistsApi.getById(id);
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async fetchSpecialists({commit}) {
            try {
                const response = await SpecialistsApi.getAll();
                return commit('setSpecialists', response.data);
            } catch (e) {
                console.error(e);
            }
        },
        async editSpecialist({commit}, data) {
            try {
                await SpecialistsApi.update(data.id, data.formData);
                const response = await SpecialistsApi.getAll();
                commit('setSpecialists', response.data);
                commit('setAlert', {message: 'Specialist has been successfully edited!', status: 'success'});
            } catch (e) {
                commit('setAlert', {message: e.response.data.message, status: 'error'});
                console.error(e);
            }
        },
        async removeSpecialist({commit}, id) {
            if (confirm('Are you sure you want to delete this specialist?')) {
                try {
                    await SpecialistsApi.delete(id);
                    const response = await SpecialistsApi.getAll();
                    return commit('setSpecialists', response.data);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}