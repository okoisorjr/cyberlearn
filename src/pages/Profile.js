import React, {Fragment, useContext, useState, useEffect} from 'react'
import { Container, Row, Col, Card, Button, Alert,  } from 'react-bootstrap'
import Header from '../Components/header'
import AdminHeader from '../admin/AdminHeader'
import {AuthContext} from '../auth'
import Firebase from '../firebase/config'

const Profile = () => {

    const {currentUser, user} = useContext(AuthContext)
    const db = Firebase.firestore().collection('personal-info').doc(user.username)

    return (
        <Fragment>
            {user.role === 'admin' && <AdminHeader/>}
            {user.role !== 'admin' && <Header/>}
            <Container>
                <Row>
                    <div className='mt-2 ml-3 d-flex justify-content-start'>
                        <h1>My Profile</h1>
                    </div>
                </Row>
                <Row>
                    <Col lg={4}>
                    <Card className='mt-3' style={{borderLeftColor:'#00121F', borderLeftWidth:'5px'}}>
                        <Card.Title className='text-center mt-4' ><h3>Basic Information</h3></Card.Title>
                        <Card.Body>
                            <Card.Text><strong>Username :</strong> { user.username}</Card.Text>
                            <Card.Text><strong>Role :</strong> {user.role}</Card.Text>
                            <Card.Text><strong>E-mail :</strong> {currentUser.email}</Card.Text>
                            <Card.Text><strong>Firstname :</strong> {user.firstname}</Card.Text>
                            <Card.Text><strong>Lastname :</strong> {user.lastname}</Card.Text>
                            <Card.Text><strong>UserID :</strong> {currentUser.uid}</Card.Text>
                            {user.role === 'student' && <Card.Text><strong>Matric_No :</strong> {user.matric}</Card.Text>}
                            {user.role === 'lecturer' && <Card.Text><strong>Staff_ID :</strong> {user.staffID}</Card.Text>}
                            <Button ocClick='' variant='outline-success'>Edit Information</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col lg={8}>
                        <Card className='mt-3' style={{borderLeftColor:'green', borderLeftWidth:'5px'}}>
                            <Card.Title className='mt-4 text-center'><h3>Personal Information</h3></Card.Title>
                            <Card.Body>
                                <Card.Text><strong>Phone :</strong></Card.Text>
                                <Card.Text><strong>Address :</strong></Card.Text>
                                <Card.Text><strong>Occupation :</strong></Card.Text>
                                <Card.Text><strong>Badge :</strong></Card.Text>
                                <Card.Text><strong>Phone :</strong></Card.Text>
                                <Button onClick='' variant='success'>Edit Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Profile
