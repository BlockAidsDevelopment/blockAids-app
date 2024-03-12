import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { MedicalRecords } from "../entities/medical-record.entity";
import { CreateMedicalRecordDto } from "../dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "../dto/update-medical-record.dto";

@Injectable()
export class CrudMedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecords)
    private readonly medicalRecordsRepository: Repository<MedicalRecords>,
  ) {}

  async create(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecords> {
    return await this.medicalRecordsRepository.save(createMedicalRecordDto);
  }

  findAll(): Promise<MedicalRecords[]> {
    return this.medicalRecordsRepository.find({
      order: { id: "DESC" },
      relations: {
        task: true,
        medicalRecordIndex: true,
      },
    });
  }

  findAllByTaskTypeId(taskId: string): Promise<MedicalRecords[]> {
    return this.medicalRecordsRepository.find({
      where: { taskId: taskId },
      order: { id: "DESC" },
      relations: {
        task: true,
        medicalRecordIndex: true,
      },
    });
  }

  findAllByMedicalRecordsIndexId(
    medicalRecordIndexId: string,
  ): Promise<MedicalRecords[]> {
    return this.medicalRecordsRepository.find({
      where: { medicalRecordIndexId: medicalRecordIndexId.toString() },
      order: { id: "DESC" },
      relations: {
        task: true,
        medicalRecordIndex: true,
      },
    });
  }

  async findOne(id: number): Promise<MedicalRecords> {
    try {
      return await this.medicalRecordsRepository.findOneOrFail({
        where: { id },
        relations: {
          task: true,
          medicalRecordIndex: true,
        },
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any record.",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<UpdateResult> {
    try {
      return await this.medicalRecordsRepository.update(
        id,
        updateMedicalRecordDto,
      );
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.medicalRecordsRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
