export interface ISpecialist {
  "id": number,
  "name": string,
  "email": string,
  "accountId"?: string,
  "allowed"?: boolean,
  "jobPosition": string,
  "avatar": string,
  "organizationId": string,
  "file"?: File | Blob,
}
