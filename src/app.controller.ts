import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

export interface BodyInterface {
  phoneNumber: string;
  message: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-message')
  sendMessage(@Body() body: BodyInterface): Promise<any> {
    return this.appService.sendMessage(body);
  }

  @Post('webhook')
  async handleWebhook(@Req() req, @Res() res) {
    console.log('requestBody', req.body);
    res.sendStatus(200);
  }
}
