import React from 'react'
import {Container, Row, Col, Nav} from 'react-bootstrap';
import { FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaTwitterSquare, FaEnvelope, FaPhone, FaInfoCircle } from 'react-icons/fa';

export const Footer = () => {

    const style = {
        backgroundColor: '#EEE',
        color:'#00121F'
    }

    return (
        <React.Fragment>
            <Container style={style} fluid>
                <Row>
                    <Col xs={12} sm={6} md={3} lg={3}>                        
                    <p className='mt-3 ml-3 lead'>Address</p>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                        <p className='mt-3 ml-3 lead'>Social Media</p>
                        <Nav.Link href="https://web.facebook.com/Mckelvinxy" style={{color:'#00121F'}}><FaFacebookSquare size='2em' className='icons' />Facebook</Nav.Link>
                        <Nav.Link href="#" style={{color:'#00121F'}}><FaTwitterSquare size='2em' className='icons' />Twitter</Nav.Link>
                        <Nav.Link href="https://www.instagram.com/itz_ochael/" style={{color:'#00121F'}}><FaInstagramSquare size='2em' className='icons' />Instagram</Nav.Link>
                        <Nav.Link href="https://www.github.com/okoisorjr/" style={{color:'#00121F'}}><FaGithubSquare size='2em' className='icons' />Github</Nav.Link>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                        <p className='mt-3 ml-3 lead'>Contributors</p>
                        <Nav.Link style={{color:'#00121F'}}>Okoisor O'chael</Nav.Link>
                        <Nav.Link style={{color:'#00121F'}}>Idoko Emmanuel</Nav.Link>
                        <Nav.Link style={{color:'#00121F'}}>Joseph Miracle</Nav.Link>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                        <p className='mt-3 ml-3 lead'>Contact</p>
                        <Nav.Link href='Register' style={{color:'#00121F'}}><FaInfoCircle size='2em' className='icons' />Get Support?</Nav.Link>
                        <Nav.Link href='https://mail.google.com/mail/u/0/#inbox' style={{color:'#00121F'}}><FaEnvelope size='2em' className='icons'/>okoisorjr@gmail.com</Nav.Link>
                        <Nav.Link href='Register' style={{color:'#00121F'}}><FaPhone size='2em' className='icons'/>+234 907 7934 077</Nav.Link>
                        
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Footer
