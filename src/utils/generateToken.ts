const jwt = require('jsonwebtoken');

export const generateToken = (agent: object): string => {
  const secret: string = process.env.SECRET;
  const generate = jwt.sign(agent, secret, { expiresIn: '24h' });
  return generate;
};
