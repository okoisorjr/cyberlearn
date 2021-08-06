import React, { useState, Fragment, useEffect } from 'react'
import {Container, Row, Card} from 'react-bootstrap'
import Firebase from '../firebase/config'
import Header from '../Components/header'

const Blog = (route) => {
    const id = route.match.params.id
    const [blog, setBlog] = useState({})

    const db = Firebase.firestore().collection('blogs')

    const getBlogList = (id) => {
      console.log(id)
      db
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data()
        setBlog(data)
      })
      .catch((error) => {
        console.log('error fetching documents', error.message)
      })
    }
    
    useEffect(() => {
      getBlogList(id)
    }, [])

    return (
        <Fragment>
            <Header/>
            <Container>
              <Row>
                <Card className='mt-3 p-3' style={{backgroundColor:'#00121F', color:'#fff', width:'100%'}}>
                    <Card.Title><h2 className='text-center'>{blog.title}</h2></Card.Title>
                </Card>
                <Card.Body style={{fontSize:'23px'}}>{blog.content}</Card.Body>
              </Row>
            </Container>
        </Fragment>
    )
}

export default Blog