import * as joi from 'joi';
import { joiCustomMessages } from '../../utils/joiMessages';

export const registerJoi = joi.object().keys({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'id'] } })
    .error((errors) => joiCustomMessages(errors)),
  fullname: joi
    .string()
    .required()
    .error((errors) => joiCustomMessages(errors)),
  password: joi
    .string()
    .required()
    .error((errors) => joiCustomMessages(errors)),
});

export const verifyJoi = joi.object().keys({
  id: joi
    .string()
    .required()
    .error((errors) => joiCustomMessages(errors)),
  code: joi
    .string()
    .required()
    .error((errors) => joiCustomMessages(errors)),
});

export const login = joi.object().keys({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'id'] } })
    .error((errors) => joiCustomMessages(errors)),
  password: joi
    .string()
    .required()
    .error((errors) => joiCustomMessages(errors)),
});
