import React from 'react'
import { useForm } from "react-hook-form"

import { register as apiRegister } from 'lib/api/userAPi'
import { reEmail } from 'lib/util/regex' 

import { useXcelContext } from 'data/provider'
import { notifySuccess, notifyError } from 'data/shortcuts'

import { FormError } from 'components/widget/formError'

import { XFormInputTxt, XFormInputSubmit, XSection } from 'styles/styled'

interface Inputs {
  email: string,
  password: string,
}


export const UserRegistration = () => {
  
  const { update } = useXcelContext()

  const { 
    register, 
    handleSubmit, 
    errors 
  } = useForm<Inputs>()

  const onRegister = async (data : Inputs) => {

    try {
      await apiRegister(data)
            
      notifySuccess(update, 'your registration was successful, you can now login')
    } catch (err) {

      notifyError(update, 'sorry, your registration was unsuccessful')
    }
  }

  return <form onSubmit={handleSubmit(onRegister)}>
      <XFormInputTxt>
        <label htmlFor="email" className="txt-small">email</label>
        <input type="text" id="email" name="email" ref={register({ pattern: reEmail })} />
        <FormError 
          errKey="email" 
          errors={ errors } 
          msg="You need to provide a valid email" 
        />
      </XFormInputTxt>
      <XFormInputTxt>
        <label htmlFor="password" className="txt-small">password</label>
        <input type="password" name="password" id="password" ref={register({ required: true })} />
        <FormError 
          errKey="email" 
          errors={ errors } 
          msg="This field is required" 
        />
      </XFormInputTxt>
      <XFormInputSubmit size="small">
        <input type="submit" value="register" />
      </XFormInputSubmit>
    </form>
}