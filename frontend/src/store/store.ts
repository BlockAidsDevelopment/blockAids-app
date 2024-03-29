import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import {taskTypesApi} from "../api/taskTypesApi";
import {organizationsApi} from "../api/organizationsApi";
import {specialistsApi} from "../api/specialistsApi";
import {usersApi} from "../api/usersApi";
import {authApi} from "../api/authApi";
import {tasksApi} from "../api/tasksApi";
import {notificationsApi} from "../api/notificationsApi";
import {medicalRecordsApi} from "../api/medicalRecordsApi";
import {medicalRecordIndexesApi} from "../api/medicalRecordIndexesApi";

const rootReducer = combineReducers({
  authReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [taskTypesApi.reducerPath]: taskTypesApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
  [specialistsApi.reducerPath]: specialistsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
  [medicalRecordsApi.reducerPath]: medicalRecordsApi.reducer,
  [medicalRecordIndexesApi.reducerPath]: medicalRecordIndexesApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(taskTypesApi.middleware)
        .concat(tasksApi.middleware)
        .concat(organizationsApi.middleware)
        .concat(specialistsApi.middleware)
        .concat(usersApi.middleware)
        .concat(authApi.middleware)
        .concat(notificationsApi.middleware)
        .concat(medicalRecordsApi.middleware)
        .concat(medicalRecordIndexesApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

