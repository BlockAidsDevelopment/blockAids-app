import { Module } from "@nestjs/common";
import { BlockchainController } from "./blockchain.controller";
import { NearService } from "./near/near.service";
import { ArweaveService } from "./arweave/arweave.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [BlockchainController],
  providers: [NearService, ArweaveService],
})
export class BlockchainModule {}
