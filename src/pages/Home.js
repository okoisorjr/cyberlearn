import React, {useContext, useEffect, useState} from 'react';
import { Container, Jumbotron, Button, Row, Card, Col } from 'react-bootstrap'
import { useHistory } from 'react-router';
import Footer from '../Components/footer';
import FeaturedCourse from '../Components/FeaturedCourse'
import Services from '../Components/Services';
import { FaPencilAlt } from 'react-icons/fa'
import Header from '../Components/header'
import Carousel from '../Components/carousel'
import { AuthContext } from '../auth';
import Firebase from '../firebase/config'

export const Home = () => {

    const {currentUser} = useContext(AuthContext)
    const history = useHistory()
    const db = Firebase.firestore().collection('blogs')

    const [blogs, setBlogs] = useState([])

    const getBlog = async () => {        
        await db.orderBy('title').limit(6).onSnapshot(snapshot => {
            setBlogs(snapshot.docs.map(doc => (doc.data())))
        })
    }

    useEffect(() => {
        getBlog()
    }, [])

    const view = (id) => {
        history.push('/Blog/' + id)
    }

        return(
            <>
                <Header />
                <Carousel/>                
                <Jumbotron id='jumbo'>
                    <Container className='text-center'>
                        <h1 style={{color:'#FFF'}} className='mb-5'>CyberLearn</h1>
                        <p className='mt-5 lead'><FaPencilAlt size='1.5em' className='icons'/>A cyber security platform which was built specifically, for cyber security aspirants, cyber security intermediates and cyber security professionals, to provide a safe learning ground by implementing an online virtual environment for testing and practical purposes.</p> 
                        <p className='lead'><FaPencilAlt size='1.5em' className='icons'/>The Application aims to simplify the burdensome process of setting up a virtual laboratory yourself by making resources available to you as at when needed without having to setup anything. All that is required is to {currentUser === null && <a href='/Register' style={{color:'#990000'}}>sign up</a>} and start learning.</p><hr/>
                        <p><Button variant='success'className='mt-5'>Learn more</Button></p>
                    </Container>
                </Jumbotron>  
                <Container>
                    <h1 className='mt-1 text-center'>Available Courses</h1>
                    <Row>
                        <FeaturedCourse/>
                    </Row>
                </Container>
                <Container fluid style={{background: '#C0C0C0', color:'#222'}}>
                    <h1 className='text-center mt-5 mb-5'>Features</h1>
                    <Row>
                        <Services />
                    </Row>
                </Container>   
                <Container>
                    <h1 className='text-center mt-4'>Blogs</h1>
                    <Row>
                    {blogs && blogs.map((b) => {
                        return(<Col lg={4} md={6} sm={6} xs={12} key={b.id}>
                            <Card className="mt-3 mb-4" style={{backgroundColor:'#00121F', color:'#fff'}}>
                                <Card.Body>
                                    <Card.Img/>
                                    <Card.Title><h3>{b.title}</h3></Card.Title><br/>
                                    <Card.Text>Written By : {b.author_name}</Card.Text>
                                    <Card.Text>{b.content.substring(0, 70) + "....."}</Card.Text>
                                    <Button size='sm' onClick={() => view(b.id)} variant='outline-success'>Read More...</Button>
                                </Card.Body>
                            </Card>
                        </Col>)
                    })}
                    </Row>
                </Container> 
                <Footer />
         </>
        )
    }

export default Home;