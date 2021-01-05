import React from 'react';

import axios from 'axios'

import { Product } from '../../lib/collections/product'
import { getProducts } from '../../lib/api/productsApi'

import { getCSRFToken } from '../../lib/util/token'

export const HomePage = () => {

	const csrftoken = getCSRFToken()
	const data = { instructions: '123 in in struct' }
	const config = { headers: {'X-CSRFToken': csrftoken }}

	return <div>
		<h1>Hello World Home page!</h1>
		<button
			onClick={
				() => {
					axios.post('/api/orders/', data, config)
				}
			}
		>create</button>
	</div>
	
}