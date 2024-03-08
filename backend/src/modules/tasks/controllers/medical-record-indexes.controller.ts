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
import { CrudMedicalRecordIndexesService } from "../services/crud-medical-record-indexes.service";
import { MedicalRecordIndexesResource } from "../resources/medical-record-indexes.resource";
import { CreateMedicalRecordIndexDto } from "../dto/create-medical-record-index.dto";
import { UpdateMedicalRecordIndexDto } from "../dto/update-medical-record-index.dto";

@ApiTags("Medical record index")
@Controller("api/medical-record-indexes")
export class MedicalRecordIndexesController {
  constructor(
    private readonly crudMedicalRecordIndexesService: CrudMedicalRecordIndexesService,
  ) {}

  @ApiResponse({ status: 200, type: [MedicalRecordIndexesResource] })
  @ApiOperation({ summary: "Get all medical record indexes" })
  @Get()
  async findAll() {
    const medicalRecordIndexes =
      await this.crudMedicalRecordIndexesService.findAll();
    return MedicalRecordIndexesResource.collect(medicalRecordIndexes);
  }

  @ApiResponse({ status: 200, type: [MedicalRecordIndexesResource] })
  @ApiOperation({ summary: "Get all medical record indexes by task type id" })
  @Get("/task-type/:taskTypeId")
  async findAllByTaskType(@Param("taskTypeId") taskTypeId: string) {
    const medicalRecordIndex =
      await this.crudMedicalRecordIndexesService.findAllByTaskTypeId(
        taskTypeId,
      );
    return MedicalRecordIndexesResource.collect(medicalRecordIndex);
  }

  @ApiResponse({ status: 200, type: MedicalRecordIndexesResource })
  @ApiOperation({ summary: "Get medical record index by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const medicalRecordIndex =
      await this.crudMedicalRecordIndexesService.findOne(+id);
    return new MedicalRecordIndexesResource(medicalRecordIndex);
  }

  @ApiResponse({ status: 200, type: MedicalRecordIndexesResource })
  @ApiOperation({ summary: "Create medical record index" })
  @Post()
  async create(
    @Body() createMedicalRecordIndexDto: CreateMedicalRecordIndexDto,
  ) {
    const createdMedicalRecordIndex =
      await this.crudMedicalRecordIndexesService.create(
        createMedicalRecordIndexDto,
      );

    const medicalRecordIndex =
      await this.crudMedicalRecordIndexesService.findOne(
        createdMedicalRecordIndex.id,
      );
    return new MedicalRecordIndexesResource(medicalRecordIndex);
  }

  @ApiResponse({ status: 200, type: MedicalRecordIndexesResource })
  @ApiOperation({ summary: "Update medical record index" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMedicalRecordIndexDto: UpdateMedicalRecordIndexDto,
  ) {
    await this.crudMedicalRecordIndexesService.update(
      +id,
      updateMedicalRecordIndexDto,
    );
    const medicalRecordIndex =
      await this.crudMedicalRecordIndexesService.findOne(+id);
    return new MedicalRecordIndexesResource(medicalRecordIndex);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete  medical record" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.crudMedicalRecordIndexesService.remove(+id);
  }
}
