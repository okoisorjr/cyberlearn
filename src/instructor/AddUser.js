import React, {Fragment, useState, useContext, useEffect} from 'react'
import Header from '../Components/header'
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap'
import Firebase from '../firebase/config'
import {FaPlus} from 'react-icons/fa'
import { AuthContext } from '../auth'

const AddUser = (route) => {

    const id = route.match.params.id
    const db = Firebase.firestore().collection('courses')
    const {pushError} = useContext(AuthContext)
    const [course, setCourse] = useState([])
    const [enrolled, setEnrolled] = useState([])
    const [matric, setMatric] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const {currentUser} = useContext(AuthContext)
    const [message, setMessage] = useState("")

    const userData = {
        course_id:id,
        author_id:currentUser.uid,
        matric_no:matric,
        email:email,
        username:username,
        enrolled_on:new Date().toString()
    }

    const getCourse = async (id) => {
        await db.doc(id)
                .get()
                .then((doc) => {
                    if(doc.exists){
                        setCourse(doc.data())
                    }else{
                        setMessage('Document does not exist')
                    }
                })
    }

    useEffect(() => {
        getCourse(id)
    }, [])

    const addUser = async () => {
        const newUser = Firebase.firestore().collection('content').doc(id).collection('students')
        await newUser.add(userData)
                .then(res => {
                    console.log(enrolled)
                    setMessage("The user was added successfully!")
                    console.log(message)
                })
                .catch(error => {
                    console.log(error.message)
                    pushError(error.message)
                })
    }

    return (
        <Fragment>
            <Header/>
            <Container>
                <h1 className='mt-2'>Add User</h1>
                <Row>
                    <Card className='mt-2 w-100' style={{}}>
                        {message && <Alert variant='success'>{message}</Alert>}
                        <Card.Header><Card.Title>{course.title}</Card.Title></Card.Header>
                        <Form className='p-2'>
                            <Form.Group>
                                <Form.Label>Matric Number</Form.Label>
                                <Form.Control type='text' value={matric} placeholder='student matric no' onChange={e => setMatric(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' value={username} placeholder="student's username" onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='text' value={email} placeholder="student's email" onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>
                            <div className='text-right'><Button variant='success' onClick={addUser}>Add Student</Button></div>
                        </Form>
                    </Card>
                </Row>
            </Container>
        </Fragment>
    )
}

export default AddUser
