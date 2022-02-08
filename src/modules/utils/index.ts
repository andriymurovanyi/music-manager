import crypto from 'crypto';
import jwt from 'jsonwebtoken';

class Utils {
  public static encryptPassword(password: string, passwordSalt: string) {
    const keyLength = 28;
    const iterationsCount = 1;
    const digest = 'sha1';

    return crypto.pbkdf2Sync(
      password,
      passwordSalt,
      iterationsCount,
      keyLength,
      digest
    ).toString('base64');
  }

  public static verifyToken(token: string) {
    const jwtKey = process.env.JWT_KEY;

    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtKey, (error: any, decodedData: any) => {
        if (error) {
          return reject(error);
        }

        return resolve(decodedData);
      });
    });
  }

  public static verifyEmail(email: string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }
}

export default Utils;