import React, { useContext, useEffect, useState } from 'react'
import Firebase from '../firebase/config'
import {Container, Card, Row, Button, Col, Form} from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa'
import Header from '../Components/header'
import { AuthContext } from '../auth'
import { Fragment } from 'react'

const AllCourses = () => {

    const [allCourses, setAllCourses] = useState([])
    const {currentUser} = useContext(AuthContext)
    const [search, setSearch] = useState()
    const [data, setData] = useState()

    const db = Firebase.firestore().collection('courses')
    const now = new Date()

    const getCourses = () => {
        db
        .onSnapshot((snapshot => {
            setAllCourses(snapshot.docs.map((doc) => doc.data()))
        }))
        console.log(allCourses.length)
    }

    useEffect(() => {
        getCourses()
    }, [])

    const enroll = async (id) => {
        console.log(id)
        await db.where('course_id', '==', id).onSnapshot(snapshot => (setData(snapshot.docs.map(doc => (doc.data())))))
        console.log(data)

        const enrolled_courses = [{
            id:id,
            name:"",
            enrolled_on:now.toDateString(),
            enrolled_on_timestamp:new Date(),
            completed_on:"",
            completed_on_timestamp:"",
            completion_status:"incomplete",
            completion_percentage:0,
        }]
        Firebase.firestore().collection('users').doc(currentUser.email).set({
            enrolled_courses:enrolled_courses}, {merge:true}    
        )
        .then(console.log('success'))
        .catch(error => {
            console.log(error.message)
        })
    }

    return (
        <Fragment>
        <Header/>
        <Container>
        <Row>
            <div className='mt-2 ml-3 d-flex justify-content-start'>
                <h1>All Courses</h1>
            </div>
            <div className='ml-auto mr-4 d-flex justify-content-end'>
                <Form.Group className='mt-3'>
                    <Form.Control type='text' value={search} placeholder='search courses' onChange={(e) => setSearch(e.target.value)}/>    
                </Form.Group>
                <Button size='sm' className='mt-3 mb-3'><FaSearch size='1.5rem'/></Button>
            </div>
        </Row>
        <Row>
          {allCourses.map(courses => (<Col lg={4} md={4} sm={6} xs={12}>
            <Card key={courses.id} className='mr-2 mt-2' style={{backgroundColor:'00121F'}}>
                <Card.Header>
                    <Card.Title>{courses.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{courses.desc.substring(0, 50)}</Card.Text>
                    <Card.Text><strong>Lecturer:</strong> {courses.author_name}</Card.Text>
                    <Card.Text><strong>created on:</strong> {courses.created_on.substring(0, 15)}</Card.Text>
                    <Card.Text>{courses.duration}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button style={{backgroundColor:'#00121F'}} className='mr-2' onClick={() => enroll(courses.course_id)}>enroll course</Button>
                    <Button style={{backgroundColor:'#00121F'}} className='mr-2' onClick={() => enroll(courses.course_id)}>view Course</Button>
                </Card.Footer>
            </Card></Col>))}
        </Row>
        </Container>  
        </Fragment>
    )
}

export default AllCourses
