import React, { useEffect, useState } from 'react'
import Firebase from '../firebase/config'
import { Button, Container, Form, Card, Row, Col } from 'react-bootstrap'
import Header from '../Components/header'
import { useHistory } from 'react-router'

const EditCourse = (route) => {
    const id = route.match.params.id
    const [course, setCourse] = useState({
      id:id, 
      last_modified:new Date().toString(),
      title:'',
      desc:'',
      duration:'',
      capacity:'',
      code:''
    })

    const db = Firebase.firestore().collection('courses')
    const history = useHistory()

    const handleChange = (userKey, value) => {
      setCourse({...course, [userKey]: value})
    }

    const getCourseList = (id) => {
      console.log(id)
      db
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data()
        setCourse(data)
      })
      .catch((error) => {
        console.log('error fetching documents', error.message)
      })
    }
    
    useEffect(() => {
      getCourseList(id)
    }, [])

    const update = async (e) => {
      e.preventDefault()
      console.log(course)
      db
      .doc(id)
      .update(course)
      .then(()=>{
        setCourse({
          last_modified:new Date(),
          title:'',
          desc:'',
          duration:'',
          code:'',
          capacity:''
        })
      })
      .catch(error => {
        console.log(error.message)
      })
      history.push('/Courses')
    }

    const viewContent = async () => {
      let data = []
      await Firebase.firestore().collection('content').doc(id).collection('course-content').get()
      .then(res => {
        data = res.docs.map(doc => doc.data())
      })
      console.log(data)
    }

    const addContent = () => {
      history.push('/AddContent/' + id)
    }

    return (
        <>
          <Header />
              <Container>
              <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Row>
                  <Col>
                    <Card className='mt-3 p-3' style={{backgroundColor:'purple', color:'#fff'}}>
                      <Card.Title><h2 className='text-center'>Edit {course.title}</h2></Card.Title>
                    </Card>
                  </Col>
                </Row>
                <Row>
                 <Col>
                    <Card className='mt-3 p-3'>
                      <Card.Title className='text-center'>Course Details</Card.Title>
                      <Form>
                        <Form.Group>
                          <Form.Label className='lead ml-2'>Course Title</Form.Label>
                          <Form.Control type='text' value={course.title} autoFocus={true} onChange={(e) => handleChange('title', e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className='lead ml-2'>Course Description</Form.Label>
                          <Form.Control as='textarea' value={course.desc} rows={3} onChange={(e) => handleChange('desc', e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className='lead ml-2'>Duration of Course</Form.Label>
                            <Form.Control as='select' value={course.duration} onChange={(e) => handleChange('duration', e.target.value)} required>
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
                            <Form.Label>Course code</Form.Label>
                            <Form.Control type='text' value={course.code} onChange={(e) => handleChange('code', e.target.value)}/>
                          </Form.Group>
                        <Form.Group>
                            <Form.Label>capacity</Form.Label>
                            <Form.Control type='text' value={course.capacity} onChange={(e) => handleChange('capacity', e.target.value)}/>
                          </Form.Group>
                      </Form>
                    </Card>
                  </Col>
                </Row>
               
                <Button onClick={update} variant='success' className='mt-2 mb-2 mr-2'>Save</Button>
                <Button onClick={(e) => {history.push('/Courses')}} variant='primary' className='mt-2 mb-2 mr-2'>Go Back</Button>
                <Button onClick={viewContent} variant='outline-success' className='mt-2 mb-2 mr-2'>View Content</Button>
                <Button onClick={addContent} variant='outline-info' className='mt-2 mb-2 mr-2'>Add Content</Button>
              </Col>
             
              </Row>
            </Container>  
        </>
    )
}

export default EditCourse
