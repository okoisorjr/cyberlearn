import React, { useContext, useEffect, useState } from 'react'
import Firebase from '../firebase/config'
import { Button, Container, Form, Card, Row } from 'react-bootstrap'
import Header from '../Components/header'
import { useHistory } from 'react-router'
import { AuthContext } from '../auth'

const EditBlog = (route) => {

    const history = useHistory()
    const {currentUser} = useContext(AuthContext)
    const id = route.match.params.id
    const [blog, setBlog] = useState({
      id:id, 
      author_id:'',
      title:'',
      content:''
    })

    const db = Firebase.firestore().collection('blogs')

    const handleChange = (userKey, value) => {
      setBlog({...blog, [userKey]: value})
    }

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

    const update = async (e) => {
      e.preventDefault()
      console.log(blog)
      db
      .doc(blog.id)
      .update(blog)
      .then(()=>{
        setBlog({
          author_id:currentUser.uid,
          title:'',
          content:''
        })
      })
      .catch(error => {
        console.log(error.message)
      })
      history.push('/MyBlogs')
    }

    const clear = (e) => {
      e.preventDefault()
      setBlog({
        content:''
      })
    }

    const back = (e) => {
      e.preventDefault()
      history.push('/MyBlogs')
    }

    return (
        <>
            <Header />
            <Container>
              <Row>
                <Card className='mt-3 p-3' style={{backgroundColor:'#00121F', color:'#fff', width:'100%'}}>
                    <Card.Title><h2 className='text-center'>{blog.title}</h2></Card.Title>
                </Card>
              </Row>
              <Row>
                <Card className='mt-3 p-2 mb-2' style={{width:'100%'}}>
                    <Form>
                        <Form.Group>
                          <Form.Label className='lead ml-2'><strong>Title</strong></Form.Label>
                          <Form.Control type='text' value={blog.title} autoFocus={true} onChange={(e) => handleChange('title', e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className='lead ml-2'><strong>Article</strong></Form.Label>
                          <Form.Control as='textarea' value={blog.content} rows={15} onChange={(e) => handleChange('content', e.target.value)}/>
                        </Form.Group>               
                        <div className='text-right'>
                          <Button onClick={back} variant='warning' className='mb-1 mr-1'>Back</Button>
                          <Button onClick={clear} variant='outline-danger' className='mb-1 mr-1'>Clear</Button>
                          <Button onClick={update} variant='outline-success' className='mb-1 mr-1'>Save</Button>
                        </div>
                    </Form>
                </Card>
            </Row>
            </Container>  
        </>
    )
}

export default EditBlog
