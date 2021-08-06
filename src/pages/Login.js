import React from 'react';
import { useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap'
import Firebase from '../firebase/config'
import {persistence} from '../firebase/config'
import Header from '../Components/header'
import Recaptcha from 'react-recaptcha';

export const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [verify, setVerify] = useState(false)
  const [show, setShow] = useState(true)

  const onChange = () => {
    console.log("Captcha loaded successfully!")
  }

  const verifyCallBack = (response) => {
    if(response){
      setVerify(true)
    }
    else{
      setError("please verify you are not a robot!")
    }
  }

  const signIn = async (e) => {
    e.preventDefault();
      setError('')
      console.log(verify)
      if(verify){
        if(email && password !== ''){
          const user = await Firebase.firestore().collection('users').where("email", "==", email).where("role", "==", "admin").get()
          if(user.empty === false){
            setError("Invalid Login Details")
          }
          else{
            Firebase.auth().setPersistence(persistence)
            .then(
              Firebase.auth().signInWithEmailAndPassword(email, password)
              .then((user) => {
              props.history.push('/Dashboard')
              })
              .catch((Error) => {
                setShow(true);
                console.log(Error)
                setError("Incorrect username and password!")
              })
            ).catch(error => {
              console.log(error.message)
            })
          }
        }else{
          setError('All fields are required')
        }
      }else{
        setError('Please verify you are not a robot!')
      }
      
    }

    return(
      <>
        <Header />
        <Card className='shadow-sm mr-auto ml-auto mt-5 mb-3 form-width'>
          <Card.Body>
          <h3 className='mt-3 text-center'>Sign In</h3>
          {error !== "" && show && <Alert variant='danger' className='mt-3 text-center' onClose={() => setShow(false)} dismissible>{error}</Alert>}
            <Form>
              <Form.Group>
                <Form.Label className='mt-2'>Email</Form.Label>
                <Form.Control type='Email' id='Email' value={email} autoFocus={true} onChange={e => {setEmail(e.target.value); setError('')}} />
              </Form.Group>
              <Form.Group>
                <Form.Label className='mt-2'>Password</Form.Label>
                <Form.Control type='password' id='passwd' value={password} onChange={e => {setPassword(e.target.value); setError('')}}/>
              </Form.Group>            
              <p><a href='ForgottenPassword'>Forgotten password?</a></p>
              <Button variant='success' type='submit' onClick={signIn} block>Login</Button><br/>
              <p className='text-center'>Need an account? <a href='Register'>Sign up</a></p>
            </Form>
            <Recaptcha sitekey="6LexI7sbAAAAALEZrhTIKlCf67LBkA_GpAEEJpr5" render="explicit" onloadCallback={onChange} verifyCallback={verifyCallBack}/>
          </Card.Body>
        </Card>
      </>
    )
}

export default Login;