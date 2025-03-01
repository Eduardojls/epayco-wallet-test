# ePayco Wallet

## Project description

This project is a small wallet that host 4 key features, such as:
register client, add funds, register purchase, confirm purchase and
check your wallet's balance. Is developed using the BFF Pattern with a
REST API managed under the microservice architecture

### REST SERVICE 1 WITH ACCESS TO DATABASE

_[epayco-wallet-master](epayco-wallet-master)_

### REST SERVICE 2 WITH CLIENT'S ACCESS

_[epayco-wallet-gateway](epayoco-wallet-gateway)_

### WEB CLIENT

_[epayco-wallet-frontend](epayoco-wallet-frontend)_

---

## Project functionalities

### Register Client

- **Method**: `registerClient`
- **JSON**:
  - documentNumber (string)
  - name (string)
  - email (string)
  - phone (string)

**Description**: This method register a new client, at the same time creates
a wallet associated to the document number.

### Add Funds

- **Method**: `addFunds`
- **JSON**:
  - documentNumber (string)
  - phone (string)
  - amount (decimal)

**Description**: Allows the user to add funds to his/her wallet.

### Register Purchase

- **Method**: `registerPurchase`
- **JSON**:
  - documentNumber (string)
  - phone (string)
  - amount (decimal)
  - reference (string)

**Description**: Allow to register a purchase generating a 6 digit token with
a session ID, both of them must be used later to confirm the purchase and
withdraw the money from the wallet.

### Confirm Purchase

- **Method**: `confirmarPurchase`
- **JSON**:
  - idSession (string)
  - token (string)

**Description**: Checks if the token and session ID supplied by the user
are valid, in order to fullfil the purchase and generates a transaction.

### Check Balance

- **Method**: `checkBalance`
- **JSON**:
  - documentNumber (string)
  - phone (string)

**Description**: Checks the balance in the wallet.

## Response structure

Every response (success or error), both handles the same format:

- `data`: Object of DTO type that returns the client or wallet's information.
- `statusCode`: Http code that represents the status of the request.
- `message`: Detailed message with information about the error or success.

## Author

- [Eduardo López](https://www.linkedin.com/in/eduardojls/)

---
