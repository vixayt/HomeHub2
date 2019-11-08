export class UserModel {
  constructor(
    public _email: string,
    private _uid: string,
    private _tokenExpirationDate: Date,
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

  get uid() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._uid;
  }


}
