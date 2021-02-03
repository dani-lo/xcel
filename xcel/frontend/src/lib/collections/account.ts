
export interface AccountProps {
  id ?: number;
  firstname : string;
  lastname: string;
  address_line_1: string;
  address_line_2: string;
  country: string;
  postcode: string;
}

export class Account  {
  id ?: number;
  firstname : string;
  lastname: string;
  address_line_1: string;
  address_line_2: string;
  country: string;
  postcode: string;

  constructor (accountData : AccountProps) {
    this.id = accountData.id
    this.firstname = accountData.firstname
    this.lastname = accountData.lastname
    this.address_line_1 = accountData.address_line_1
    this.address_line_2 = accountData.address_line_2
    this.country = accountData.country
    this.postcode = accountData.postcode
  }

  saveable (updating : boolean) {
    const saveableData : Partial<Account> = {
      firstname: this.firstname,
      lastname: this.lastname,
      address_line_1: this.address_line_1,
      address_line_2: this.address_line_2,
      country: this.country,
      postcode: this.postcode
    }

    if (updating) {
      saveableData.id = this.id
    }

    return saveableData
  }
}
