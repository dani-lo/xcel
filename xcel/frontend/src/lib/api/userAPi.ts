import axios from 'axios'

import { Account, AccountProps } from 'lib/collections/account'

import { getCSRFToken } from 'lib/util/token'

/**
 * 
 */
export const getUser = () => {

  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.get('/api/user/', config)
}

/**
 * 
 * @param data 
 */
export const register = (data: { email: string; password: string }) => {
  return axios.post('/api/register/', data)
}

/**
 * 
 * @param account 
 */
export const addAccount = (account: AccountProps) => {

  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}


  return axios.post('/api/account/', {
    ...account
  }, config)
}

/**
 * 
 * @param account 
 */
export const editAccount = (account: Account, accId : number) => {

  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}


  return axios.put(`api/account/update/${ accId }/`, {
    ...account.saveable(false)
  }, config)
}

/**
 * 
 */
export const logout = () => {
  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}

  const response =  axios.get('/api/logout/', config)

  return response
}

/**
 * 
 * @param data 
 */
export const login = (data: {email: string; password: string}) => {
  return axios.post('/api/login/', data)
}