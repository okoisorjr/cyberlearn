import React from 'react'
import { Card, Col} from 'react-bootstrap'

export const CardComponent = ({xsV,smV,mdV,lgV,showTitle, showHeading}) => {

    return(
        <Col xs={xsV} sm={smV} md={mdV} lg={lgV}>
            <Card style={{width:'100%', minHeight:'150px', background:'transparent', border:'1px solid black'}} className='mt-3 mt-md-4'>
                <Card.Body>
                    <Card.Title className='text-center'>{showTitle}</Card.Title>
                    <h1 className="text-center">{showHeading}</h1>
                    {/*body && <Card.Body className="text-center">{body}</Card.Body>*/}
                </Card.Body>
            </Card>
        </Col>
)
}

export default CardComponent;