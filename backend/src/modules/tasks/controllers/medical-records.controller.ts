import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CrudMedicalRecordsService } from "../services/crud-medical-records.service";
import { MedicalRecordsResource } from "../resources/medical-records.resource";
import { CreateMedicalRecordDto } from "../dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "../dto/update-medical-record.dto";

@ApiTags("Medical record")
@Controller("api/medical-records")
export class MedicalRecordsController {
  constructor(
    private readonly crudMedicalRecordsService: CrudMedicalRecordsService,
  ) {}

  @ApiResponse({ status: 200, type: [MedicalRecordsResource] })
  @ApiOperation({ summary: "Get all medical records" })
  @Get()
  async findAll() {
    const medicalRecords = await this.crudMedicalRecordsService.findAll();
    return MedicalRecordsResource.collect(medicalRecords);
  }

  @ApiResponse({ status: 200, type: [MedicalRecordsResource] })
  @ApiOperation({ summary: "Get all medical records by task id" })
  @Get("/task/:taskId")
  async findAllByTask(@Param("taskId") taskId: string) {
    const medicalRecord =
      await this.crudMedicalRecordsService.findAllByTaskId(taskId);
    return MedicalRecordsResource.collect(medicalRecord);
  }

  @ApiResponse({ status: 200, type: [MedicalRecordsResource] })
  @ApiOperation({ summary: "Get all medical records by user id" })
  @Get("/user/:userId")
  async findAllByUser(@Param("userId") userId: string) {
    const medicalRecord =
      await this.crudMedicalRecordsService.findAllByUserId(userId);
    return MedicalRecordsResource.collect(medicalRecord);
  }

  @ApiResponse({ status: 200, type: [MedicalRecordsResource] })
  @ApiOperation({ summary: "Get all medical records by specialist id" })
  @Get("/specialist/:specialistId")
  async findAllBySpecialist(@Param("specialistId") specialistId: string) {
    const medicalRecord =
      await this.crudMedicalRecordsService.findAllBySpecialistId(specialistId);
    return MedicalRecordsResource.collect(medicalRecord);
  }

  @ApiResponse({ status: 200, type: MedicalRecordsResource })
  @ApiOperation({ summary: "Get medical record by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const medicalRecord = await this.crudMedicalRecordsService.findOne(+id);
    return new MedicalRecordsResource(medicalRecord);
  }

  @ApiResponse({ status: 200, type: MedicalRecordsResource })
  @ApiOperation({ summary: "Create medical record" })
  @Post()
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    const createdMedicalRecord = await this.crudMedicalRecordsService.create(
      createMedicalRecordDto,
    );

    const medicalRecord = await this.crudMedicalRecordsService.findOne(
      createdMedicalRecord.id,
    );

    return new MedicalRecordsResource(medicalRecord);
  }

  @ApiResponse({ status: 200, type: MedicalRecordsResource })
  @ApiOperation({ summary: "Update medical record" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    await this.crudMedicalRecordsService.update(+id, updateMedicalRecordDto);
    const medicalRecord = await this.crudMedicalRecordsService.findOne(+id);
    return new MedicalRecordsResource(medicalRecord);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete  medical record" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.crudMedicalRecordsService.remove(+id);
  }
}
