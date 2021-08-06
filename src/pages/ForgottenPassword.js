import React, { useContext, useState } from 'react'
import { Card, Container, Form, Button, Alert } from 'react-bootstrap'
import Header from '../Components/header'
import Firebase from '../firebase/config'
import {AuthContext} from '../auth'

const ForgottenPassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const {newError} = useContext(AuthContext)
    const [isSuccess, setIsSuccess] = useState('')

    const recover = (e) => {
        e.preventDefault()
        if(email !== ''){
            setError('')
            setIsSuccess('')
            Firebase.auth().sendPasswordResetEmail(email)
            .then((res) => {
                setIsSuccess('password reset link sent successfully')
            })
            .catch((error) => {
                newError(error.message, email)
                setError('The Email provided does not exist!')})
        }
        else{
            setError('Please Enter your Email Address!')
        }

    }

    return (
        <>
            <Header />
            <Container>
                <Card className='shadow-sm mr-auto ml-auto mt-5' style={{width:'400px'}}>
                    <Card.Body>
                        <h3 className='mt-3 text-center'>Forgot Password?</h3>
                        <Form>
                            <p className='text-center fs mt-3'>A recovery link will be sent to the email provided</p>
                            {error && <Alert variant='danger' className='text-center' size='sm'>{error}</Alert>}
                            {isSuccess && <Alert variant='success' className='text-center' size='sm'>{isSuccess}</Alert>}
                            <Form.Group className='mt-2'>
                                <Form.Control value={email} autoFocus={true} placeholder='E-mail Address' onChange={(e) => {setEmail(e.target.value); setError('')}}/>
                            </Form.Group>
                            <Button variant='primary' onClick={recover} block>Reset Password</Button>
                        </Form>
                    </Card.Body>
                    {isSuccess && <p className='text-center'>Check your email to reset your password then,<br/><a href='/Login' className='text-center mb-2'>Proceed to Login</a></p>}
                </Card>
            </Container>
        </>
    )
}

export default ForgottenPassword
