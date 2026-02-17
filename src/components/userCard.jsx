import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const UserCard = ({ user , handleEdit, handleDelete}) => {

  return (
    <Col xs={12} sm={6}>
      <Card className="h-100">
        <Card.Body className="text-start">
          <Row className="mb-2">
            <Col xs={4} className="text-muted">Name:</Col>
            <Col xs={8}>{user?.firstname} {user?.lastname}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="text-muted">Phone:</Col>
            <Col xs={8}>{user?.phone}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="text-muted">Email:</Col>
            <Col xs={8}>{user?.email}</Col>
          </Row>

          
        </Card.Body>
        <Row className="p-3 g-2">
            <Col xs={6} className="text-muted">
              <Button variant="primary" className='w-100' onClick={handleEdit}>Edit</Button>
            </Col>
            <Col xs={6}>
              <Button variant="danger" className='w-100' onClick={handleDelete}>Delete</Button>
            </Col>
          </Row>
      </Card>
    </Col>
  )
}

export default UserCard