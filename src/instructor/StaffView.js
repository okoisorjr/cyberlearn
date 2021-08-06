import React, {useState, useEffect, useContext} from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { FaBlog, FaBook, FaEnvelope, FaLaptop, FaLayerGroup, FaSave, FaUserCircle } from 'react-icons/fa'
import CardComponent from '../Components/cardComponent'
import ButtonComponent from '../Components/buttonComponent'
import Firebase from '../firebase/config'
import {AuthContext} from '../auth'

const StaffView = () => {    

    const [courses, setCourses] = useState([])
    const [blogs, setBlogs] = useState([])
    const {currentUser} = useContext(AuthContext)

    const db = Firebase.firestore().collection('courses')
    const ref = Firebase.firestore().collection('blogs')

    const fetch = async () => {
        await db.where('author_id', '==', currentUser.uid).onSnapshot(snapshot => (
            setCourses(snapshot.docs.map(doc => doc.data()))
        )) 
    }

    const retrieve = async () => {
        await ref.where('author_id', '==', currentUser.uid).onSnapshot(snapshot => (
            setBlogs(snapshot.docs.map(doc => doc.data()))
        ))
    }

    useEffect(() => {
        fetch()
        retrieve()
    }, [])

    return (  
        <>
            <Container>
                <Row>
                
                    <CardComponent xsV={12} smV={12} mdV={3} lgV={3} showHeading={courses.length} showTitle="Courses Created"/>
                    <CardComponent xsV={12} smV={12} mdV={3} lgV={3} showHeading={0} showTitle="Labs Created"/>
                    <CardComponent xsV={12} smV={12} mdV={3} lgV={3} showHeading={105} showTitle="Total Students"/>
                    <CardComponent xsV={12} smV={12} mdV={3} lgV={3} showHeading={blogs.length} showTitle="Blog Posts"/>
                </Row>
                
                <Row>
                    <Col lg={12}>
                    <Card style={{width:'100%'}} className='d-flex shadow-sm mt-3'>
                        <Card.Header className='' style={{backgroundColor: '#00121F'}}><Card.Title><Link to='/Dashboard' style={{ color:'#fff'}}>Dashboard</Link></Card.Title></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={4}>
                                    <div className='dashlinks'>
                                        <Link to='/AllCourses'><FaBook className='mr-3' style={{}}/>Courses</Link><br/>
                                        <div className='sublinks'>
                                            <Link to='/AddCourse'>create course</Link><br/>
                                            <Link to='/Courses'>My courses</Link><br/>
                                        </div>
                                    </div><hr/>

                                    <div className='dashlinks'>
                                        <Link to='/'><FaEnvelope className='mr-3'/>Messages</Link><br/>
                                        <div className='sublinks'>
                                            <Link to='/'>Inbox</Link><br/>
                                            <Link to='/'>Outbox</Link><br/>
                                            <Link to='/'>Notifications</Link>
                                        </div>
                                    </div><hr/>

                                    <div className='dashlinks'>
                                        <Link to='/'><FaBlog className='mr-3'/>Blogs</Link><br/>
                                        <div className='sublinks'>
                                            <Link className='sublinks' to='/MyBlogs'>My posts</Link><br/>
                                            <Link className='sublinks' to='/Blogpost'>Write Blog</Link>
                                        </div>
                                    </div><hr/>

                                    <div className='dashlinks'>
                                        <Link to='/Profile'><FaUserCircle className='mr-3'/>Profile</Link><br/>
                                        <div className='sublinks'>
                                            <Link to='/EditProfile'>Edit Profile</Link><br/>
                                            <Link to='/ChangePassword'>Change E-mail</Link><br/>
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={12} sm={12} md={4} lg={6}>
                                    <div className='dashlinks'>
                                        <Link to='/Labs'><FaLaptop className='mr-3'/>Labs</Link>
                                        <div className='sublinks mt-2'>
                                            <Link to='Lab/Lab1' ><ButtonComponent  buttonName="Lab 1" buttonSize="sm"/></Link>
                                            <Link to='Lab/Lab2' ><ButtonComponent  buttonName="Lab 2" buttonSize="sm"/></Link>
                                            <Link to='Lab/Lab3' ><ButtonComponent  buttonName="Lab 3" buttonSize="sm"/></Link>
                                            <Link to='Lab/Lab4' ><ButtonComponent  buttonName="Lab 4" buttonSize="sm"/></Link>
                                            <Link to='Lab/Lab5' ><ButtonComponent  buttonName="Lab 5" buttonSize="sm"/></Link>
                                        </div><hr></hr>
                                    </div>

                                    <div className='dashlinks'>
                                        <Link to='/Users'><FaLayerGroup className='mr-3'/>Users</Link>
                                        <div className='sublinks'>
                                            <Link to='/AddUser'>Add Users</Link><br/>
                                            <Link to='/Users'>Enrolled Students</Link><br/>
                                            <Link to='/'>Groups</Link>
                                        </div><hr></hr>
                                    </div>


                                    <div className='dashlinks'>
                                        <Link to='/'><FaSave className='mr-3'/>Security Settings</Link>
                                        <div className='sublinks'>
                                            <Link to='/ChangePassword'>Change password</Link><br/>
                                            <Link to='/SecretQuestion'>Secret Question</Link>
                                        </div>
                                    </div>

                                    <div style={{marginLeft:'0px'}}>
                                        <Button variant='success mt-3'>
                                            <a href="https://meet.google.com/new?hs=180&amp;authuser=0" target="_blank" style={{color:'#FFF'}} draggable="false">
                                                Start a meeting
                                            </a>
                                        </Button>
                                    </div>


                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
 
export default StaffView;