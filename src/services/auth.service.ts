import IAuthService from '../interfaces/services/auth.service';

class AuthService implements IAuthService {
  constructor() {}

  public async login(email: string, password: string) {
    console.log('Email: ', email);
    console.log('Password: ', password);
    return Promise.resolve(email);
  }

  public async register(email: string, password: string) {
    console.log('Email: ', email);
    console.log('Password: ', password);
    return Promise.resolve(email);
  }
}

export default AuthService;
