import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, loginUser, verifyUser } from './create-user.dto';
import { User } from '../../entity/user.entity';
import * as argon2 from 'argon2';
const { generate } = require('randomstring');
import { set, getDataRedis } from '../../helper/cache/redis';
import { generateToken } from '../../utils/generateToken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(parameter: any) {
    const find: any = await this.userRepository.find(parameter);
    if (find.length < 1) {
      return { err: true, data: null };
    } else {
      return { err: false, data: find };
    }
  }

  async findOne(id: string) {
    const find: any = await this.userRepository.findOne({ where: { id } });
    if (!find) {
      return { err: true, data: null };
    } else {
      return { err: false, data: find };
    }
  }

  async register(data: CreateUserDto) {
    const find: any = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (find) {
      return { err: true, data: null, message: 'email sudah terdaftar' };
    }
    const user = new User();
    user.email = data.email;
    user.password = await argon2.hash(data.password);
    user.fullname = data.fullname;
    const insert = await this.userRepository.save(user);
    if (!insert) {
      return { err: true, data: null, message: 'failed insert data' };
    } else {
      const code = await generate({ length: 6, charset: 'numeric' });
      const payload = {
        ...data,
        code,
      };
      await set(`register-${insert.id}-${code}`, payload, 2 * 60);
      return { err: false, data: { id: insert.id, code } };
    }
  }

  async verify(data: verifyUser) {
    const get: any = await getDataRedis(`register-${data.id}-${data.code}`);
    return get;
  }

  async login(data: loginUser) {
    const { email, password } = data;
    const find: any = await this.userRepository.findOne({ where: { email } });
    if (!find) {
      return { err: true, data: null, message: 'email belum terdaftar' };
    }
    const verify = await argon2.verify(find.password, password);
    if (!verify) return { err: true, data: null, message: 'password salah' };
    const payload = {
      sub: find.id,
    };
    const token = await generateToken(payload);
    return { err: false, data: token, message: 'berhasil login' };
  }

  async updateUser(id: string) {
    await this.userRepository.update(
      { id },
      { isActive: true, verifyAt: new Date() },
    );
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
