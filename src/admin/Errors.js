import {useState, useEffect, Fragment} from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import Firebase from '../firebase/config'
import AdminHeader from './AdminHeader'

const Errors = () => {

    const db = Firebase.firestore().collection('errors')
    const [errors, setErrors] = useState([])

    const getErrors = () => {
        db.onSnapshot(snapshot => {
            setErrors(snapshot.docs.map(doc => (doc.data())))
            console.log(errors)
        })
    }

    useEffect(() => {
        getErrors()
    }, [])

    return (
        <Fragment>
            <AdminHeader/>
            <Container>
                <h1 className='mt-2 mb-3'>Error Logs</h1>
                <Row>
                <Col sm={12} md={12} lg={12}>
                <Card>
                    <Table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>E-mail</th>
                                    <th>Error</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                        
                        {errors && errors.map((error, index) => (
                            <tbody key={index}                            >
                                <tr>
                                    <td>{index}</td>
                                    <td>{error.email}</td>
                                    <td>{error.error}</td>
                                    <td>{error.created_on}</td>
                                    <td><Button variant='link'>View More</Button></td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Card>
                </Col>
                </Row>    
            </Container>            
        </Fragment>
    )
}

export default Errors
