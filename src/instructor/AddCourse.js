import React, { useState, useContext } from 'react'
import {Container, Row, Col, Form, Card, Button, Alert } from 'react-bootstrap'
import Header from '../Components/header'
import { AuthContext } from '../auth'
import Firebase from '../firebase/config'
import {useHistory} from 'react-router-dom'
import {v4} from 'uuid'

export const AddCourse = (props) => {  

    const history = useHistory()  
    const {currentUser, user} = useContext(AuthContext)
    const [error, setError] = useState("")
    const [data, setData] = useState({
      created_on:new Date().toString(),
      last_modified:'',
      author_id:currentUser.uid,
      course_id:v4(),
      author_email:currentUser.email,  
      author_name:user.username,    
      title:'',
      desc:'',
      duration:'',
      capacity:'',
      code:'',
    })

    const handleChange = (userKey, value) => {
      setData({...data, [userKey]: value})
    }

    const uploadCourse = async () => {
      setError('')
        await Firebase.firestore().collection('courses').doc(data.course_id).set(data)
        .then(console.log('course created successfully'))
        .catch((error) => {
          setError(error.message)
          console.log(error.message)
        })
        history.push('/AddContent/' + data.course_id)
      }

    return (
          <>
            <Header />
              <Container>
              <Row>
              <Col xs={12} sm={12} md={8} lg={12}>
                <Row>
                  <Col>
                    <Card className='mt-3 p-3' style={{backgroundColor:'purple', color:'#fff'}}>
                      <Card.Title><h2 className='text-center'>Create Course</h2></Card.Title>
                      <p>To create a course follow the steps</p>
                    </Card>
                  </Col>
                </Row>
                <Row>
                 <Col>
                    <Card className='mt-3 p-3'>
                      <Card.Title className='text-center'>Course Details</Card.Title>
                      <Form>
                        {error && <Alert color="info" className='text-center'>{error}</Alert>}
                        <Form.Group>
                          <Form.Label className='lead ml-2'>Course Title</Form.Label>
                          <Form.Control type='text' value={data.title} autoFocus={true} onChange={e => handleChange('title', e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className='lead ml-2'>Course Description</Form.Label>
                          <Form.Control as='textarea' value={data.desc} maxLength={500} rows={3} onChange={e => handleChange('desc', e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className='lead ml-2'>Duration of Course</Form.Label>
                            <Form.Control as='select' value={data.duration} onChange={e => handleChange('duration', e.target.value)} required>
                              <option value=''>--select-one</option>
                              <option value='1 week'>1 week</option>
                              <option value='2 weeks'>2 weeks</option>
                              <option value='3 weeks'>3 weeks</option>
                              <option value='1 month'>1 month</option>
                              <option value='2 months'>2 months</option>
                              <option value='3 months'>3 months</option>
                              <option value='4 months'>4 months</option>
                              <option value='5 months'>5 months</option>
                              <option value='6 months'>6 months</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='lead ml-2'>Course code</Form.Label>
                            <Form.Control type='text' value={data.code} placeholder='e.g css111' onChange={e => handleChange('code', e.target.value)}/>
                          </Form.Group>
                        <Form.Group>
                            <Form.Label className='lead ml-2'>capacity(optional)</Form.Label>
                            <Form.Control type='text' value={data.capacity} placeholder='max no of students' onChange={e => handleChange('capacity', e.target.value)}/>
                          </Form.Group>
                      </Form>
                    </Card>
                  </Col>
                </Row>
               
                <Button onClick={uploadCourse} variant='success' className='mt-2 mb-2'>Create Course</Button>
              </Col>
             
              </Row>
            </Container>
          </> 
    )
}

export default AddCourse
