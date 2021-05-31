
export interface AccountProps {
  id ?: number;
  email: string;
  firstname : string;
  lastname: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postcode: string;
}

export class Account  {
  id ?: number;
  email: string;
  firstname : string;
  lastname: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postcode: string;

  constructor (accountData : AccountProps) {
    this.id = accountData.id
    this.email = accountData.email
    this.firstname = accountData.firstname
    this.lastname = accountData.lastname
    this.address_line_1 = accountData.address_line_1
    this.address_line_2 = accountData.address_line_2
    this.city = accountData.city
    this.postcode = accountData.postcode
  }

  saveable (updating : boolean) {
    const saveableData : Partial<Account> = {
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      address_line_1: this.address_line_1,
      address_line_2: this.address_line_2,
      city: this.city,
      postcode: this.postcode
    }

    if (updating) {
      saveableData.id = this.id
    }

    return saveableData
  }
}
