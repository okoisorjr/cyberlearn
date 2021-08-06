import React, {Fragment, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Container, Row, Col, Nav, Dropdown } from 'react-bootstrap'
import {FaBook, FaDashcube, FaSignOutAlt, FaPlus, FaUsers, FaUserCircle, FaDesktop, FaBlogger} from 'react-icons/fa'
import {AiOutlineWarning} from 'react-icons/ai'
import icon from '../assets/Asset 4.png'
import { AuthContext } from '../auth'
import Firebase from '../firebase/config'

export const AdminHeader = () => {

    const {currentUser, user} = useContext(AuthContext)
    const history = useHistory()
    
    const signOut = () => {
        Firebase.auth().signOut()
        history.push('/AdminLogin')
        window.location.reload(false)
    }
    
    return(
        <Fragment>
            <Container style={{backgroundColor:'#00121F'}} fluid> 
                {(currentUser !== null && user.role === 'admin') &&
                <Row>
                    <Col xs={12} sm={6} md={4} lg={8}>
                        <a href='/Admin'><img className='text-center ml-5 p-2' src={icon} alt='icon_logo' /></a>
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={4}>
                    <Nav className='p-1'>
                        <Dropdown className='p-2 mt-2 mr-2 ml-auto'>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                {user.role}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item><h6>Admin,</h6><h5>{user.username}</h5></Dropdown.Item><hr/>
                                <Dropdown.Item href='/Admin'><FaDashcube className='mr-2'/>Dashboard</Dropdown.Item>
                                <Dropdown.Item href='/AllUsers'><FaUsers className='mr-2'/>All Users</Dropdown.Item>
                                <Dropdown.Item href='/Adminprofile'><FaUserCircle className='mr-2'/>Profile</Dropdown.Item>
                                <Dropdown.Item href='/CreateUser'><FaPlus className='mr-2'/>Create New User</Dropdown.Item>
                                <Dropdown.Item href='/CreateCourse'><FaBook className='mr-2'/>Create Course</Dropdown.Item>
                                <Dropdown.Item href='/Lab'><FaDesktop className='mr-2'/>Lab Works</Dropdown.Item>
                                <Dropdown.Item href='/Bloglist'><FaBlogger className='mr-2'/>Blogs</Dropdown.Item>
                                <Dropdown.Item href='/Errors'><AiOutlineWarning className='mr-2'/>Errors</Dropdown.Item>
                                <Dropdown.Item onClick={signOut}><FaSignOutAlt className='mr-2'/>Sign out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Col>
                </Row>}
            </Container>
        </Fragment>
    )
}

export default AdminHeader