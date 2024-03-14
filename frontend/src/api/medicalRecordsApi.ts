import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IMedicalRecord} from "../models/IMedicalRecord";
import {IMedicalRecordCreator} from "../models/IMedicalRecordCreator";

export const medicalRecordsApi = createApi({
  reducerPath: 'medicalRecordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`
  }),
  tagTypes: ['MedicalRecord'],
  endpoints: (build) => ({
    fetchAll: build.query<IMedicalRecord[], void>({
      query: () => ({
        url: `/medical-records`,
      }),
      providesTags: result => ['MedicalRecord']
    }),
    fetchAllByTaskId: build.query<IMedicalRecord[], number>({
      query: (id) => ({
        url: `/medical-records/task/${id}`,
      }),
      providesTags: result => ['MedicalRecord']
    }),
    fetchAllBySpecialistId: build.query<IMedicalRecord[], number>({
      query: (id) => ({
        url: `/medical-records/specialist/${id}`,
      }),
      providesTags: result => ['MedicalRecord']
    }),
    fetchAllByUserId: build.query<IMedicalRecord[], number>({
      query: (id) => ({
        url: `/medical-records/user/${id}`,
      }),
      providesTags: result => ['MedicalRecord']
    }),
    fetchTaskById: build.query<IMedicalRecord, number>({
      query: (id) => ({
        url: `/medical-records/${id}`,
      }),
      providesTags: result => ['MedicalRecord']
    }),
    create: build.mutation<IMedicalRecord, IMedicalRecordCreator>({
      query: (data) => ({
        url: `/medical-records`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['MedicalRecord']
    }),
    update: build.mutation<IMedicalRecord, IMedicalRecordCreator>({
      query: (data) => {
        return {
          url: `/medical-records/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ['MedicalRecord']
    }),
    delete: build.mutation<IMedicalRecord, number | undefined>({
      query: (id) => ({
        url: `/medical-records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MedicalRecord']
    }),
  })
})