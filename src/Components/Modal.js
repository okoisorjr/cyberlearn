import React, { useState, createRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import Firebase from '../firebase/config'

export const ProfileUploadModal = (props) => {
    
    const [selected, setSelected] = useState([])

    const changeHandler = (e) => {
        var file = e.target.files[0]
        setSelected(file)
        console.log(file)
    }

    const upload = (e) => {
        
    }

    return(
        <div>
            <Modal
                {...props}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter' className='text-center'>Upload Profile Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.File name='video' value={selected} onChange={changeHandler}/>
                        </Form.Group>
                        <Button variant='success' onClick={upload}>Upload Photo</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}


const SignUpModal = (props) => {

    const googleAuth = (e) => {
        e.preventDefault()
        Firebase.auth().googleAuth()
    }

    return (
        <div>
            <Modal
                {...props}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter' className='text-center'>Sign Up With</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><Button variant='danger' className='p-1' onClick={googleAuth} block><FaGoogle size='1.7rem' className='mr-2'/>Google</Button></p>
                    <p><Button variant='primary' className='p-1' block><FaTwitter size='1.7rem' className='mr-2'/>Twitter</Button></p>
                    <p><Button variant='secondary' className='p-1' block><FaGithub size='1.5rem' className='mr-2'/>Github</Button></p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SignUpModal;
