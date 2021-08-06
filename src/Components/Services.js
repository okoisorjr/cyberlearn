import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { FaBlog, FaLock, FaLaptop, FaVideo} from 'react-icons/fa'
import asset1 from '../assets/8.jpg'
import asset2 from '../assets/15.jpg'
import asset3 from '../assets/13.jpg'
import asset4 from '../assets/11.jpg'

const Services = () => {

    const features = [
        {feature:'virtual Lab', background:asset1, icon:<FaLaptop size='3rem'/>, desc:'The virtual lab provides students the platform to carry out praticals'},
        {feature:'virtual Meetings', background:asset2, icon:<FaVideo size='3rem'/>, desc:'The virtual classroom enables instructors hold a class with its members virtually' },
        {feature:'Blog', background:asset3, icon:<FaBlog size='3rem'/>, desc:'Here you can write and post a blog about what you have learnt using the platform'},
        {feature:'security', background:asset4, icon:<FaLock size='3rem'/>, desc:'your security is our priority, data is securely transfered and encryption of user data'}
    ]

    return (
        <>
            {features.map(feature => (
                <Col xs={12} sm={6} md={6} lg={3}  key={feature.feature}>
                    <div>
                        <Card style={{background:'#FFF', color:'#222', opacity:'.8rem', height:'400px'}} className='mb-5 mt-2'>
                        <Card.Img src={feature.background} style={{height:'180px'}}/>
                        <p className='text-center mt-3'>{feature.icon}</p>
                        <Card.Title className='text-center'>{feature.feature}</Card.Title>
                        <Card.Body className='text-center lead' style={{fontSize:'16px'}}>{feature.desc}</Card.Body>                        
                        </Card>
                    </div>        
                </Col>
            ))}
        </>
    )
}

export default Services
