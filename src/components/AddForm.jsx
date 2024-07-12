import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { postNewStudent } from '../services/studentService'
import isURL from 'validator/lib/isURL'

const AddStudent = () => {
  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [gender, setGender] = useState(true)
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [feedback, setFeedback] = useState('')
  const [clas, setClas] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault()

    // Validate fields
    if (name.split(' ').length < 2) {
      setError('Name must contain more than 2 words!')
      return
    }
    if (!isURL(image)) {
      setError('Image must be a valid URL!')
      return
    }
    const studentData = { 
      name, 
      dateofbirth: dateOfBirth, 
      gender,
      class: clas, 
      image, 
      feedback 
    }
    try {
      let res = await postNewStudent(studentData);
      console.log(res);
      navigate('/dashboard')
    } catch (error) {
      console.error(error.error)
    }
    
  }

  return (
    <div className="container">
      <h2>Add Student</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </Form.Group> 
        

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            name="gender"
            value={true}
            checked={gender === true}
            onChange={() => setGender(true)}
          />     
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            value={false}
            checked={gender === false}
            onChange={() => setGender(false)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter class"
            value={clas}
            onChange={(e) => setClas(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        

        <Form.Group className="mb-3" controlId="formFeedback">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter feedback (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Student
        </Button>
      </Form>
    </div>
  )
}

export default AddStudent
