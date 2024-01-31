import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.get('PORT');
  await app
    .listen(port)
    .then(() => console.log('Server started at port: ', port));
}
bootstrap();
