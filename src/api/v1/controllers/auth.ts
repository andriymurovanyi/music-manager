import IAuthController from 'interfaces/controllers/auth.controller';
import IAuthService from 'interfaces/services/auth.service';
import { ExtendableContext } from 'koa';
import UserModel from 'models/User.model';
import jwt from 'jsonwebtoken';
import { APIError } from 'modules/errors';
import User from 'api/v1/dto/User';
import Utils from 'modules/utils';

const JWT_LIFETIME = '24h';

class AuthController implements IAuthController {
  constructor(
    private readonly authService: IAuthService
  ) {
    this.authService = authService;
  }

  public async register (ctx: ExtendableContext) {
    const { first_name, last_name, email, password } = ctx.request.body;
    const invalidFields = [];

    if (!email || !Utils.verifyEmail(email)) {
      invalidFields.push('email');
    }

    if (!password) {
      invalidFields.push('password');
    }

    if (invalidFields.length) {
      const errorMessage = `Invalid values provided for: ${invalidFields.join(', ')}`;
      throw new APIError(400, errorMessage);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const errorMessage = `Email ${email} already exists`;
      throw new APIError(409, errorMessage);
    }

    const user: any = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
    });

    ctx.body = new User(user);
  }

  public async login (ctx: ExtendableContext) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.throw(400);
    }

    const user: any = await UserModel.findOne({ email });
    if (!user) {
      throw new APIError(404, 'User was not found');
    }

    if (!user.checkPassword(password)) {
      throw new APIError(403, 'Incorrect password');
    }

    const jwtKey = process.env.JWT_KEY;
    const token = jwt.sign({
        user_id: user.id,
        email
      },
      jwtKey,
      { expiresIn: JWT_LIFETIME });

    const UserDTO = new User(user);
    UserDTO.setToken(token);

    ctx.body = UserDTO;
  }
}

export default AuthController;
