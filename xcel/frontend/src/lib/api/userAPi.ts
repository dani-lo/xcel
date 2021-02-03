import axios from 'axios'

import { Account } from '../collections/account'

import { getCSRFToken } from '../util/token'

/**
 * 
 */
export const getUser = () => {

  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.get('/api/user', config)
}

/**
 * 
 * @param data 
 */
export const register = (data: { email: string; password: string }) => {
  return axios.post('/api/register', data)
}

/**
 * 
 * @param account 
 */
export const addAccount = (account: Account) => {

  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}


  return axios.post('/api/account/', {
    ...account.saveable(false)
  }, config)
}

/**
 * 
 */
export const logout = () => {
  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.get('/api/logout/', config)
}

/**
 * 
 * @param data 
 */
export const login = (data: {email: string; password: string}) => {
  
  return axios.post('/api/login', data)
}