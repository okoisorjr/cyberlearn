import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Nav, Button, Dropdown } from 'react-bootstrap'
import {FaBook, FaDashcube, FaLaptop, FaUser, FaHome, FaSignOutAlt, FaPlus, FaBlog} from 'react-icons/fa'
import icon from '../assets/Asset 4.png'
import { AuthContext } from '../auth'

export const Header = () => {

    const {currentUser, user, logout} = useContext(AuthContext)
    
    return(
        <Container style={{backgroundColor:'#00121F'}} fluid> 
                {(currentUser !== null && user.role !== null) ? 
                ( 
                <Row>
                    <Col xs={12} sm={6} md={4} lg={8}>
                        <a href='/'><img className='text-center ml-5 p-2' src={icon} alt='icon_logo' /></a>
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={4}>
                    <Nav className='p-1'>
                        <Link to='/Labs' className='mt-3 ml-auto icon-link'><FaLaptop className='mt-2 ml-2' size='1.5rem'/></Link>
                        {user.role === "lecturer" && <Link to='/Courses' className='mt-3 ml-auto icon-link'><FaBook className='mt-2 ml-2' size='1.5rem'/></Link>}
                        
                        <Link to='/Blogs' className='mt-3 ml-auto icon-link'><FaBlog className='mt-2 ml-2' size='1.5rem'/></Link>
                        <Dropdown className='p-2 mt-2 mr-2 ml-auto'>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                {user.role}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item><h6>Hey,</h6><h5>{user.username}</h5></Dropdown.Item><hr/>
                                <Dropdown.Item href='/'><FaHome className='mr-2'/>Home</Dropdown.Item>
                                <Dropdown.Item href='/Dashboard'><FaDashcube className='mr-2'/>Dashboard</Dropdown.Item>
                                <Dropdown.Item href='/profile'><FaUser className='mr-2'/>My Profile</Dropdown.Item>
                                <Dropdown.Item href='/Lab'><FaLaptop className='mr-2'/>Lab</Dropdown.Item>
                                {user.role === 'student' && <Dropdown.Item href='/Courses'><FaBook className='mr-2'/>My Courses</Dropdown.Item>}
                                {user.role === 'lecturer' && <Dropdown.Item href='/AddCourse'><FaPlus className='mr-2'/>Add Courses</Dropdown.Item>}
                                <Dropdown.Item href='/Login' onClick={logout}><FaSignOutAlt className='mr-2'/>Sign out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Col>
                </Row>)
                     : 
                (
                <Row>
                    <Col xs={12} sm={6} md={4} lg={8}>
                        <a href='/'><img className='text-center ml-5 p-2' src={icon} alt='icon_logo' /></a>
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={4}  className='ml-auto'>     
                     <Nav className='p-1'>
                        <Button variant='outline-primary' className='p-2 mt-3 mr-2 ml-auto'><a href='/Login' className='header-link'>Login</a></Button>
                        <Button variant='success' className='p-2 mt-3'><a href='/Register' className='header-link'>SIGN UP</a></Button>               
                    </Nav>
                    </Col>
                </Row>)}                                    
        </Container>
    )
}

export default Header;