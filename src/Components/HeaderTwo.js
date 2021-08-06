import React, {useContext, useState} from 'react'
import {Container, Row, Col, Nav, Form, Dropdown, Button } from 'react-bootstrap'
import {FaBook, FaDashcube, FaLaptop, FaUser, FaHome, FaSignOutAlt, FaPlus, FaSearch} from 'react-icons/fa'
import icon from '../assets/Asset 4.png'
import { AuthContext } from '../auth'

const HeaderTwo = () => {

    const {currentUser, user, logout} = useContext(AuthContext)
    const [search, setSearch] = useState()
    
    return(
        <Container style={{backgroundColor:'#00121F'}} fluid> 
                {(currentUser !== null && user.role !== null) &&
                <Row>
                    <Col xs={12} sm={6} md={4} lg={8}>
                        <a href='/'><img className='text-center ml-5 p-2' src={icon} alt='icon_logo' /></a>
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={4}>
                    <Nav className='p-1'>
                        <Form.Group className='mt-3 ml-5'>
                            <Form.Control type='text' value={search} placeholder='search courses' onChange={(e) => setSearch(e.target.value)}/>
                        </Form.Group>
                        <Button size='sm'><FaSearch/></Button>
                        <Dropdown className='p-2 mt-2 mr-2 ml-auto'>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                Account
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item><h6>Hey,</h6><h5>{user.firstname} {user.lastname}</h5></Dropdown.Item><hr/>
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
                </Row>}
        </Container>
    )
}

export default HeaderTwo
