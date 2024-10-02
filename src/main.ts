import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPublicUrl } from './get_public_url';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable cors
  app.enableCors();

  // connect viber bot
  const appService = app.get(AppService);
  const port = 3000;
  try {
    await getPublicUrl()
      .then((publicUrl) => {
        console.log(publicUrl);
        app.listen(port, () => appService.setWebhook(`${publicUrl}/webhook`));
      }) //
      .catch((error) => {
        console.log('Can not connect to ngrok server. Is it running?');
        console.error(error);
        process.exit(1);
      });
  } catch (error) {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
