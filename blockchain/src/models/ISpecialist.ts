export interface ISpecialist {
  "id": number,
  "name": string,
  "email": string,
  "jobPosition": string,
  "avatar": string,
  "organizationId": string,
  "accountId": string,
  "file"?: File | Blob,
}
