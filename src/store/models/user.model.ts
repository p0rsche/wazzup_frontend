
export default class UserModel {
  id: number;
  login: string;
  email?: string;
  fullname?: string;
  avatar?: string;

  constructor() {
    this.id = -1;
    this.login = '';
  }
}