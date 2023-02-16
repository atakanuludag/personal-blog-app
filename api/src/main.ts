import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from '@/app.module'
import { IEnv } from '@/common/interfaces/env.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //bodyParser: true,
    //logger: console,
    bufferLogs: true,
  })

  const configService = app.get<ConfigService<IEnv>>(ConfigService)
  const apiPrefix = configService.get<string>('API_PREFIX')
  const apiPort = configService.get<string>('API_PORT')
  const swaggerUrl = configService.get<string>('API_SWAGGER_URL')

  //Swagger
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer',
        in: 'Header',
      },
      'accessToken',
    )
    .setTitle('Personal Blog App Rest API')
    .setDescription('Personel blog app api.')
    .setVersion('3.0.3')
    .addServer(apiPrefix)
    .addTag('User', 'User endpoint')
    .addTag('Category', 'Category endpoint')
    .addTag('Tag', 'Tag endpoint')
    .addTag('File', 'File endpoint')
    .addTag('Settings', 'Settings endpoint')
    .addTag('Article', 'Article endpoint')
    .addTag('Page', 'Page endpoint')
    .addTag('Report', 'Report endpoint')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(swaggerUrl, app, document)

  app.setGlobalPrefix(apiPrefix)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  )
  app.enableCors()
  await app.listen(apiPort)
  const appUrl = await app.getUrl()
  console.log(`Application is running on: ${appUrl}`)
  console.log(`Swagger: ${appUrl}/${swaggerUrl}`)
}
bootstrap()
