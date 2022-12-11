import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './modules/users/user.service';
import { UserController } from './modules/users/user.controller';
import { createConnection } from './helper/typeorm/typeorm';
import { redisConnection } from './helper/cache/cachesConnection';
import { setEnv, mysql, redis } from './config';
@Module({
  imports: [
    setEnv(),
    createConnection(mysql()),
    TypeOrmModule.forFeature([User]),
    redisConnection(redis()),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
