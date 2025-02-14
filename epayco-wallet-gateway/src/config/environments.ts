import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  URL_MS_MASTER: string;
  PORT_MS_MASTER: string;
  CLIENT_SERVICE: string;
  WALLET_SERVICE: string;
  SWAGGER_PROJECT_NAME: string;
  SWAGGER_VERSION: string;
  SWAGGER_DESCRIPTION: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    URL_MS_MASTER: joi.string().required(),
    PORT_MS_MASTER: joi.string().required(),
    CLIENT_SERVICE: joi.string().required(),
    WALLET_SERVICE: joi.string().required(),
    SWAGGER_PROJECT_NAME: joi.string().required(),
    SWAGGER_VERSION: joi.string().required(),
    SWAGGER_DESCRIPTION: joi.string().required(),
  })
  .unknown();

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  urlMsMaster: envVars.URL_MS_MASTER,
  portMsMaster: envVars.PORT_MS_MASTER,
  clientService: envVars.CLIENT_SERVICE,
  walletService: envVars.WALLET_SERVICE,
  swaggerProjectName: envVars.SWAGGER_PROJECT_NAME,
  swaggerVersion: envVars.SWAGGER_VERSION,
  swaggerDescription: envVars.SWAGGER_DESCRIPTION
};
