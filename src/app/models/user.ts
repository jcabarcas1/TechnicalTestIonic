export class User {

  username: string;
  password: string;

  toModel(user: any) {
    this.username = user.username;
    this.password = user.password;
  }

}
