import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getStudentById, updateStudent } from '../services/studentService'
import { Form, Alert, Button } from 'react-bootstrap'
import { formatDateForInput } from '../services/config'
import isURL from 'validator/lib/isURL'

const UpdateForm = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [gender, setGender] = useState(true)
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [feedback, setFeedback] = useState('')
  const [clas, setClas] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { id } = useParams()

  const getStudent = async () => {
    try {
      const { data: fetchedStudent } = await getStudentById(id)
      if (fetchedStudent) {
        setName(fetchedStudent.name || "")
        setDateOfBirth(formatDateForInput(fetchedStudent.dateofbirth) || "")
        setGender(fetchedStudent.gender)
        setClas(fetchedStudent.class || "")
        setImage(fetchedStudent.image || "")
        setFeedback(fetchedStudent.feedback || "")
      }
    } catch (error) {
      console.error("Error fetching student data:", error)
    }
  }

  useEffect(() => {
    getStudent()
  }, [id])

  const handleUpdateStudent = async (e) => {
    e.preventDefault()

    if (name.trim().split(/\s+/).length < 2) {
      setError('Name must contain more than 2 words!')
      return
    }
    if (!isURL(image)) {
      setError('Image must be a valid URL!')
      return
    }

    const studentData = {
      id: id,
      name: name,
      dateofbirth: dateOfBirth,
      gender: gender,
      class: clas,
      image: image,
      feedback: feedback,
    };

    try {
      const {data} = await updateStudent(id, studentData);
      if(data){
        toast.success('update successfully!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container" style={{width: "50%"}}>
      <h2>Add Student</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleUpdateStudent}>
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
        

        <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </Form.Select>
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
          Update Student
        </Button>
      </Form>
    </div>
  
  )
}

export default UpdateForm