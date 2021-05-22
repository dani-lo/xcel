import { Account } from './account';

export interface UserProps {
  id: number;
  // email : string;
  account: Account | null;
}

export class User  {
  id: number;
  // email : string;
  account: Account | null;

  constructor (userData : UserProps) {
    this.id = userData.id;
    // this.email = userData.email
    this.account = userData.account
  }

}