import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Firebase from '../firebase/config'
import {AuthContext} from '../auth'
import { Card, Container, Row, Col, Button, Alert, Form } from 'react-bootstrap'
import {FaTrash, FaEdit, FaSearch} from 'react-icons/fa'
import Header from '../Components/header'

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const {currentUser, user, pushError} = useContext(AuthContext);
    const message = "You are yet to create a course, click the link to "
    const history = useHistory()
    const [search, setSearch] = useState()

    const db = Firebase.firestore().collection('courses')
    const fetch = async () => {
        await db.where('author_id', '==', currentUser.uid).onSnapshot(snapshot => (
            setCourses(snapshot.docs.map((doc) => (doc.data())))
        ))
        console.log(courses.length)
    }

    const deleteCourse = (id) => {
        console.log(id)
        db.doc(id).delete()
        .catch(error => {
            pushError(error.message)
        })
    }

    const editCourse = (id) => {
        history.push('/EditCourse/' + id)
    }

    useEffect(() => {
        fetch()
    }, [])

    const onSearch = async (e) => {
        e.preventDefault()
        
    }

    return (
        <>
            <Header/>
            <Container>
            <Row>
                <div className='mt-2 ml-3 d-flex justify-content-start'>
                    <h1>My Courses</h1>
                </div>
                <div className='ml-auto mr-4 d-flex justify-content-end'>
                    <Form.Group className='mt-3'>
                        <Form.Control type='text' value={search} placeholder='search courses' onChange={(e) => setSearch(e.target.value)}/>    
                    </Form.Group>
                    <Button size='sm' onClick={onSearch} className='mt-3 mb-3'><FaSearch size='1.5rem'/></Button>
                </div>
            </Row>
            
            <Row>
                {courses !== [] ? courses.map((doc, index) => (<Col sm={12} md={6} xs={12} lg={4} key={index}>
                    <Card className='mt-2'>
                        <Card.Header style={{backgroundColor:'#00121F', color:'#eee'}}>
                            <Card.Title>{doc.title}</Card.Title>    
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{doc.desc.substring(0, 100) + "....."}</Card.Text>
                            <Card.Text style={{color:'#00121F', fontWeight:'bold'}}>Lecturer: {user.username}</Card.Text>
                            <Card.Text style={{color:'blue'}}>created on: {doc.created_on.substring(0,15)}</Card.Text>
                            <Card.Text style={{color:'blue'}}>period: {doc.duration}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button size='sm' style={{backgroundColor:'#00121F'}} className='mr-2' onClick={() => editCourse(doc.course_id)}><FaEdit size='2rem' className='icons'/>Edit Course</Button>
                            <Button size='sm' variant='danger' onClick={() => deleteCourse(doc.course_id)}><FaTrash size='2rem' className='icons ml-auto'/>Delete Course</Button>
                        </Card.Footer>
                    </Card>
                </Col>)): <Alert variant='dark text-center mx-auto'>{message}<a href='/AddCourse' style={{color:'#222', fontSize:'18px', fontWeight:'bold'}}>CREATE COURSE</a></Alert>}
            </Row>
            </Container>
        </>
    )
}

export default Courses
