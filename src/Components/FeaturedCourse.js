import React, { useState, useEffect, useContext} from 'react'
import Firebase from '../firebase/config'
import { Card, Col, Button } from 'react-bootstrap'
import { AuthContext } from '../auth'
import { useHistory } from 'react-router'

const FeaturedCourse = (props) => {

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const {currentUser} = useContext(AuthContext)
    const history = useHistory()

    const now = new Date()

    const db = Firebase.firestore().collection('courses')
    const fetch = async () => {
        await db.orderBy('title').limit(8).onSnapshot(snapshot => {
            setCourses(snapshot.docs.map(doc => (doc.data())))
        })
        setIsLoading(false)
    }

    const enroll = (e) => {
        e.preventDefault()
        if(currentUser === null){
            history.push('/Login')
        }
        else if(currentUser !== null){
            Firebase.firestore().collection('users').doc(currentUser.email).update({
                enrolled_courses:[
                    {id:courses.course_id,
                     name:courses.title,
                     enrolled_on:now.toDateString(),
                     enrolled_on_timestamp:Date.now(),
                     completed_on:"",
                     completed_on_timestamp:"",
                     completion_status:"incomplete",
                     completion_percentage:"0",
                    }
                ]
            }).then(console.log('success'))
            .catch(error => {
                console.log(error.message)
            })
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            {isLoading ? 
            <p className='text-center lead'>Loading courses.....</p> 
            : 
            courses.map(course => (
            <Col xs={12} sm={6} md={6} lg={3} key={course.course_id}><div>
                <Card className='shadow-sm mt-2 mb-2 d-flex'>
                    <Card.Title className='text-center mt-3'><h4>{course.title}</h4></Card.Title>
                    <Card.Body>
                        <Card.Text>{course.desc.substring(0, 80) + '.....'}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant='success' className='mr-2' onClick={enroll}>Enroll</Button>
                        <Button style={{backgroundColor:'#00121F'}} >Read More</Button>
                    </Card.Footer>
                </Card></div>
            </Col>))}
        </>
    )
}

export default FeaturedCourse;

