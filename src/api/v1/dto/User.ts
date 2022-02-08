export class User {
  private first_name: string;
  private last_name: string;
  private email: string;

  private token: string;

  constructor(userObj: any) {
    this.first_name = userObj.first_name;
    this.last_name = userObj.last_name;
    this.email = userObj.email;
  }

  public getToken() {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }
}

export default User;