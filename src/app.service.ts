import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    console.log(process.env.PORT);

    return 'Hello World!';
  }
}
