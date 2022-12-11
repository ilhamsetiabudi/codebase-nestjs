import { RedisModule } from '@liaoliaots/nestjs-redis';

export const redisConnection = (config: any) => {
  return RedisModule.forRoot({
    config: {
      host: config.host,
      port: Number(config.port),
      password: config.password,
    },
  });
};
