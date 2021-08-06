import React, {useState, useEffect} from 'react'
import Firebase from '../firebase/config'
import { useHistory } from 'react-router'
import Header from '../Components/header'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa'

const Blogs = () => {
    const history = useHistory()
    const [blogs, setBlogs] = useState([])
    const [search, setSearch] = useState()

    const db = Firebase.firestore().collection('blogs')
    
    const getBlogs = async (e) => {
        await db.onSnapshot(snapshot =>
            setBlogs(snapshot.docs.map(doc => doc.data())))
    }

    useEffect(() => {
        getBlogs()
    }, [])

    const view = (id) => {
        history.push('/Blog/' + id)
    }

    const onSearch = async (e) => {

    }

    return (
        <>
            <Header/>
            <Container>
                <Row>
                    <div className='mt-2 ml-3 d-flex justify-content-start'>
                        <h1>All Blogs</h1>
                    </div>
                    <div className='ml-auto mr-4 d-flex justify-content-end'>
                        <Form.Group className='mt-3'>
                            <Form.Control type='text' value={search} placeholder='search blogs' onChange={(e) => setSearch(e.target.value)}/>    
                        </Form.Group>
                        <Button size='sm' onClick={onSearch} className='mt-3 mb-3'><FaSearch size='1.5rem'/></Button>
                    </div>
                </Row>
                <Row>
                    {blogs && blogs.map(blog => (<Col key={blog.id} lg={12} md={12}>
                        <Card className='mt-2'> 
                            <Card.Header>
                                <Card.Title>{blog.title}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{blog.content.substring(0,500) + "....."}</Card.Text>
                                <div>
                                    <Button variant='outline-success' onClick={() => view(blog.id)}>Read More</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>))}
                </Row>
            </Container>  
        </>
    )
}

export default Blogs
