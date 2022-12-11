import {
  Body,
  Controller,
  HttpStatus,
  Post,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto, verifyUser } from './create-user.dto';
import { UserService } from './user.service';
import { error, success } from '../../helper/response-handling/response';
import { registerJoi, verifyJoi, login } from '../users/validation';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    const valid = registerJoi.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );
    }
    const insert: any = await this.userService.register(valid.value);
    if (insert.err) {
      throw new HttpException(
        error(insert.message, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );
    }
    return success(insert.data, 'success insert data');
  }

  @Post('register/verify')
  async verifyUser(@Body() data: verifyUser) {
    const valid = verifyJoi.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );
    }
    const getKey: any = await this.userService.verify(valid.value);
    if (getKey.err) {
      throw new HttpException(
        error(getKey.message, HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userService.updateUser(data.id);
    return success(getKey.data, 'success verify data');
  }

  @Post('login')
  async loginUser(@Body() data: verifyUser) {
    const valid = login.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, HttpStatus.BAD_REQUEST),
        HttpStatus.BAD_REQUEST,
      );
    }
    const generateToken: any = await this.userService.login(valid.value);
    if (generateToken.err) {
      throw new HttpException(
        error(generateToken.message, HttpStatus.CONFLICT),
        HttpStatus.CONFLICT,
      );
    }
    return success(generateToken.data, 'success login');
  }
}
