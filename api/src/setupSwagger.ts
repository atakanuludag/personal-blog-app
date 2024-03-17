import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as basicAuth from 'express-basic-auth'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { IEnv } from '@/common/interfaces/env.interface'

export const setupSwagger = (app: INestApplication) => {
  const configService = app.get<ConfigService<IEnv>>(ConfigService)

  const swaggerUsername = configService.get('SWAGGER_USERNAME')
  const swaggerPassword = configService.get('SWAGGER_PASSWORD')
  const apiPrefix = configService.get<string>('API_PREFIX')
  const swaggerUrl = configService.get<string>('SWAGGER_URL')

  if (process.env.NODE_ENV !== 'development') {
    app.use(
      [`/${swaggerUrl}`, `/${swaggerUrl}-json`],
      basicAuth({
        challenge: true,
        users: {
          [swaggerUsername]: swaggerPassword,
        },
      }),
    )
  }

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
    .addTag('Article', 'Article endpoint')
    .addTag('Page', 'Page endpoint')
    .addTag('Report', 'Report endpoint')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(swaggerUrl, app, document)
}
