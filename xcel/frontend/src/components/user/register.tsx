import React from 'react'
import { useForm } from "react-hook-form"

import { register as apiRegister } from '../../lib/api/userAPi'
import { reEmail } from '../../lib/util/regex' 

import { FormError } from '../../components/widget/formError'

import { XFormInputTxt, XFormInputSubmit, XSection } from '../../styles/styled'

interface Inputs {
  email: string,
  password: string,
}


export const UserRegistration = () => {
  
  const { 
    register, 
    handleSubmit, 
    errors 
  } = useForm<Inputs>()

  const onRegister = async (data : Inputs) => {

    try {

      await apiRegister(data)
    } catch (err) {
      
    }
  }

  return <form onSubmit={handleSubmit(onRegister)}>
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
      <XFormInputSubmit size="small">
        <input type="submit" value="register" />
      </XFormInputSubmit>
    </form>
}