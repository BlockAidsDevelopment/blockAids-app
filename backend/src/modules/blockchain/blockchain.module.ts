import { Module } from "@nestjs/common";
import { BlockchainController } from "./blockchain.controller";
import { NearService } from "./near/near.service";
import { ArweaveService } from "./arweave/arweave.service";

@Module({
  controllers: [BlockchainController],
  providers: [NearService, ArweaveService],
})
export class BlockchainModule {}
