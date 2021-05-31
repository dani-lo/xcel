import React from 'react'
import { useForm } from "react-hook-form"

import { register as apiRegister } from 'lib/api/userAPi'
import { reEmail } from 'lib/util/regex' 

import { useXcelContext } from 'data/provider'
import { notifySuccess, notifyError } from 'data/shortcuts'

import { FormError } from 'components/widget/formError'

import { XFormInputTxt, XFormInputSubmit } from 'styles/styled'

import { setLocalUser } from 'lib/util/localUser'

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

  // const onRegister = async (data : Inputs) => {

  //   try {
  //     await apiRegister(data)
            
  //     notifySuccess(update, 'your registration was successful, you can now login')
  //   } catch (err) {

  //     notifyError(update, 'sorry, your registration was unsuccessful')
  //   }
  // }

  const onLocalRegister = async (data : Inputs) => {
    
    // setLocalUser({
    //   id: new Date().getTime(),
    //   email: data.email,
    //   account: null
    // })
    
    notifySuccess(update, 'success')
  }

  return <form onSubmit={handleSubmit(onLocalRegister)}>
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
        <input type="password" name="password" id="password" ref={register({ required: true })} />
        <FormError 
          errKey="email" 
          errors={ errors } 
          msg="This field is required" 
        />
      </XFormInputTxt>
      <XFormInputSubmit size="small" className="margin-top">
        <input type="submit" value="register" />
      </XFormInputSubmit>
    </form>
}