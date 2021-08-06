import React, {useState, useContext} from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { ProfileUploadModal } from '../Components/Modal'
import asset1 from '../assets/15.jpg'
import { FaBlog, FaBook, FaEnvelope, FaLaptop, FaLayerGroup, FaPen, FaSave, FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../auth';

const StudentView = () => {

    const [showModal, setShowModal] = useState(false)
    const {user} = useContext(AuthContext)

    return (  
        <>
            <Container>
                <Row>
                    <Col xs={12} sm={6} md={3} lg={3}>
                    <Card style={{width:'100%', height:'150px', background:'orange', color:'#fff'}} className='mt-2'>
                        <Card.Body>
                            <Card.Title className='text-center'>Enrolled Courses</Card.Title>
                            <h1 className="text-center">0</h1>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col xs={12} sm={6} md={3} lg={3}>
                    <Card style={{width:'100%', height:'150px', background:'purple', color:'#fff'}} className='mt-2'>
                        <Card.Body>
                            <Card.Title className='text-center'>Completed Courses</Card.Title>
                            <h1 className="text-center">0</h1>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col xs={12} sm={6} md={3} lg={3}>
                    <Card style={{width:'100%', height:'150px', background:'grey', color:'#fff'}} className='mt-2'>
                        <Card.Body>
                            <Card.Title className='text-center'>Completed Labs</Card.Title>
                            <h1 className="text-center">0</h1>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col xs={12} sm={6} md={3} lg={3}>
                    <Card style={{width:'100%', height:'150px', background:'brown', color:'#fff'}} className='mt-2'>
                        <Card.Body>
                            <Card.Title className='text-center'>Total Labs</Card.Title>
                            <h1 className="text-center">0</h1>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                
                <Row>
                    <Col lg={12}>
                    <Card style={{width:'100%'}} className='d-flex shadow-sm mt-3 mb-2'>
                        <Card.Header className='' style={{backgroundColor:'navy'}}><Card.Title><Link to='/Dashboard' style={{ color:'#fff'}}>Dashboard</Link></Card.Title></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={4}>
                                    <div className='dashlinks'>
                                        <Link to='/AllCourses'><FaBook className='mr-3' style={{}}/>Courses</Link><br/>
                                        <div className='sublinks'>
                                            <Link to='/EnrolledCourses' className='mr-1'>My courses</Link>
                                        </div>
                                    </div><hr/>

                                    <div className='dashlinks'>
                                        <Link to='/'><FaEnvelope className='mr-3'/>Messages</Link><br/>
                                        <div className='sublinks'>
                                            <Link to='/'>inbox</Link><br/>
                                            <Link to='/'>outbox</Link>
                                        </div>
                                    </div><hr/>

                                    <div className='dashlinks'>
                                        <Link to='/Blogs'><FaBlog className='mr-3'/>Blogs</Link><br/>
                                        <div className='sublinks'>
                                            <Link className='sublinks' to='/MyBlogs'>My blogs</Link><br></br>
                                            <Link className='sublinks' to='/Blogpost'>write blog</Link>
                                        </div>
                                    </div><hr/>

                                    <div className='dashlinks'>
                                        <Link to='/Profile'><FaUserCircle className='mr-3'/>Profile</Link><br/>
                                        <div className='sublinks'>
                                            <Link className='sublinks mr-1' to='/EditProfile'>edit profile</Link><br/>
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={12} sm={12} md={4} lg={4}>
                                    <div className='dashlinks'>
                                        <Link to='/Lab' className='mt-sm-4'><FaLaptop className='mr-3'/>Labs</Link>
                                        <div className='sublinks mt-2'>
                                            <Link to='/Lab/Lab1' className='mr-1'><Button variant='success'>Lab 1</Button></Link>
                                            <Link to='/Lab/Lab2' className='mr-1'><Button variant='info'>Lab 2</Button></Link>
                                            <Link to='/Lab/Lab3' className='mr-1'><Button variant='secondary'>Lab 3</Button></Link>
                                            <Link to='/Lab/Lab4' className='mr-1'><Button variant='danger'>Lab 4</Button></Link>
                                            <Link to='/Lab/Lab5' className='mr-1'><Button variant='primary'>Lab 5</Button></Link>
                                        </div><hr></hr>
                                    </div>

                                    <div className='dashlinks'>
                                        <Link to='/Users'><FaLayerGroup className='mr-3'/>Coursemates</Link>
                                        <div className='sublinks'>
                                            <Link to='/Lab1' className='mr-1'>members</Link><br/>
                                            <Link to='/Lab1' className='mr-1'>groups</Link>
                                        </div><hr></hr>
                                    </div>

                                    <div className='dashlinks'>
                                        <Link to='/'><FaSave className='mr-3'/>Security Settings</Link>
                                        <div className='sublinks'>
                                            <Link to='/ChangePassword' className='mr-1'>change password</Link><br/>
                                            <Link to='/SecretQuestions' className='mr-1'>Secret Question</Link>

                                            <ProfileUploadModal 
                                                show={showModal}
                                                onHide={()=>setShowModal(false)}/>
                                        </div>
                                    </div>
                                </Col>

                                <Col>
                                    <Card className='mt-md-5 mt-2'>
                                        <Card.Body>
                                            <Row>
                                            <Col>
                                            <div className='d-flex'>
                                                <img src={asset1} className='profile mx-auto d-block' alt=''/>
                                                <FaPen size='1.2rem' className='mt-5 text-right' onClick={()=>setShowModal(true)}/>                                                
                                            </div>
                                            <strong><h5 className='text-center mt-3'>{user.username}</h5></strong>
                                            </Col>
                                            <Col>
                                                
                                                <Card.Text className='mt-2 text-center'>{user.firstname + " " + user.lastname}</Card.Text>
                                                <Card.Text className='lead'>{user.email}</Card.Text>
                                            </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
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
 
export default StudentView;