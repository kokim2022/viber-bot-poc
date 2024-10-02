import { Injectable } from '@nestjs/common';
import { BodyInterface } from './app.controller';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'running viber bot poc';
  }

  async setWebhook(publicUrl): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      'X-Viber-Auth-Token': this.configService.get('botToken'),
    };

    const data = {
      url: publicUrl,
      // You can add more optional parameters here, such as event types, etc.
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(publicUrl, data, { headers }),
      );
      console.log('RESONSE', response.data);
    } catch (error) {
      console.log('webhook failed');
      console.error('Failed to set the webhook:', error);
    }
  }

  async sendMessage(body: BodyInterface): Promise<any> {
    const { phoneNumber, message } = body;
    const headers = {
      'Content-Type': 'application/json',
      'X-Viber-Auth-Token': this.configService.get('botToken'),
    };

    const data = {
      receiver: phoneNumber, // The Viber user ID to whom the message will be sent
      min_api_version: 7,
      sender: {
        name: 'Test Bot', // Name of your bot
        avatar: 'https://i.imgur.com/3xy9sGS.jpeg', // Optional, the avatar image of your bot
      },
      tracking_data: 'tracking data', // Optional, tracking data that can be passed to the webhook
      type: 'text', // Message type
      text: message, // The message text to be sent
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://chatapi.viber.com/pa/send_message',
          data,
          { headers },
        ),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error sending Viber message:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
