import AuthController from '../api/v1/controllers/auth';
import AuthService from '../services/auth.service';

function createAuthController() {
  const service = new AuthService();
  return new AuthController(service);
}

export {
  createAuthController
}

