import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from '@/app.module'
import { IEnv } from '@/common/interfaces/env.interface'
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { setupSwagger } from '@/setupSwagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    //logger: console,
    bufferLogs: true,
  })

  const configService = app.get<ConfigService<IEnv>>(ConfigService)
  const apiPrefix = configService.get<string>('API_PREFIX')
  const apiPort = configService.get<string>('API_PORT')
  const swaggerUrl = configService.get<string>('SWAGGER_URL')

  setupSwagger(app)

  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix(apiPrefix)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.enableCors()
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(apiPort)
  const appUrl = await app.getUrl()
  console.log(`Application is running on: ${appUrl}`)
  console.log(`Swagger: ${appUrl}/${swaggerUrl}`)
}
bootstrap()
