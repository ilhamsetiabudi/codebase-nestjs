import { TypeOrmModule } from '@nestjs/typeorm';

export const createConnection = (config: any) => {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: config.host,
    port: Number(config.port),
    username: config.username,
    password: config.password,
    database: config.database,
    autoLoadEntities: true,
    synchronize: true,
  });
};
