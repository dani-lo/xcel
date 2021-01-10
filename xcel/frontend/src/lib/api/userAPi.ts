import axios from 'axios'

import { getCSRFToken } from '../util/token'

export const getUser = () => {

  const csrftoken = getCSRFToken()
  
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.get('/api/user', config)
}