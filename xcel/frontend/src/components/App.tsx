import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router,
        Switch,
        Route } from 'react-router-dom'

import { AppContext } from 'data/provider'
import { appReducer, APP_STATUS, initialState } from 'data/reducer'
import { bootstrap } from 'data/bootstrap'

import { HomePage } from 'pages/home'
import { ProductsPage } from 'pages/products'
import { AccountPage } from 'pages/account'
import { BasketPage } from 'pages/basket'
import { RegistrationPage } from 'pages/register'

import { AppFooter } from 'components/widget/footer'
import { Notify } from 'components/widget/notifiction'
import { AppHeader } from 'components/widget/header'


const StyledPage = styled.div`
    max-width: 900px;
    margin: 0 auto;
`


const App = () => {

    const [state, dispatch] = useReducer(appReducer, initialState)
    
    useEffect(() => {
        bootstrap(dispatch)
    }, [])
    
    if (state.status === APP_STATUS.NONE) {
        return null
    }

    return  <Router>
        <AppContext.Provider value={{ appstate: state, update: dispatch }}>
            <AppHeader />
            <StyledPage>
                <Notify notifications={ state.notify } />
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
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </StyledPage>
            <AppFooter />
        </AppContext.Provider>
  </Router>
}

export default App