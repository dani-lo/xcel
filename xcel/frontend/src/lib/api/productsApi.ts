import axios from 'axios'

// import { Product, ProductProps } from '../collections/product'

// const productTransformer = (p : ProductProps) => {
//     return new Product(p)
// }

export const getProducts = () => {
    return axios.get('/api/products')
}

export const getProduct = (pId : number) => {
    return axios.get(`/api/products/${ pId }`)
}