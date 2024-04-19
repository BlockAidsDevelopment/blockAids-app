import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ArweaveService } from "./arweave/arweave.service";
import { CreateMetadataDto } from "./dto/create-metadata.dto";

@ApiTags("Blockchain")
@Controller("api/blockchain")
export class BlockchainController {
  constructor(private readonly arweaveService: ArweaveService) {}

  @ApiResponse({ status: 200, type: Object })
  @ApiOperation({ summary: "Store data json" })
  @Post("/store-json")
  async storeDataJson(@Body() createMetadataDto: CreateMetadataDto) {
    const metadata = {
      date: new Date(),
      hash: this.arweaveService.createEncryptedJson(
        JSON.stringify(JSON.parse(JSON.stringify(createMetadataDto.json))),
        createMetadataDto.userId,
      ),
    };

    const storedJson = await this.arweaveService.uploadJson(
      JSON.stringify(metadata),
    );

    const mainJsonLink = await this.arweaveService.createOrUpdateMainJson(
      storedJson.data.link,
      createMetadataDto.userId,
    );

    return {
      mainJson: mainJsonLink,
      itemJson: storedJson
    };
  }

  @ApiResponse({ status: 200, type: Object })
  @ApiOperation({ summary: "Decrypt Metadata" })
  @Get("/metadata/decrypt/:hash/:id")
  async decryptMetadata(@Param("hash") hash: string, @Param("id") id: string) {
    const data = this.arweaveService.getDecryptedJson(hash, id);
    return JSON.parse(data);
  }

  @ApiResponse({ status: 200, type: Object })
  @ApiOperation({ summary: "Decrypt Metadata" })
  @Get("/decrypted/:onChainLink/:userId")
  async getDecryptedDataJson(
    @Param("onChainLink") onChainLink: string,
    @Param("userId") userId: string,
  ) {
    const response = await this.arweaveService.getJsonByOnChainLink(
      onChainLink,
      userId,
    );

    return { ...response };
  }
}
