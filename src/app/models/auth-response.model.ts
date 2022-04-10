import { BaseModel } from './base.model';

export class AuthResponseModel extends BaseModel {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
