interface IAuthService {
  login: (login: string, password: string) => Promise<any>,
  register: (login: string, password: string) => Promise<any>
}

export default IAuthService;
