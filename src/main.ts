import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Pipes
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger Config
  const swaggerConfig = new DocumentBuilder()
      .setTitle('todo api')
      .setDescription('todo api nestjs + postgres')
      .setVersion('0.0.1')
      .addTag('todo')
      .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3001);
}
bootstrap();
