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
import { RegistrationPage } from '../pages/register'

import { AppHeader } from './widget/header'

import { appReducer, APP_STATUS, initialState } from '../data/reducer'

import { bootstrap } from '../data/bootstrap'
import { useNotification } from '../hooks/useNotification'
import { Notify } from './widget/notifiction'
import { notifyError, notifySuccess } from 'data/shortcuts'

const StyledPage = styled.div`
    max-width: 900px;
    margin: 0 auto;
`

let num = 0

const App = () => {

    const [state, dispatch] = useReducer(appReducer, initialState)
    
    useEffect(() => {
        bootstrap(dispatch)
    }, [])
    
    //useNotification(state, dispatch)

    if (state.status === APP_STATUS.NONE) {
        return null
    }

    return  <Router>
        <AppContext.Provider value={{ appstate: state, update: dispatch }}>
            <AppHeader />
            <StyledPage>
                {/* <button onClick={() => {
                    num % 2 === 0 ? 
                        notifyError(dispatch, `this is notification ${ num++ }`) :
                        notifySuccess(dispatch, `this is notification ${ num++ }`)
                }}
                >NOTFIY</button> */}
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
        </AppContext.Provider>
  </Router>
}

export default App