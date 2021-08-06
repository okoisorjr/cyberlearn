import React, { useContext, useState } from 'react'
import { Button, Container, Form, Alert} from 'react-bootstrap'
import Firebase from '../firebase/config'
import {AuthContext} from '../auth'
import {v4} from 'uuid'
import Header from '../Components/header'

const BlogPost = () => {

    const {currentUser, user} = useContext(AuthContext);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    //Clears the text entered in the form
    const cancelPost = (e) => {
        e.preventDefault()
        setTitle('')
        setContent('')
    }

    var data = {
        id:v4(),
        created_on:new Date().toString(),
        title:title,
        content:content,
        author_email:currentUser.email,
        author_name:user.username,
        author_id:currentUser.uid,
    }

    const publish = async (e) => {
        e.preventDefault()
        if(title === null || title.length < 15){
            setError('Title is too short!')
        }
        else{
            await Firebase.firestore().collection('blogs').doc(data.id).set(data).then(
                setMessage('Congratulations! Your Blog was posted successfully.')        
            )
            console.log('success')
        }
    }

    return (
        <>
            <Header /> 
            <Container>
                <Form className='mt-3'>                               
                    <Form.Group>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {message && <Alert variant='success'>{message}</Alert>}
                        <Form.Label className='lead' style={{fontWeight:'bold'}}>Title</Form.Label>
                        <Form.Control type='text' value={title} onChange={e => {setTitle(e.target.value); setError('')}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='lead' style={{fontWeight:'bold'}}>Article</Form.Label>
                        <Form.Control as='textarea' placeholder='it should not be less than 1000 characters' value={content} rows={14} onChange={e => {setContent(e.target.value); setError('')}}/>
                    </Form.Group>
                    

                    <div className='mt-3 mb-2 ml-auto'>
                        <Button variant='success' className='mr-2' onClick={publish}>Publish</Button>
                        <Button variant='danger' onClick={cancelPost}>Clear</Button>
                    </div>
                </Form>
            </Container>  
        </>
    )
}

export default BlogPost
