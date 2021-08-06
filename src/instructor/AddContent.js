import React, {useState, useEffect, useContext} from 'react'
import {Container, Row, Col, Card, Button, ButtonGroup, Alert, Form, Badge } from 'react-bootstrap'
import {FaBookOpen, FaBriefcase, FaChartPie, FaFolder, FaPlus} from 'react-icons/fa'
import Header from  '../Components/header'
import Firebase from '../firebase/config'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../auth'

const AddContent = (route) => {
    const history = useHistory()
    const id = route.match.params.id
    const {currentUser} = useContext(AuthContext)
    const db = Firebase.firestore().collection('courses')
    const [message, setMessage] = useState("Congratulations! The course was created Successfully.")
    const [course, setCourse] = useState({})
    const [module, setModule] = useState("")
    const [topic, setTopic] = useState("")
    const [content, setContent] = useState("")
    const [modules, setModules] = useState([])
    const [image, setImage] = useState()
    const [video, setVideo] = useState()

    useEffect(() => {
      const interval = setInterval(() => {
        setMessage("");
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    const contentData = {
      created_on:new Date().toString(),
      author_id:currentUser.uid,
      course_id:id,
      module:module,
      theme:topic,
      content:content
    }

    const getCourseDetails = (id) => {
      console.log(id)
      db
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data()
        setCourse(data)
        console.log(course)
      })
      .catch((error) => {
        console.log('error fetching documents', error.message)
      })
    }
    
    useEffect(() => {
      getCourseDetails(id)
    }, [])

    const addUser = (id) => {
      history.push('/AddUser/' + id)
    }
 
    const setQuiz = () => {
      console.log(course)
    }

    const addContent = async () => {
      const data = Firebase.firestore().collection('content').doc(id).collection('course-content')
      console.log(contentData)
      await data.add(contentData)
      .then(doc => {
        console.log("content successfully added!")
        setModule("")
        setTopic("")
        setContent("")
      })      
    }

    const viewContent = async () => {
      await Firebase.firestore().collection('content').doc(id).collection('course-content').get()
      .then(res => {
        setModules(res.docs.map(doc => doc.data()))
      })
    }

    useEffect(() => {
      viewContent()
    }, [])

    return (
        <>
          <Header/>
          <Container>
            <Row>
              <div className='mt-2 ml-3 d-flex justify-content-start'>
                  <h1>Add Content</h1>
              </div>
              <div className='ml-auto mr-4 d-flex justify-content-end'>
                <ButtonGroup className='mt-3 mb-3'>
                  <Button size='md' onClick={() => {addUser(id)}}>Add Users</Button>
                  <Button size='md' onClick={() => {history.push('/')}}>Add Video</Button>
                  <Button size='md' onClick={() => {history.push()}}>Add Image</Button>
                </ButtonGroup>
              </div>
            </Row>
            <Row>
            <Col>
                <Card className="mt-3">
                    <Card.Header style={{backgroundColor:"#00121F", color:"#FFF"}}>{course.title}</Card.Header>
                    <Card.Body>
                      {message !== "" && <Alert variant="success" className='text-center'>{message}</Alert>}
                      <Form>
                        <Form.Group>
                          <Form.Label>Module</Form.Label>
                          <Form.Control type="text" value={module} placeholder="Module-1" onChange={e => setModule(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Theme/Topic</Form.Label>
                          <Form.Control type="text" value={topic} placeholder="Topic" onChange={e => setTopic(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Content</Form.Label>
                          <Form.Control as="textarea" value={content} placeholder="Content of module" rows={7} onChange={e => setContent(e.target.value)} />
                        </Form.Group>
                        <Button variant='success' onClick={addContent}>Add Content</Button>
                      </Form>
                    </Card.Body>
                </Card>
              </Col>
             <Col xs={12} sm={12} md={4} lg={3}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Card className='mt-3 p-3'>
                      <Card.Body>
                        <p><a href='/'><FaBriefcase style={{marginRight: '10px'}} />modules <Badge pill variant='primary'>{modules.length}</Badge></a></p>
                        <p><a href='/'><FaBriefcase style={{marginRight: '10px'}} />Assignments</a></p>
                        <p><a href='/'><FaFolder style={{marginRight: '10px'}} /> Files</a></p>
                        <p><a href='/'><FaBookOpen style={{marginRight: '10px'}} /> Quiz</a></p>
                        <p><a href='/'><FaChartPie style={{marginRight: '10px'}} /> Report</a></p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Card className='mt-3 p-3'>
                      <Card.Title className='text-center'>Assignments</Card.Title>
                      <Card.Body className='text-center'>would you like to create an assignment for your students?</Card.Body>
                      <Button variant='success'>Set Assignments</Button>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Card className='mt-3 p-3'>
                      <Card.Title className='text-center'>Quiz</Card.Title>
                      <Card.Body className='text-center'>would you like to create a quiz for your students?</Card.Body>
                      <Button variant='primary' onClick={setQuiz}>Set Quiz</Button>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
    )
}

export default AddContent
