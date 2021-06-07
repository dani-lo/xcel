import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import styled from 'styled-components'

import { XSection, XPageTitle, XContentMain } from '../styles/styled'

import { allRemoteOrders } from 'lib/api/ordersApi'

const StyledRemoteOrder = styled.div`
  border: 1px dotted #ddd;
  margin: 1rem 0;
`

interface Params {
  xcelid ?: string;
}

export const LocalOrdersPage = () => {
  
  const params = useParams<Params>() 

  const xcelid = params.xcelid

  const [remoteorders, setRemoteorders] = useState([])


  const fetchOrders = async () => {
    
    if (xcelid && xcelid.length > 1) {
      try {
        const result : any = await allRemoteOrders(xcelid)
        console.log(result)
        if (result && result.data) {
          console.log('HERE')
          setRemoteorders(result.data)
        }  else {
          console.log(99999)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [xcelid])

  console.log(remoteorders)

  const xcelOrders = remoteorders.map((order : any) => {
    return <StyledRemoteOrder>
      <h3 className="txt-medium">ixcel id: { order.xcelid }</h3>
    </StyledRemoteOrder>
  })

  console.log(xcelOrders)

  return <XContentMain>
    <XPageTitle className="cap">All Customer Orders</XPageTitle>
    <XSection style={{ marginTop: '4em'}}>
      { xcelOrders }
    </XSection> 
  </XContentMain> 
  

}