import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_ROOT_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  EMAIL_ADDRESS: string;
  EMAIL_PASSWORD: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_ROOT_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    EMAIL_ADDRESS: joi.string().required(),
    EMAIL_PASSWORD: joi.string().required(),
  })
  .unknown();

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  userDB: envVars.DB_USER,
  passwordDB: envVars.DB_PASSWORD,
  rootPassword: envVars.DB_ROOT_PASSWORD,
  nameDB: envVars.DB_NAME,
  hostDB: envVars.DB_HOST,
  portDB: envVars.DB_PORT,
  emailAddress: envVars.EMAIL_ADDRESS,
  emailPassword: envVars.EMAIL_PASSWORD,
};
