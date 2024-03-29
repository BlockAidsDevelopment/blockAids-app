import Vuex from 'vuex';

import config from '@/store/config';
import users from "@/store/users";
import specialists from "@/store/specialists";
import organizations from "@/store/organizations";
import taskTypes from "@/store/taskTypes";
import medicalRecordIndexes from "@/store/medicalRecordIndexes";

export default new Vuex.Store({
    modules: {
        config,
        users,
        specialists,
        organizations,
        taskTypes,
        medicalRecordIndexes,
    },
});
