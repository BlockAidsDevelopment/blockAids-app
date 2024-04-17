import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { OrganizationResource } from "../../organizations/resources/organization.resource";

@Injectable()
export class SpecialistsResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Doe" })
  public name: string;
  @ApiProperty({ example: "johny@gmail.com" })
  public email: string;
  @ApiProperty({ example: "account.testnet" })
  public accountId: string;
  @ApiProperty({ example: "Neurologist" })
  public jobPosition: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;
  @ApiProperty({ example: true })
  public allowed: boolean;
  @ApiProperty({ example: 1 })
  public organizationId: number;
  @ApiProperty({ example: 1 })
  public organization: OrganizationResource;

  public constructor(specialist: any) {
    this.id = specialist.id;
    this.name = specialist.name;
    this.email = specialist.email;
    this.accountId = specialist.account_id;
    this.jobPosition = specialist.job_position;
    this.avatar = specialist.avatar;
    this.allowed = specialist.allowed;
    this.organizationId = specialist.organizationId;
    this.organization = this.organization
      ? new OrganizationResource(specialist.organization)
      : null;
  }

  public static collect(specialists: any): SpecialistsResource[] {
    return specialists.map((specialist: any) => {
      return new SpecialistsResource(specialist);
    });
  }
}
