import React, {Fragment, useState, useContext} from 'react'
import {Container, Row, Card, Button, Form, Alert} from 'react-bootstrap'
import Firebase from '../firebase/config'
import Header from '../Components/header'
import { useHistory } from 'react-router'
import {persistence} from '../firebase/config'
import { AuthContext } from '../auth'
import AdminHeader from './AdminHeader'

const AdminLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()
    const {user} = useContext(AuthContext)

    const Login = async () => {
        const user = await Firebase.firestore().collection('users').where("email", "==", email).where("role", "==", "admin").get()
        if(!user.empty){
            Firebase.auth().setPersistence(persistence)
            .then(
                Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    history.push('/Admin')
                })
                .catch(error => {console.log(error.message)})
            )
        }else{
            setError("Sorry, You are not an admin!")
        }
    }

    return (
        <Fragment>
            {user.role === 'admin' ? <AdminHeader/> : <Header/>}
            <Container>
                <Row>
                    <Card className='d-flex p-2 mx-auto mt-4' style={{width:'360px'}}>
                        <Card.Title className='text-center mt-2'><h2>This is strictly for admin users only!</h2></Card.Title>
                    <Form>
                        {error && <Alert variant='danger' className='text-center'>{error}</Alert>}
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type='text' name='email' placeholder='admin@email.com' onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button onClick={Login}>Login</Button>
                    </Form>
                    </Card>
                </Row>
            </Container>
        </Fragment>
    )
}

export default AdminLogin
