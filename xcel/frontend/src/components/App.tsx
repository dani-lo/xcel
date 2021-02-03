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
import { RegistrationPage } from '../pages/register'

import { AppHeader } from './widget/header'

import { appReducer, initialState } from '../data/reducer'

import { bootstrap } from '../data/bootstrap'
import { useNotification } from '../hooks/useNotification'
import { Notify } from './widget/notifiction'

const StyledPage = styled.div`
    max-width: 900px;
    margin: 0 auto;
`

const App = () => {

    const [state, dispatch] = useReducer(appReducer, initialState)
    
    useEffect(() => {
        bootstrap(dispatch)
    }, [])
    
    useNotification(state, dispatch)

    return  <Router>
        <AppContext.Provider value={{ appstate: state, update: dispatch }}>
            <AppHeader />
            <StyledPage>
                <Notify notification={ state.notify } />
                <Switch>
                    <Route path="/account">
                        <AccountPage />
                    </Route>
                    <Route path="/register">
                        <RegistrationPage />
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