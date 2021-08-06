import React, { useContext, useEffect, useState } from 'react' 
import Header from '../Components/header'
import AdminHeader from '../admin/AdminHeader'
import{Container, Col, Row, Card, Button} from 'react-bootstrap'
import Firebase from '../firebase/config'
import { useHistory } from 'react-router'
import {AuthContext} from '../auth'

export const Labs = () => {

    const {user} = useContext(AuthContext)
    const theLab = [
        {id:'Lab1', title:'Ping Command', video_url:'https://www.youtube.com/watch?v=IIicPE38O-s'},
        {id:'Lab2', title:'Gobuster', video_url:'https://www.youtube.com/watch?v=5MTZdN9TEO4'},
        {id:'Lab3', title:'Nmap Commands', video_url:'https://www.youtube.com/watch?v=QTAKmINxKZA'},
        {id:'Lab4', title:'Basic Linux Commands', video_url:'https://www.youtube.com/watch?v=J2zquYPJbWY'}
    ]
    const [labs, setLabs] = useState([])
    const history = useHistory()

    const db = Firebase.firestore().collection('labs')
    
    const getLabs = async () => {
        db.onSnapshot(snapshot => (
            setLabs(snapshot.docs.map(doc => (doc.data())))
        ))
    }

    useEffect(() => {
        getLabs()
    }, [])

    const viewLab1 = () => {
        history.push('/Lab1')
    }

    const viewLab2 = () => {
        history.push('/Lab2')
    }

    const viewLab3 = () => {
        history.push('/Lab3')
    }

    return (
        <>
        {user.role === "admin" && <AdminHeader/>}
        {user.role !== "admin" && <Header/>}
        <Container>
            <h1 className='mt-2 mb-2'>All Labs</h1>
            <Row>
                <Col>
                        <Row>
                            <Col className='mt-2' xs={12} sm={12}>
                                <Card.Header>
                                    <Card.Title>Lab1</Card.Title>
                                </Card.Header>
                                <Card.Body style={{backgroundColor:'#00121F', color:'#fff'}}>
                                        <h3>Ping Command</h3>
                                        <p className='mt-4'></p>
                                        <Button onClick={() => viewLab1()} variant='success' className='mt-2'>Start Lab</Button>
                                </Card.Body>
                            </Col>
                        </Row>

                        <Row>
                            <Col className='mt-2' xs={12} sm={12}>
                                <Card.Header>
                                    <Card.Title>Lab2</Card.Title>
                                </Card.Header>
                                <Card.Body style={{backgroundColor:'#00121F', color:'#fff'}}>
                                        <h3>Nmap Command</h3>
                                        <p className='mt-4'></p>
                                        <Button onClick={() => viewLab2()} variant='success' className='mt-2'>Start Lab</Button>
                                </Card.Body>
                            </Col>
                        </Row>

                        <Row>
                            <Col className='mt-2' xs={12} sm={12}>
                                <Card.Header>
                                    <Card.Title>Lab3</Card.Title>
                                </Card.Header>
                                <Card.Body style={{backgroundColor:'#00121F', color:'#fff'}}>
                                        <h3>Linux Basic Commands</h3>
                                        <p className='mt-4'></p>
                                        <Button onClick={() => viewLab3()} variant='success' className='mt-2'>Start Lab</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                </Col>
            </Row>
        </Container>  
        </>
    )
}

export default Labs