import crypto from "crypto";
import jwt from "jsonwebtoken";

type objectType = { [key: string]: any }

class ApiError extends Error {
  constructor(status: number, message?: string, data?: objectType) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor)
  }
}

function encryptPassword(password: string, passwordSalt: string) {
  const keyLength = 28;
  const iterationsCount = 1;
  const digest = 'sha1';

  return crypto.pbkdf2Sync(
    password,
    passwordSalt,
    iterationsCount,
    keyLength,
    digest
  ).toString('base64')
}

async function verifyToken(token: string) {
  const jwtKey = process.env.JWT_KEY;

  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtKey, (error: any, decodedData: any) => {
      if (error) {
        console.log('Error is: ', error);
        return reject(error);
      }

      return resolve(decodedData);
    });
  });
}

export {
  ApiError,
  encryptPassword,
  verifyToken,
}
