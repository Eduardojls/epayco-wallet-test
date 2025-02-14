# Wallet REST Service

This Service is a NestJS based application that handles the incoming
request from the _[epayco-wallet-frontend](epayco-wallet-frontend)_. This
service manage is connected to  _[epayco-wallet-master](epayco-wallet-master)_.
by the NestJS @Decorator @MessagePattern
## Installation

```bash
$ npm install
```

## Variables de entorno

The following environment variables must be added to the `.env`
file, to guarantee a successful installation.

- `PORT`: Port in which the service will be listening to.
- `URL_MS_MASTER`: The host where the service will be accessed from.
- `PORT_MS_MASTER`: The port designated to listen to the REST 1.
- `CLIENT_SERVICE`: Client service name.
- `WALLET_SERVICE`: Wallet service name
- `SWAGGER_PROJECT_NAME`: The API (Swagger) documentation name
- `SWAGGER_VERSION`: The swagger version used for documentation
- `SWAGGER_DESCRIPTION`: The swagger description.

> .env.example 
>
> ```
>PORT=4002
>URL_MS_MASTER=localhost
>PORT_MS_MASTER=8080
>SWAGGER_PROJECT_NAME=my-project-name
>SWAGGER_VERSION=1.0
>SWAGGER_DESCRIPTION=Bootstrap project for
> ```

## Ejecución de la App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Author

- [Eduardo López](https://www.linkedin.com/in/eduardojls/)
