import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router,
        Switch,
        Route } from 'react-router-dom'

import { AppContext } from '../data/provider'

import { HomePage } from '../pages/home'
import { ProductsPage } from '../pages/products'
import { AccountPage } from '../pages/account'
import { BasketPage } from '../pages/basket'
import { Aboutpage } from '../pages/about'

import { AppHeader } from './widget/header'

import { User } from './user/user'

import { appReducer } from '../data/reducer'

import { bootstrap } from '../data/bootstrap'
import { useNotification } from '../hooks/useNotification'
import { NotificationType, Notify } from './widget/notifiction'

const StyledPage = styled.div`
    max-width: 900px;
    margin: 0 auto;
`

const App = () => {

    const initialState = {
        user: null,
        products: [],
        notify: null
    }

    const [state, dispatch] = useReducer(appReducer, initialState)
    
    useEffect(() => {
        bootstrap(dispatch)
    }, [])
    
    useNotification(state, dispatch)

    return  <Router>
        <AppContext.Provider value={{ appstate: state, update: dispatch }}>
            <StyledPage>
                <Notify notification={ state.notify } />
                <User />
                <AppHeader />
                <Switch>
                    <Route path="/account">
                        <AccountPage />
                    </Route>
                    <Route path="/basket">
                        <BasketPage />
                    </Route>
                    <Route path="/shop">
                        <ProductsPage />
                    </Route>
                    <Route path="/about">
                        <Aboutpage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </StyledPage>
        </AppContext.Provider>
  </Router>
}

export default App