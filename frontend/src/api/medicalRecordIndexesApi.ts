import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IMedicalRecordIndex} from "../models/IMedicalRecordIndex";
import {IMedicalRecordIndexCreator} from "../models/IMedicalRecordIndexCreator";

export const medicalRecordIndexesApi = createApi({
  reducerPath: 'MedicalRecordIndexApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`
  }),
  tagTypes: ['MedicalRecordIndex'],
  endpoints: (build) => ({
    fetchAll: build.query<IMedicalRecordIndex[], void>({
      query: () => ({
        url: `/medical-record-indexes`,
      }),
      providesTags: result => ['MedicalRecordIndex']
    }),
    fetchAllByTaskTypeId: build.query<IMedicalRecordIndex[], number>({
      query: (id) => ({
        url: `/medical-record-indexes/task-type/${id}`,
      }),
      providesTags: result => ['MedicalRecordIndex']
    }),
    fetchTaskById: build.query<IMedicalRecordIndex, number>({
      query: (id) => ({
        url: `/medical-record-indexes/${id}`,
      }),
      providesTags: result => ['MedicalRecordIndex']
    }),
    create: build.mutation<IMedicalRecordIndex, IMedicalRecordIndexCreator>({
      query: (data) => ({
        url: `/medical-record-indexes`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['MedicalRecordIndex']
    }),
    update: build.mutation<IMedicalRecordIndex, IMedicalRecordIndexCreator>({
      query: (data) => {
        return {
          url: `/medical-record-indexes/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ['MedicalRecordIndex']
    }),
    delete: build.mutation<IMedicalRecordIndex, number | undefined>({
      query: (id) => ({
        url: `/medical-record-indexes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MedicalRecordIndex']
    }),
  })
})