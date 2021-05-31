import axios from 'axios'


export const apiTester = () => {
    return axios.get('/api/products')
}