export class UserModel {
  constructor(
    public email: string,
    private _uid: string,
    private _tokenExpirationDate: Date,
    public firstName?: string,
    public lastName?: string
  ) {}

  get uid() {
    console.log('new: ', this._tokenExpirationDate)
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._uid;
  }


}
