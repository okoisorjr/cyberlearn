import React, {Fragment, useState} from 'react'
import { Container, Row, Col, Card, Alert, Form, Button, Table, InputGroup } from 'react-bootstrap'
import { Accordion } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../Components/header'
import asset from '../assets/ping_image.png'
import '../App.css'
import ReactPlayer from 'react-player'


const Lab1 = () => {

    const [answerOne, setAnswerOne] = useState("")
    const [answerTwo, setAnswerTwo] = useState("")
    const [answerThree, setAnswerThree] = useState("")
    const [answerFour, setAnswerFour] = useState("")
    const [answerFive, setAnswerFive] = useState("")

    const lab = [
        {id:'Lab1', title:'Ping Command', video_url:'https://www.youtube.com/watch?v=IIicPE38O-s'},
        {id:'Lab2', title:'Gobuster', video_url:'https://www.youtube.com/watch?v=5MTZdN9TEO4'},
        {id:'Lab3', title:'Nmap Commands', video_url:'https://www.youtube.com/watch?v=QTAKmINxKZA'},
        {id:'Lab4', title:'Basic Linux Commands', video_url:'https://www.youtube.com/watch?v=J2zquYPJbWY'}
    ]

    return (
        <Fragment>
            <Header/>
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Alert variant='success' style={{fontSize:'22px'}}>welcome to Lab1 - <strong>PING COMMAND</strong></Alert>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <ReactPlayer url="https://www.youtube.com/watch?v=IIicPE38O-s" width={560} height={400} controls={true} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={12} className='mt-2'>
                    <Card sm={12} md={12} lg={12} className='mb-2'>
                            <div>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0" >
                                        Start Lab
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body><a href='https://ssh.cloud.google.com/projects/uplifted-cinema-312410/zones/europe-west2-c/instances/lab-3?authuser=0&hl=en_US&projectNumber=740579365098&useAdminProxy=true' target='_blank'>Click to start Lab</a></Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1" >
                                        What is Ping?
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <Card.Text>
                                            Ping is a simple, widely used, cross-platform networking utility for testing if a host is reachable on an Internet Protocol (IP) network. 
                                            It works by sending a series of Internet Control Message Protocol (ICMP) ECHO_REQUEST messages to the target host and waiting for an ICMP 
                                            echo reply (or ECHO_RESPONSE).
                                            You can run a ping test in order to establish if your computer can communicate with another computer (target host); it helps you determine:
                                            </Card.Text>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="2" >
                                        The Ping Command in Linux
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            <Card.Text>
                                            <h1 className='mb-4'>The ping Command in Linux</h1>
                                            <p>To use the ping command in Linux, access the shell prompt, 
                                            and use the following syntax.</p>

                                            <p className='p-2' style={{backgroundColor:'#00121F', color:'#FFF', fontSize:'16px'}}><span className='mt-2 mb-2'>ping [IP address, hostname, or URL of the remote system]</span></p>
                                            <p>For example, to <em>ping www.google.com</em>, use the following command. <strong>ping www.google.com</strong></p>

                                            <p>The ping command in Linux sends messages continuously. To stop the ping 
                                            command from sending more messages, press the <strong>ctrl+c keys.</strong></p>

                                            <p>The following image shows the output of the above command.
                                            default use of the ping command in linux</p>

                                            <p><img src={asset} alt='' width={600} height={300}/></p>

                                            <p>The ping command supports more options and arguments in Linux than it supports in Windows.</p>
                                            <p>The following table lists the most common options of the ping command in Linux.</p>
                                            </Card.Text>
                                            <Table striped bordered hover variant='dark'>
                                                <thead>
                                                    <tr>
                                                        <th>Options</th>
                                                        <th>Descriptions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>-i</td>
                                                        <td>Sets the interval between packets</td>
                                                    </tr>

                                                    <tr>
                                                        <td>-c</td>
                                                        <td>Specifies the number of packets to be sent</td>
                                                    </tr>

                                                    <tr>
                                                        <td>-f</td>
                                                        <td>Send packets as much and fast as the network allows</td>
                                                    </tr>

                                                    <tr>
                                                        <td>-q</td>
                                                        <td>Display only static or summary</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="3">
                                        Answer Questions?
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                            <Card.Title><h1 className='mt-2 mb-5'>The Ping Command Exercise</h1></Card.Title>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Label>Question 1 - <strong>What command is used to determine if a host is alive or dead?</strong></Form.Label>
                                                    <InputGroup>
                                                        <Form.Control type='text' value={answerOne} placeholder='{****}' onChange={e => {setAnswerOne(e.target.value)}}/>                                                   
                                                        <InputGroup.Append>
                                                            <Button variant='success'>Submit Answer</Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Question 2 - <strong>What is the command to determine if the host with the IP address 192.168.0.1 is alive or not?</strong></Form.Label>
                                                    <InputGroup>
                                                        <Form.Control type='text' value={answerTwo} placeholder='{**** ***.***.*.*}' onChange={e => {setAnswerTwo(e.target.value)}}/>
                                                        <InputGroup.Append>
                                                            <Button variant='success'>Submit Answer</Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Question 3 - <strong>What option is attached to the ping command to specify the number of packets to be sent?</strong></Form.Label>
                                                    <InputGroup>
                                                        <Form.Control type='text' value={answerThree} placeholder='{**}' onChange={e => {setAnswerThree(e.target.value)}}/>
                                                        <InputGroup.Append>
                                                            <Button variant='success'>Submit Answer</Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Question 4 - <strong>What command is used to determine if a host is alive or dead?</strong></Form.Label>
                                                    <InputGroup>
                                                        <Form.Control type='text' value={answerFour} placeholder='{****}' onChange={e => {setAnswerFour(e.target.value)}}/>
                                                        <InputGroup.Append>
                                                            <Button variant='success'>Submit Answer</Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Question 5 - <strong>What command is used to determine if a host is alive or dead?</strong></Form.Label>
                                                    <InputGroup>
                                                        <Form.Control type='text' value={answerFive} placeholder='{****}' onChange={e => {setAnswerFive(e.target.value)}}/>
                                                        <InputGroup.Append>
                                                            <Button variant='success'>Submit Answer</Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Lab1
