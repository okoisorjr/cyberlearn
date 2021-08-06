import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

export const TextInput = ({title, placeholder, type}) => {

    const [value, setValue] = useState();

    return(
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>{title}</Form.Label> 
                    <Form.Control type={type} placeholder={placeholder} />
                </Form.Group>
            </Form>
        </div>
    )
}

export default TextInput;