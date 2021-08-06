import React, {useState, useEffect, useContext, Fragment} from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap'
import { AuthContext } from '../auth'
import Firebase from '../firebase/config'

const SecretQuestion = () => {

    const {currentUser, user} = useContext(AuthContext)
    const db = Firebase.firestore().collection('secret-Questions')
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const secret = {
        //uid:currentUser.uid,
        //username:user.username,
        question:question,
        answer:answer
    }

    const submit = async () => {
        await db.doc(user.username).set(secret)
                .then(res => {
                    console.log("update was successful:", res)
                })
                .catch(error => {
                    console.log(error.message)
                })
    }

    const update = async () => {
        await db.doc(user.username).update(secret)
                .then(res => {
                    console.log("updated successfully:", res)
                })
                .catch(error => {
                    console.log(error.message)
                })        
    }

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <Card className='d-flex p-2 mx-auto mt-4' style={{width:'360px'}}> 
                            <Card.Title className='mt-2 mb-2'>
                                <h1>Choose a Secret Question</h1>
                            </Card.Title>
                            <Form className='p-1'> 
                                <Form.Group>
                                    <Form.Control as='select' value={question} onChange={e => setQuestion(e.target.value)} required>
                                        <option selected='' defaultValue>--choose your secret question--</option>
                                        <option value=''>What was the name of your first pet?</option>
                                        <option value='lecturer'>How many siblings do you have?</option>
                                        <option value='lecturer'>What is your mother's maiden name?</option>
                                        <option value='lecturer'>Where were you born?</option>
                                        <option value='lecturer'>what is your favourite color?</option>
                                    </Form.Control>
                                    <Form.Control type ='text' value={answer} placeholder='Enter the answer to your selected question' onChange={e => {setAnswer(e.target.value)}}/>
                                    <Button variant='success' onClick={submit} className='mr-2'>Save</Button>
                                    <Button variant='outline-success' onClick={update}>Change</Button>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default SecretQuestion
