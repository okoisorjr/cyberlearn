import React, {Fragment, useState, useEffect, useContext} from 'react'
import { Container, Row, Col, Card, ButtonGroup, Button, Form } from 'react-bootstrap'
import Firebase from '../firebase/config'
import { useHistory } from 'react-router'
import AdminHeader from '../admin/AdminHeader'
import { AuthContext } from '../auth'

const Admin = () => {

    const history = useHistory()
    const {currentUser, user} = useContext(AuthContext)
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState([])
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [students, setStudents] = useState([])
    const [lecturers, setLecturers] = useState([])
    const [verifiedUsers, setVerifiedUsers] = useState([])
    const [unverifiedUsers, setUnverifiedUsers] = useState([])
    const errors = Firebase.firestore().collection('errors')
    const allUsers = Firebase.firestore().collection('users')
    const allBlogs = Firebase.firestore().collection('blogs')
    const allCourses = Firebase.firestore().collection('courses')
    const verified = Firebase.firestore().collection('users')

    const style= {
        width:'100%',
        height:'120px', 
        borderLeftColor:'#00121F', 
        borderLeftWidth:'5px',
        cursor:'pointer',
    }

    const getAllBlogs = () => {
        allBlogs.onSnapshot(snapshot => {
            setBlogs(snapshot.docs.map(doc => (doc.data())))
        })

    }

    const getAllUsers = () => {
        allUsers.onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => (doc.data())))
        })
    }

    const getErrors = () => {
        errors.onSnapshot(snapshot => {
            setError(snapshot.docs.map(doc => (doc.data())))
        })
    }

    const getAllStudents = () => {
        allUsers.where("role", "==", "student").onSnapshot(snapshot => {
            setStudents(snapshot.docs.map(doc => (doc.data())))
        })
    }

    const getAllLecturers = () => {
        allUsers.where("role", "==", "lecturer").onSnapshot(snapshot => {
            setLecturers(snapshot.docs.map(doc => (doc.data())))
        })
    }

    const getAllCourses = () => {
        allCourses.onSnapshot(snapshot => {
            setCourses(snapshot.docs.map(doc => (doc.data())))
        })
    }

    const getVerifiedUsers = () => {
        verified.where("email.verified", "==", true).onSnapshot(snapshot => {
            setVerifiedUsers(snapshot.docs.map(doc => (doc.data())))
        })
    }

    const getUnverifiedUsers = () => {
        verified.where("email.verified", "==", false).onSnapshot(snapshot => {
            setUnverifiedUsers(snapshot.docs.map(doc => (doc.data())))
        })
    }

    useEffect(() => {
        getAllBlogs()
        getErrors()
        getAllUsers()
        getAllStudents()
        getAllLecturers()
        getAllCourses()
        getVerifiedUsers()
        getUnverifiedUsers()
    }, [])

    return (
        <Fragment>
            <AdminHeader/>
            <Container>
            <h1 className='mt-2'>Admin Dashboard</h1>
            <Row className='mt-3'>
                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card style={{borderLeftWidth:'5px', borderLeftColor:'red', color:'red'}} className='hover'>
                        <Card.Body>
                            <Card.Title className='text-center'>Errors</Card.Title>
                            <h3 className='text-center'>{error.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card style={{borderLeftWidth:'5px', borderLeftColor:'blue', color:'blue'}} className='hover'>
                        <Card.Body>
                            <Card.Title className='text-center'>Blogs</Card.Title>
                            <h3 className='text-center'>{blogs.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card className='hover' style={style}>
                        <Card.Body style={{borderLeftWidth:'5px', borderLeftColor:'purple', color:'purple'}} className='hover'>
                            <Card.Title className='text-center'>Users</Card.Title>
                            <h3 className='text-center'>{users.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card className='hover' style={style}>
                        <Card.Body style={{borderLeftWidth:'5px', borderLeftColor:'green', color:'green'}} className='hover'>
                            <Card.Title className='text-center'>Students</Card.Title>
                            <h3 className='text-center'>{students.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            
                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card style={{borderLeftWidth:'5px', borderLeftColor:'orange', color:'orange'}} className='hover'>
                        <Card.Body>
                            <Card.Title className='text-center'>Lecturers</Card.Title>
                            <h3 className='text-center'>{lecturers.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className='mt-1' md={4} lg={3}>
                    <Card className='hover' style={style}>
                        <Card.Body>
                            <Card.Title className='text-center'><h4>Courses</h4></Card.Title>
                            <h2 className='text-center'>{courses.length}</h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card style={{borderLeftWidth:'5px', borderLeftColor:'orange', color:'orange'}} className='hover'>
                        <Card.Body>
                            <Card.Title className='text-center'>Verified Accounts</Card.Title>
                            <h3 className='text-center'>{verifiedUsers.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className='mt-1' sm={3} md={4} lg={3}>
                    <Card style={{borderLeftWidth:'5px', borderLeftColor:'orange', color:'orange'}} className='hover'>
                        <Card.Body>
                            <Card.Title className='text-center'>Unverified Accounts</Card.Title>
                            <h3 className='text-center'>{unverifiedUsers.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Header style={{backgroundColor:'#011c1f', fontWeight:'bold', fontSize:'24px', color:'#FFF'}}>Admin Profile</Card.Header>
                        <Card.Title></Card.Title>
                    </Card>
                </Col>
            </Row>
            </Container>
        </Fragment>
    )
}

export default Admin
