export class UserModel {
  constructor(
    public _email: string,
    public _firstName?: string,
    public _lastName?: string
  ) {}

  get email() {
    return this._email;
  }
  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }
}
