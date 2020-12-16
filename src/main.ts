import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log(`app is started at 3000`)
    console.log(`ENV: ${JSON.stringify(process.env)}`);
  });
}
bootstrap();
