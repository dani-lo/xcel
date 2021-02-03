import React from 'react'

interface Props {
  errors: any;
  errKey: string; 
  msg: string
}

export const FormError = (props : Props) => {

  const { errors, errKey, msg } = props 

  return errors[errKey] ? <span>{ msg }</span> : null
}
