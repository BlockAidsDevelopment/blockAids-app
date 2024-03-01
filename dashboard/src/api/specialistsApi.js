import {FormDataApiInstance, DefaultApiInstance} from '@/api';

export const SpecialistsApi = {
    getAll() {
        const url = `/api/specialists`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/specialists/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/specialists`;
        return FormDataApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/specialists/${id}`;
        return FormDataApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/specialists/${id}`;
        return DefaultApiInstance.delete(url);
    }
};