import Redis from 'ioredis';

const parse = (data: any) => {
  return JSON.parse(data);
};

export const set = (key: string, value: any, exp: number) => {
  return new Redis().set(key, JSON.stringify(value), 'EX', exp);
};

export const getDataRedis = (key: string) => {
  const result = new Promise((resolve, reject) => {
    new Redis().get(key, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply);
    });
  });
  return Promise.resolve(result)
    .then((res) => {
      if (!res) {
        return { err: true, data: null, message: 'key tidak ditemukan' };
      }
      return { err: false, data: parse(res), message: 'key tidak ditemukan' };
    })
    .catch((err) => {
      return { err: true, data: null, message: err };
    });
};
