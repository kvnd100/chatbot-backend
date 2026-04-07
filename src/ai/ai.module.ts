import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  exports: [AiService],
  providers: [AiService],
})
export class AiModule {}
