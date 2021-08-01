import IAuthController from '../../../interfaces/controllers/auth.controller';
import IAuthService from '../../../interfaces/services/auth.service';
import {ExtendableContext} from 'koa';
import UserModel from '../../../models/User.model';
import jwt from 'jsonwebtoken';

const JWT_LIFETIME = '1m';
const JWT_KEY = process.env.JWT_KEY;

class AuthController implements IAuthController {
  constructor(
    private readonly authService: IAuthService
  ) {
    this.authService = authService;
  }

  public async register (ctx: ExtendableContext) {
    const { first_name, last_name, email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.throw(400);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const errorMessage = `User ${email} already exists`;
      ctx.throw(409, errorMessage);
    }

    const user: any = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
    });

    const jwtKey = process.env.JWT_KEY;
    user.token = jwt.sign({
        user_id: user.id,
        email
      },
      jwtKey,
      { expiresIn: JWT_LIFETIME });

    ctx.body = user;
  }

  public async login (ctx: ExtendableContext) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.throw(400);
    }

    const user: any = await UserModel.findOne({ email });
    if (!user) {
      ctx.throw(404);
    }

    console.log('JWT key: ', JWT_KEY);

    if (!user.checkPassword(password)) {
      ctx.throw(403, 'Incorrect credentials');
    }

    const jwtKey = process.env.JWT_KEY;
    user.token = jwt.sign({
        user_id: user.id,
        email
      },
      jwtKey,
      { expiresIn: JWT_LIFETIME });

    ctx.body = user;
  }
}

export default AuthController;
