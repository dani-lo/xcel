import { User } from "lib/collections/user"
import { Account } from "lib/collections/account"
import { getLocalUser } from "./localUser"


export const setLocalUserAccount = (account: Account) => {

  const user = getLocalUser() as User || { id: new Date().getTime() }

  // @ts-ignore
  user.account = account

  localStorage.setItem('user', JSON.stringify(user))
}