import React from 'react'
import {Carousel} from 'react-bootstrap'
import asset1 from '../assets/carousel1.jpg'
import asset2 from '../assets/carousel2.jpg'
import asset3 from '../assets/virtual_lab.jpg'
import asset4 from '../assets/blog.jpeg'

function carousel() {

    return (            
        <Carousel>
            <Carousel.Item interval={2000}>
                <img
                    style={{maxHeight:'500px'}}
                    className='d-block w-100'
                    src={asset1}
                    alt='slide1'/>
                <Carousel.Caption>
                    <h3>Learn How to hack!</h3>
                    <p>pick up the necessary skills to become a reliable and competent pentester</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
                <img
                    style={{maxHeight:'500px'}}
                    className='d-block w-100'
                    src={asset2}
                    alt='slide1'/>
                <Carousel.Caption>
                    <h3>Virtual Laboratory!</h3>
                    <p>The virtual Labs creates an environment to try out what you have learnt, like they say pratice makes perfect.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
                <img
                    style={{maxHeight:'500px'}}
                    className='d-block w-100'
                    src={asset3}
                    alt='slide1'/>
                <Carousel.Caption>
                    <h3>Virtual Laboratory!</h3>
                    <p>The virtual Labs creates an environment to try out what you have learnt, like they say pratice makes perfect.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
                <img
                    style={{height:'500px'}}
                    className='d-block w-100'
                    src={asset4}
                    alt='slide1'/>
                <Carousel.Caption>
                    <h3>Virtual Laboratory!</h3>
                    <p>The virtual Labs creates an environment to try out what you have learnt, like they say pratice makes perfect.</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    )
}

export default carousel
