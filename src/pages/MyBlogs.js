import React, {useEffect, useContext, useState} from 'react'
import { Container, Card, Button, Col } from 'react-bootstrap'
import {FaEdit, FaTrash, FaPlus} from 'react-icons/fa'
import Header from '../Components/header'
import Firebase from '../firebase/config'
import {AuthContext} from '../auth'
import {useHistory} from 'react-router-dom'


const MyBlogs = () => {

    const {currentUser} = useContext(AuthContext)
    const history = useHistory()
    const db = Firebase.firestore().collection('blogs')

    const [blogs, setBlogs] = useState([])

    const getBlog = async () => {
        await db.where('author_id', '==', currentUser.uid).onSnapshot(snapshot => {
            setBlogs(snapshot.docs.map((doc) => (doc.data())))            
        })
        console.log(blogs.length)
    }

    useEffect(() => {
        getBlog()
    }, [])

    const deleteBlog = (id) => {
        console.log(id)
        db
        .doc(id)
        .delete()
        .catch((error) => {
            console.log(error.message)
        })
    }

    const editBlog = (id) => {
        history.push('/EditBlog/' + id)
    }

    return (
        <>
            <Header />
            <Container>
                {blogs === '' ? 
                (<p className='text-center'>You currently have no blog posts</p>)
                :
                (<div>
                    {blogs && blogs.map((b) => {
                        return(<div key={b.id}>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Img/>
                                    <Card.Title><h1>{b.title}</h1></Card.Title><br/>
                                    <Card.Text><strong>Author:</strong> {b.author_name}</Card.Text>
                                    <Card.Text>{b.content.substring(0, 450) + '.....'}</Card.Text>
                                    <Card.Text><strong>Posted on: </strong>{b.created_on.substring(0,25)}</Card.Text>
                                    <div className='text-right'>
                                        <Button style={{backgroundColor:'#00121F'}} onClick={()=> {editBlog(b.id)}} className='mr-2'><FaEdit className='mr-2'/>Edit Blog</Button>
                                        <Button variant='danger' onClick={() => deleteBlog(b.id)}><FaTrash className='mr-2'/>Delete Blog</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>)
                    })}
                </div>)}
                <Button className='mt-2 mb-2' onClick={() => history.push('/BlogPost')}><FaPlus size='1.3rem' className='mr-1'/>New Post</Button>
            </Container>
        </>
    )
}

export default MyBlogs
