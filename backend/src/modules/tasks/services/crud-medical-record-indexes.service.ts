import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { MedicalRecordIndex } from "../entities/medical-record-index.entity";
import { CreateMedicalRecordIndexDto } from "../dto/create-medical-record-index.dto";
import { UpdateMedicalRecordIndexDto } from "../dto/update-medical-record-index.dto";

@Injectable()
export class CrudMedicalRecordIndexesService {
  constructor(
    @InjectRepository(MedicalRecordIndex)
    private readonly medicalRecordIndexRepository: Repository<MedicalRecordIndex>,
  ) {}

  async create(
    createMedicalRecordIndexDto: CreateMedicalRecordIndexDto,
  ): Promise<MedicalRecordIndex> {
    return await this.medicalRecordIndexRepository.save(
      createMedicalRecordIndexDto,
    );
  }

  findAll(): Promise<MedicalRecordIndex[]> {
    return this.medicalRecordIndexRepository.find({
      order: { id: "DESC" },
      relations: {
        taskType: true,
      },
    });
  }

  findAllByTaskTypeId(taskTypeId: string): Promise<MedicalRecordIndex[]> {
    return this.medicalRecordIndexRepository.find({
      where: { taskTypeId: taskTypeId.toString() },
      order: { id: "DESC" },
      relations: {
        taskType: true,
      },
    });
  }

  async findOne(id: number): Promise<MedicalRecordIndex> {
    try {
      return await this.medicalRecordIndexRepository.findOneOrFail({
        where: { id },
        relations: {
          taskType: true,
        },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any record index.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateMedicalRecordIndexDto: UpdateMedicalRecordIndexDto,
  ): Promise<UpdateResult> {
    try {
      return await this.medicalRecordIndexRepository.update(
        id,
        updateMedicalRecordIndexDto,
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.medicalRecordIndexRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
