import { Button, Container, Card, Form, Alert } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import {AuthContext} from '../auth'
import Header from '../Components/header'

const ChangePassword = () => {

    const {currentUser, user} = useContext(AuthContext)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const changePassword = (e) => {
        e.preventDefault()
        setError("")
        if(oldPassword === user.password){
            currentUser.updatePassword(newPassword)
            .then(() => {
                setSuccess('password has been changed successfully!')
                console.log("Password updated!");
            })
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
            })
        }else{
            setError("The Former password is incorrect!")
        }
        
    }
 
    return (
        <>
            <Header />
            <Container>
                <Card className='shadow-sm mr-auto ml-auto mt-5' style={{width:'400px'}}>
                    <Card.Body>
                        <h3 className='mt-3 text-center'>Change my passsword!</h3>
                        <Form>
                            <p className='text-center fs mt-3'>Please you are required to enter the current password, before changing to a new one.</p>
                            {error && <Alert variant='danger' className='text-center' size='sm'>{error}</Alert>}
                            {success && <Alert variant='success' className='text-center' size='sm'>{success}</Alert>}
                            <Form.Group className='mt-2'>
                                <Form.Control type='password' value={oldPassword} autoFocus={true} placeholder='Enter Current password' onChange={(e) => {setOldPassword(e.target.value); setError('')}}/>
                            </Form.Group>
                            <Form.Group className='mt-2'>
                                <Form.Control type='password' value={newPassword} autoFocus={true} placeholder='Enter New password' onChange={(e) => {setNewPassword(e.target.value); setError('')}}/>
                            </Form.Group>
                            <Form.Group className='mt-2'>
                                <Form.Control type='password' value={confirm} autoFocus={true} placeholder='Confirm New password' onChange={(e) => {setConfirm(e.target.value); setError('')}}/>
                            </Form.Group>
                            <Button variant='success' onClick={changePassword} block>Change Password</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ChangePassword
