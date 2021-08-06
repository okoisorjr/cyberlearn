import React, {useState} from 'react'
import Header from '../Components/header'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import Firebase from '../firebase/config'

const Profile = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [image, setImage] = useState('')

    const changeHandler = (e) => {
        setImage(e.target.files[0])
    }

    const upload = async () => {
        if(image === ''){
            return (alert('No image selected!'))
        }else{
            const req = await Firebase.storage().ref(`/images/${image.name}`).put(image)
            req.on('state_changed', console.log('success'), alert)
        }
    }


    return (
        <>
            <Header/>
            <Container>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <Card.Header>
                                <Card.Title className='text-center'>Update Personal Information</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Firstname</Form.Label>
                                        <Form.Control type='text' value={firstname} onChange={e=>{setFirstname(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Lastname</Form.Label>
                                        <Form.Control type='text' value={lastname} onChange={e=>{setLastname(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type='text' value={username} onChange={e=>{setUsername(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='text' value={email} onChange={e=>{setEmail(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>phone</Form.Label>
                                        <Form.Control type='text' value={phone} onChange={e=>{setPhone(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Country of residence</Form.Label>
                                        <Form.Control type='text' value={country} onChange={e=>{setCountry(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>State of Residence</Form.Label>
                                        <Form.Control type='text' value={state} onChange={e=>{setState(e.target.value)}}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control as='select'>
                                            <option>Student</option>
                                            <option>Associate</option>
                                            <option>Professional</option>
                                            <option>others</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.File name='photo' onChange={changeHandler} block/><Button variant='primary' size='sm' onClick={upload}>Upload Image</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile
