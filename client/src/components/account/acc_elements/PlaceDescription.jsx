import React from 'react'
import { useParams } from 'react-router-dom'
function PlaceDescription() {
    const {userid}=useParams()
  return (
    <div>{userid}</div>
  )
}

export default PlaceDescription