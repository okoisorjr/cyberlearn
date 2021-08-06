import React from 'react'
import {  Button } from 'react-bootstrap'


export const ButtonComponent = ({buttonSize, buttonVariant,buttonAction,buttonName}) => {

    return(
        <Button className='btnlab' size={buttonSize} variant={buttonVariant} onClick={buttonAction}>{buttonName}</Button>
)

    
}

export default ButtonComponent;