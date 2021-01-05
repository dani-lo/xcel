import React from 'react';
import { BrowserRouter as Router,
        Switch,
        Route,
        Link } from 'react-router-dom'

import { HomePage } from './pages/home'
import { ProductsPage } from './pages/products'

import { Navbar } from './widget/navbar'


const App = () => {
    return  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Homer</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/about">
          <h2>about</h2>
        </Route>
        <Route path="/shop">
          <ProductsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  </Router>
}

export default App