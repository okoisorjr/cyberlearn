import React, { useContext, useState } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import Firebase from '../firebase/config'
import Header from '../Components/header'
import { AuthContext } from '../auth'
import Recaptcha from 'react-recaptcha'

export const Register = (props) => {

    const [success, setSuccess] = useState('')
    const [email, setEmail] = useState('')
    const [matric, setMatric] = useState('')
    const [staffid, setStaffId] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState('')
    const [verify, setVerify] = useState(false)

    const {logout, newError} = useContext(AuthContext)
    var data = useState({})

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

    const signUp = async (e) => {
        e.preventDefault()
        if(role === 'student'){
            data = {
                created_at:new Date().toString(),
                username:username,
                lastname:lastname,
                firstname:firstname,
                password:password,
                email:email,
                role:role,
                matric:matric
            }
        }
        else{
            data = {
                created_at:new Date().toString(),
                username:username,
                lastname:lastname,
                firstname:firstname,
                password:password,
                email:email,
                role:role,
                staffID:staffid
            }
        }

        try{
            setError('')
            setSuccess('')
            if(password === passwordConfirm){
                if(firstname && lastname && email && username && role !== ''){
                    console.log(data)
                    const user = await Firebase.firestore().collection('users').where("username", "==", username).get()
                    if(user.empty === true){
                        await Firebase.auth().createUserWithEmailAndPassword(email, password)
                        await Firebase.auth().currentUser.sendEmailVerification()
                        await Firebase.firestore().collection('users').doc(email).set(data)
                        .then(console.log('added document successfully'))                    
                        .then(Firebase.auth().currentUser.updateProfile({displayName:firstname + " " + lastname}))
                        .then(() => { 
                            logout()
                        })
                        .catch((error) => {
                            newError(error.message, email)
                            console.log(error.message)
                        })
                    }else{
                        console.log("Sorry, The username already exists!")
                        setError("Sorry, The username already exists!")
                    }
                }
                else{
                    setError('All Fields Are Required!')
                    console.log(error.message)
                }
            }
            else{
                setError('Sorry! Passwords do not match')
                console.log(error)
            }
        }
        catch(err){
            setError(err.message)
            newError(err.message, email)
            console.log(err.message)
        }
    }
   
    return(
        <>
        <Header/> 
        <Card className='shadow-sm mr-auto ml-auto mt-2 mb-3 form-width'>
            <Card.Body>
                <Form className='form-width'>
                    {success !== '' && <Alert>{success}</Alert>}
                    <h2 className='mb-4 text-center'>Sign up </h2>
                    <p className='text-center mb-4'>Already Have an Account? <a href='Login'>Login</a></p>
                    {error && <Alert variant='danger' className='text-center'>{error}</Alert>}
                    <Form.Group className='mt-2'>
                        <Form.Control type='text' autoFocus='on' autoComplete='off' value={username} placeholder='Username' onChange={e => {setUsername(e.target.value); setError('')}}/>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Control type='text' autoComplete='off' value={firstname} placeholder='Firstname' onChange={e => {setFirstname(e.target.value); setError('')}}/>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Control type='text' autoComplete='off' value={lastname} placeholder='Surname' onChange={e => {setLastname(e.target.value); setError('')}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={role} onChange={e => setRole(e.target.value)} required>
                            <option selected='' defaultValue>--select role--</option>
                            <option value='student'>student</option>
                            <option value='lecturer'>lecturer</option>
                        </Form.Control>
                    </Form.Group>
                    {role && role === "student" ? (<Form.Group className='mt-2'>
                        <Form.Control type='Email' autoComplete='off' value={matric} placeholder='matric no(2015/1/55179CS)' onChange={e => setMatric(e.target.value)}/>
                    </Form.Group>) : (<Form.Group className='mt-2'>
                        <Form.Control type='Email' autoComplete='off' value={staffid} placeholder='staff ID(M1501102)' onChange={e => setStaffId(e.target.value)}/>
                    </Form.Group>)}
                    <Form.Group className='mt-2'>
                        <Form.Control type='text' autoComplete='off' value={email} placeholder='example@gmail.com' onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Control type='password' autoComplete='off' value={password} placeholder='Password' text-align='center' onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Control type='password' autoComplete='off' value={passwordConfirm} placeholder='Confirm Password' text-align='center' onChange={e => setPasswordConfirm(e.target.value)}/>
                    </Form.Group>
                    <Button variant='success' block onClick={signUp}>Sign Up</Button>
                </Form>  
            </Card.Body>
        </Card>
        <Recaptcha sitekey="6LexI7sbAAAAALEZrhTIKlCf67LBkA_GpAEEJpr5" render="explicit" onloadCallback={onChange} verifyCallback={verifyCallBack}/>
        </>
    )
}

export default Register;