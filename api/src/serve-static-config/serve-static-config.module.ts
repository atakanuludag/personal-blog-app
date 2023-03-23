import { Module } from '@nestjs/common'
import { ServeStaticConfigurationService } from '@/serve-static-config/serve-static-config.service'

@Module({
  imports: [],
  providers: [ServeStaticConfigurationService],
  exports: [ServeStaticConfigurationService],
})
export class ServeStaticConfigurationModule {}
