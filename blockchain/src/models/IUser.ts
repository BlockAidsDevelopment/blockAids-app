export interface IUser {
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "accountId": string,
  "ipfs_link": string,
  "avatar": string,
  "gender": string,
  "birthdate"?: string | null,
  "file"?: Blob | File,
}
