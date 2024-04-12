import { Module } from "@nestjs/common";
import { BlockchainController } from "./blockchain.controller";
import { NearService } from "./near/near.service";

@Module({
  controllers: [BlockchainController],
  providers: [NearService],
})
export class BlockchainModule {}
