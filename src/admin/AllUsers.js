import React, { useState, useEffect, Fragment } from 'react'
import Firebase from '../firebase/config'
import {Container, Row, Col, Table, Card, Button} from 'react-bootstrap'
import AdminHeader from './AdminHeader'

const AllUsers = () => {

    const db = Firebase.firestore().collection('users')
    const [users, setUsers] = useState([])

    const getAllUsers = () => {
        db.onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => (doc.data())))
            console.log(users)
        })
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <Fragment>
            <AdminHeader/>
            <Container>
            <h1 className='mt-2 mb-4'>All Users</h1>
                <Row>
                <Col sm={12} md={12} lg={12}>
                <Card>
                    <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>E-mail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        
                        {users && users.map((user, index) => (
                            <tbody key={index}                            >
                                <tr>
                                    <td>{index}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td><Button variant='link'>View Information</Button></td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Card>
                </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default AllUsers