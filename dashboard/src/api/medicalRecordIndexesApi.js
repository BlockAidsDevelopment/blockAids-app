import {DefaultApiInstance} from '@/api';

export const MedicalRecordIndexesApi = {
    getAll() {
        const url = `/api/medical-record-indexes`;
        return DefaultApiInstance.get(url);
    },

    getById(id) {
        const url = `/api/medical-record-indexes/${id}`;
        return DefaultApiInstance.get(url);
    },

    getByTaskTypeId(taskTypeId) {
        const url = `/api/medical-record-indexes/task-type/${taskTypeId}`;
        return DefaultApiInstance.get(url);
    },

    create(data) {
        const url = `/api/medical-record-indexes`;
        return DefaultApiInstance.post(url, data);
    },

    update(id, data) {
        const url = `/api/medical-record-indexes/${id}`;
        return DefaultApiInstance.patch(url, data);
    },

    delete(id) {
        const url = `/api/medical-record-indexes/${id}`;
        return DefaultApiInstance.delete(url);
    }
};