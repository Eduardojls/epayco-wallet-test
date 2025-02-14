# Wallet REST Service

This REST Service is a NestJS based application that handles the incoming
request from the _[epayco-wallet-gateway](epayoco-wallet-gateway)_. This
service manage the main logic and database interaction (connection, insertions, etc) 

## Instalation

```bash
$ npm install
$ docker-compose up  -d
```

## Variables de entorno

The following environment variables must be added to the `.env`
file, to guarantee a successful installation.

- `PORT`: Port in which the service will be listening to.
- `DB_USER`: The name given to the database.
- `DB_PASSWORD`: The password assigned to the database.
- `DB_ROOT_PASSWORD`: The MYSQL root password.
- `DB_NAME`: The name given to the database
- `DB_HOST`: The host set to the database
- `DB_PORT`: The MYSQL port associated
- `EMAIL_ADDRESS`: Email address configured to send emails.
- `EMAIL_PASSWORD`: Email private password set to authenticate.

> .env.example 
>
> ```
> DB_USER=database_user
> DB_PASSWORD=secr3tp455w0rd
> DB_ROOT_PASSWORD=myp45w0rd
> DB_NAME=wallet_database
> DB_HOST=localhost
> DB_PORT=3306
> 
> PORT=3000
> 
> EMAIL_ADDRESS=test@yopmail.com
> EMAIL_PASSWORD=klsf jgky qesf mgjt
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

## API Endpoints

### Swagger

### Client

- **GET /api/**: Acceso a la documentación del sevicio REST con Swaggerr.

### Wallet

- **POST /client**: Register a new client into database.
- **PATCH /wallet/funds/add**: Add funds to a client's wallet.
- **GET /wallet/funds/check**: Check the wallet's balance of a client.
- **POST /wallet/purchase/register**: Perform a purchase and  generate a token and session ID.
- **POST /wallet/purchase/confirm**: Confirm  a client's payment by validating the token and session ID.

## Author

- [Eduardo López](https://www.linkedin.com/in/eduardojls/)
