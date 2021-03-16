import React from 'react'
import { useForm } from "react-hook-form"

import { login  } from 'lib/api/userAPi'
import { reEmail } from 'lib/util/regex' 

import { useXcelContext } from 'data/provider'
import { bootstrap } from 'data/bootstrap'
import { notifySuccess, notifyError } from 'data/shortcuts'

import { FormError } from 'components/widget/formError'

import { XFormInputTxt, XFormInputSubmit } from 'styles/styled'

interface Inputs {
  email: string,
  password: string,
}

export const UserLogin = () => {

  const { 
    register, 
    handleSubmit, 
    errors 
  } = useForm<Inputs>()

  const { update } = useXcelContext()

  const onLogin = async (data : Inputs) => {

    try {

      await login(data)
      
      bootstrap(update, 'You have successfully logged in')
    } catch (err) {
      notifyError(update, 'Sorry, something went wrong')
    }
  }

  return <form onSubmit={handleSubmit(onLogin)}>
    <XFormInputTxt>
      <label htmlFor="email">email</label>
      <input type="text" id="email" name="email" ref={register({ pattern: reEmail })} />
      <FormError 
        errKey="email" 
        errors={ errors } 
        msg="You need to provide a valid email" 
      />
    </XFormInputTxt>
    <XFormInputTxt>
      <label htmlFor="password">password</label>
      <input name="password" id="password" type="password" ref={register({ required: true })} />
      <FormError 
        errKey="password" 
        errors={ errors } 
        msg="This field is required" 
      />
    </XFormInputTxt>
    <XFormInputSubmit size="small">
      <input type="submit" value="login" />
    </XFormInputSubmit>
  </form>
}