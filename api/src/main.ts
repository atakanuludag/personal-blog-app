import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/interfaces/environment-variables.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //bodyParser: true,
    logger: console
  });

  const configService = app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  
  app.setGlobalPrefix(configService.get<string>('API_PREFIX'));
  app.useGlobalPipes(new ValidationPipe()); //Dtolarda tanımlanan tüm validasyonları uygulamaya yarar.
  app.enableCors();
  await app.listen(configService.get<string>('API_PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();