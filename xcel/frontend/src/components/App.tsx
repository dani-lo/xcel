import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router,
        Switch,
        Route } from 'react-router-dom'
import styled from 'styled-components'

import { AppContext } from 'data/provider'
import { appReducer, APP_STATUS, initialState } from 'data/reducer'
import { bootstrap } from 'data/bootstrap'

import { HomePage } from 'pages/home'
import { ProductsPage } from 'pages/products'
import { AccountPage } from 'pages/account'
import { BasketPage } from 'pages/basket'
import { PaymentConfirmPage } from 'pages/confirmation'
import { LocalOrdersPage } from 'pages/localOrders'


import { AppFooter } from 'components/widget/footer'
import { Notify } from 'components/widget/notifiction'
import { AppHeader } from 'components/widget/header'

const AppWrapper = styled.div`
    background: var(--white);
    padding-top: 3em;
    padding-bottom: 3em;

    @media only screen and (max-width: 800px) {
        padding-left: 1em;
        padding-right: 1em;
    }
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
            <Notify notifications={ state.notify } />
            <AppWrapper>
                <Switch>
                    <Route path="/payment_confirm/:poid">
                        <PaymentConfirmPage />
                    </Route>
                    <Route path="/local_orders/:xcelid">
                        <LocalOrdersPage />
                    </Route>
                    <Route path="/account">
                        <AccountPage />
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
            </AppWrapper>
            <AppFooter />
        </AppContext.Provider>
  </Router>
}

export default App