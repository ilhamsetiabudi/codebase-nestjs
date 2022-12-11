import { Injectable } from '@nestjs/common';
import { success } from './helper/response-handling/response';

@Injectable()
export class AppService {
  getHello(): any {
    return success(null, 'server is running');
  }
}
