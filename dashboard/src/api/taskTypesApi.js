import {DefaultApiInstance} from '@/api';

export const TaskTypesApi = {
    getAll() {
        const url = `/api/task-types`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/task-types/${id}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/task-types`;
        return DefaultApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/task-types/${id}`;
        return DefaultApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/task-types/${id}`;
        return DefaultApiInstance.delete(url);
    }
};