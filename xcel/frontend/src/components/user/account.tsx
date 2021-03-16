import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import { FormError } from 'components/widget/formError'

import { useXcelContext } from 'data/provider'
import { REDUCER_ACTIONS } from 'data/reducer'

import { Account, AccountProps } from 'lib/collections/account'
import { addAccount, editAccount } from 'lib/api/userAPi'

import { XFormInputTxt, XFormInputSubmit, XSection, XButton, XViewAccount } from '../../styles/styled'


enum ACCOUNT_MODE {
  EDIT,
  VIEW
}

const StyledEditAccount = styled.form`
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 35%;
    border-bottom: 1px dotted var(--border);
    padding: 1rem 0;
    margin: 0;

    &.form-subitter {
      width: 100%;
      border: none;
    }

    span {
      font-size: var(--font-small);
      display: block;
      color: var(--warning);
    }
  }
`

export const UserAccount = () => {
  
  const { appstate, update } = useXcelContext()

  const [mode, setMode] = useState(ACCOUNT_MODE.VIEW)

  const userData = appstate.user

  const { 
    register, 
    handleSubmit, 
    errors 
  } = useForm<Account>({
    defaultValues: { 
      firstname: userData?.account?.firstname || '',
      lastname: userData?.account?.lastname || '',
      address_line_1: userData?.account?.address_line_1 || '',
      address_line_2: userData?.account?.address_line_2 || '',
      postcode: userData?.account?.postcode || '',
      city: userData?.account?.city || '',
    }
  })

  const onEditAccount = (data: AccountProps) => {

    if (userData?.account?.id) {
      const account = new Account(data)

      editAccount(account, userData.account.id)
    }
  }

  const onCreateAccount = async (data: AccountProps) => {
    
    try {
      const newAccountData : { data: { id: number } } = await addAccount(data)
      
      const newAccount = new Account({
        id : newAccountData.data.id,
        ...data
      })

      update({
        type: REDUCER_ACTIONS.ADD_ACCOUNT,
        payload: {
          account: newAccount
        }
      })
    } catch (err) {

    }
    
  }


  const accountForm = <>
    <XFormInputTxt>
      <label htmlFor="firstname">first name</label>
      <input type="text" id="firstname" name="firstname" ref={register({ required: true })} />
      <FormError 
        errKey="firstname" 
        errors={ errors } 
        msg="This field is required" 
      />
    </XFormInputTxt>
    <XFormInputTxt>
      <label htmlFor="lastname">last name</label>
      <input type="text" name="lastname" id="lastname" ref={register({ required: true })} />
      <FormError 
        errKey="lastname" 
        errors={ errors } 
        msg="This field is required" 
      />
    </XFormInputTxt>
    <XFormInputTxt>
      <label htmlFor="address_line_1">address line 1</label>
      <input type="text" name="address_line_1" id="address_line_1" ref={register({ required: true })} />
      <FormError 
        errKey="address_line_1" 
        errors={ errors } 
        msg="This field is required" 
      />
    </XFormInputTxt>
    <XFormInputTxt>
      <label htmlFor="address_line_2">address line 2</label>
      <input type="text" name="address_line_2" id="address_line_2" ref={register({ required: true })} />
    </XFormInputTxt>
    <XFormInputTxt>
      <label htmlFor="postcode">postcode</label>
      <input type="text" name="postcode" id="postcode" ref={register({ required: true })} />
      <FormError 
        errKey="postcode" 
        errors={ errors } 
        msg="This field is required" 
      />
    </XFormInputTxt>
    <XFormInputTxt>
      <label htmlFor="city">city</label>
      <input type="text" name="city" id="city" ref={register({ required: true })} />
      <FormError 
        errKey="city" 
        errors={ errors } 
        msg="This field is required" 
      />
    </XFormInputTxt>
  </>

  if (mode === ACCOUNT_MODE.VIEW && userData?.account) {
    return <>
      <XViewAccount>
        <li className="padding-half-top padding-half-bottom"><span>first name</span>{ userData.account.firstname }</li>
        <li className="padding-half-top padding-half-bottom"><span>last name</span>{ userData.account.lastname }</li>
        <li className="padding-half-top padding-half-bottom"><span>address line 1</span>{ userData.account.address_line_1 }</li>
        <li className="padding-half-top padding-half-bottom"><span>address line 2</span>{ userData.account.address_line_2 }</li>
        <li className="padding-half-top padding-half-bottom"><span>postcode</span>{ userData.account.postcode }</li>
        <li className="padding-half-top padding-half-bottom"><span>city</span>{ userData.account.city }</li>
      </XViewAccount>
      <XButton
        className="margin-top"
        size="small"
        onClick={ () => setMode(ACCOUNT_MODE.EDIT)} 
      >Edit account</XButton>
    </>
  } else if (mode === ACCOUNT_MODE.EDIT && userData?.account) {

    return <StyledEditAccount onSubmit={handleSubmit(onEditAccount)}>
        {
          accountForm
        }
        <div className="form-subitter">
        <XButton onClick={() => setMode(ACCOUNT_MODE.VIEW)} size="small">cancel</XButton>
        <XFormInputSubmit size="small">
          <input type="submit" value="save account data" />
        </XFormInputSubmit>
        </div>
      </StyledEditAccount>
  } else if (!userData?.account) {

    return <StyledEditAccount onSubmit={handleSubmit(onCreateAccount)}>
        {
          accountForm
        }
        <div className="form-subitter">
        <XFormInputSubmit size="small">
          <input type="submit" value="add account data" />
        </XFormInputSubmit>
        </div>
      </StyledEditAccount>
  }

  return <XSection></XSection>
}