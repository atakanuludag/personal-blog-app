import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Config } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //bodyParser: true,
    logger: console
  });

  app.setGlobalPrefix(Config.apiPrefix);
  app.useGlobalPipes(new ValidationPipe()); //Dtolarda tanımlanan tüm validasyonları uygulamaya yarar.
  app.enableCors();
  await app.listen(Config.apiPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();