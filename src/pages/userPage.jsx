import React, { useEffect, useState } from 'react'

import { Container, Form, Row, Spinner, Col } from 'react-bootstrap'
import InputField from '../components/inputField'
import { Card, Button } from 'react-bootstrap'
import UserCard from '../components/userCard'
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../services/userApi'

function UserFormPage() {
  const [usersData, setUsersData] = useState([])
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });


  const fetchUsers = async () => {
    const data = await getUsers();
    setUsersData(data);
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(false)
    setIsLoading(true)

    const response = await createUser(input);
    if (response.status === 201) {
      fetchUsers();
      setInput({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
      })
      setIsLoading(false)
    }
  }

  const handleEdit = async (userId) => {
    setEditingUserId(userId);
    const userData = await getUserById(userId);
    setInput({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      phone: userData.phone
    })
    setIsEditMode(true);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(false);
    setIsLoading(true)
    const response = await updateUser(editingUserId, input);
    if (response.status === 200) {
      fetchUsers();
      setInput({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
      })
      setIsEditMode(false);
      setEditingUserId(null);
      setIsLoading(false);
    }
  }

  const handleDelete = async (userId) => {
    const response = await deleteUser(userId);
    if (response.status === 200) {
      fetchUsers();
    }
  }

  return (
    <Container fluid>
      <Row className="m-0 d-flex">
        <Col xs={12} lg={5} className="p-3">
          <Card className="shadow-lg">
            <Card.Body>
              <h4 className="mb-4 text-center">User Information</h4>
              <Form noValidate validated={validated} onSubmit={isEditMode ? handleUpdate : handleSubmit}>
                <InputField label="First Name"
                  placeholder="Enter your first name"
                  type="text"
                  name="firstname"
                  value={input.firstname || ''}
                  onChange={(e) => setInput({ ...input, firstname: e.target.value })}
                  required={true}
                  minLength={3}
                  maxLength={20}
                  pattern="^[A-Za-z]+$"
                  errorMessage="First name should be 3-20 characters long and contain only letters."
                />

                <InputField label="Last Name"
                  placeholder="Enter your last name"
                  type="text"
                  name="lastname"
                  value={input.lastname || ''}
                  onChange={(e) => setInput({ ...input, lastname: e.target.value })}
                  required={true}
                  minLength={3}
                  maxLength={20}
                  pattern="^[A-Za-z]+$"
                  errorMessage="Last name should be 3-20 characters long and contain only letters."
                />
                <InputField label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={input.email || ''}
                  onChange={(e) => setInput({ ...input, email: e.target.value })}
                  required={true}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  errorMessage="Please enter a valid email address."
                />
                <InputField label="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  name="phone"
                  value={input.phone || ''}
                  onChange={(e) => setInput({ ...input, phone: e.target.value })}
                  required={true}
                  pattern="^\d{10}$"
                  errorMessage="Phone number should be 10 digits long."
                />
                <Button className='w-100' variant="success" type='submit'>
                  {isLoading ? <Spinner animation="border" size="sm" variant="light" /> : <span>{isEditMode ? "Update" : "Submit"}</span>}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={7} className="p-3">
          <Row className="g-3">
            {usersData?.map((user, index) => (
              <UserCard key={index} user={user} handleEdit={() => handleEdit(user.id)} handleDelete={() => handleDelete(user.id)} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>


  )
}

export default UserFormPage;